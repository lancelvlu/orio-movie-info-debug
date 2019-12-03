// pages/comment-edit/comment-edit.js
const util = require("../../utils/util")
const db = require("../../utils/db")
import regeneratorRuntime from "../../utils/runtime"

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
const recordOptions = {
  duration: 600000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3',
  frameSize: 50
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: "",
    commentContent: "",
    userInfo: null,
    editFinish: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      commentType: options.commentType,
      
      movie: {
        title: options.title,
        movieId: options.movieId,
        coverUrl: options.coverUrl,
      } 
    })
    
    // console.log(options)
    
  },
  

  handleRecordStart: function () {
    //开始录音
    recorderManager.start(recordOptions);
    recorderManager.onStart(() => {
      console.log('开始录音')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },

  handleRecordStop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.setData({
        commentContent : res.tempFilePath
      })
      console.log('停止录音', res.tempFilePath)
    })
  },

  tapPlay: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.commentContent,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  myInput(event){
    this.setData({
      commentContent: event.detail.detail.value
    })
  },

  uploadRadio(callback) {
    let radioPath=""
    if (this.data.commentContent) {
      db.uploadRadio(this.data.commentContent).then(result => {
        radioPath = result.fileID
        callback && callback(radioPath)
      }).catch(err => {
        console.log('err', err)
      })
    } else {
      callback && callback(radioPath)
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    }).catch(err => {
      console.log('Not Authenticated yet')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo,
    })
  },
  addComment(event) {
    let content = this.data.commentContent
    if (!content) return

    wx.showLoading({
      title: 'Submiting...'
    })
    if (this.data.commentType === "文字"){
      db.addComment({
        movieTitle: this.data.movie.title,
        movieId: this.data.movie.movieId,
        coverUrl: this.data.movie.coverUrl,
        username: this.data.userInfo.nickName,
        avatar: this.data.userInfo.avatarUrl,
        commentType: this.data.commentType,
        commentContent: this.data.commentContent
      }).then(result => {
        wx.hideLoading()

        const data = result.result

        if (data) {
          wx.showToast({
            title: 'Succeed'
          })

          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/comment-list/comment-list?movieId=' + this.data.movie.movieId,
            })
          }
            , 1500)


        }
      }).catch(err => {
        console.error(err)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: 'Failed'
        })
      })
    } else {
      this.uploadRadio(radioPath => {
        db.addComment({
          movieTitle: this.data.movie.title,
          movieId: this.data.movie.movieId,
          coverUrl: this.data.movie.coverUrl,
          username: this.data.userInfo.nickName,
          avatar: this.data.userInfo.avatarUrl,
          commentType: this.data.commentType,
          commentContent: radioPath
        }).then(result => {
          wx.hideLoading()

          const data = result.result

          if (data) {
            wx.showToast({
              title: 'Succeed'
            })

            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          }
        }).catch(err => {
          console.error(err)
          wx.hideLoading()

          wx.showToast({
            icon: 'none',
            title: 'Failed'
          })
        })
      })
    }
    
  },
  tapFinnishEdit(){
    this.setData({
      editFinish: true
    })
  },
  tapReturnEdit(){
    this.setData({
      editFinish: false
    })
  }

})