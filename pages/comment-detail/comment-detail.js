// pages/comment-detail/comment-detail.js

const db = require("../../utils/db")
const util = require("../../utils/util")
import regeneratorRuntime from "../../utils/runtime"
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: "",
    userInfo: null,
    visible1: false,
    actions1: [
      {
        name: '语音',
        icon: 'translation'
      },
      {
        name: '文字',
        icon: 'brush'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    }).catch(err => {
      console.log('Not Authenticated yet')
    })
    this.getComment(options.commentId)
 
  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  handleCancel1() {
    this.setData({
      visible1: false
    });
  },
  handleClickItem1({ detail }) {
    wx.navigateTo({
      url: '/pages/comment-edit/comment-edit?movieId=' + this.data.movie.id + "&commentType=" + this.data.actions1[detail.index]['name'] + "&coverUrl=" + this.data.movie.coverUrl + "&title=" + this.data.movie.title,
    })
    // console.log(this.data.actions1[detail.index])
  },

  async getComment(inputId){
    let commentInfo = await db.getComment(inputId)
    this.setData({
      comment: {
        commentId: inputId,
        avatar: commentInfo.data[0].avatar,
        commentContent: commentInfo.data[0].commentContent,
        commentType: commentInfo.data[0].commentType,
        username: commentInfo.data[0].username
        },
      
      movie: {
        title: commentInfo.data[0].movieTitle,
        coverUrl: commentInfo.data[0].coverUrl,
        id: commentInfo.data[0].movieId
      }
    })
  },
  tapPlay: function (event) {
    // radioPath存放在event.currentTarget.dataset.radiopath中
    innerAudioContext.autoplay = true
    innerAudioContext.src = event.currentTarget.dataset.radiopath,
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  markComment(inputId){
    wx.showLoading({
      title: 'Submiting...'
    })
    db.markComment({
      commentId: this.data.comment.commentId,
    }).then(result => {
      wx.hideLoading()
      const data = result.result
      if (data) {
        wx.showToast({
          title: '收藏成功'
        })
      } else {
        wx.showToast({
          title: '请不要重复收藏',
          icon: 'none'
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },

  onTapLogin(event) {
    // console.log(event)
    this.setData({
      userInfo: event.detail.userInfo,
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})