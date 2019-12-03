// pages/cover/cover.js
const douban = require("../../utils/douban")
const db = require("../../utils/db")
const util = require("../../utils/util")
import regeneratorRuntime from "../../utils/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab : "hot-list",
    currentMovie : 0,
    randomComment :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotmovieList()
    this.getRandomComment()
    wx.getSystemInfo({
      success: (res) => {
        let clientHeight = res.windowHeight, clientWidth = res.windowWidth, rpxR = 750 / clientWidth;
        let winHeight = clientHeight * rpxR;
        this.setData({
          winHeight: winHeight
        });
      }
    })
    // console.log(this.data.winHeight)
  },

  handleChange(detail){
    wx.navigateTo({
      url: '/pages/' + detail.detail.key + "/" + detail.detail.key + "?fetchDate=" + this.data.fetchDate,
    })
  },

  async getHotmovieList(){
    wx.showLoading({
      title: '让数据飞一会儿',
    })
    
    
    //获取当前时间戳和日期
    const fetchTime = +new Date()
    const fetchDate = util.formatTime(fetchTime, "yyyy-MM-dd")
    this.setData({
      fetchDate: fetchDate
    })
    //查看是否今日已经获取过热门电影列表
    let fetchDB = await db.readMovieInfoDebug(fetchDate)
    if (fetchDB.data.length > 0){
      // console.log(fetchDB.data)
      this.setData({
        hotMovieList: fetchDB.data[0].movieList
      })
      wx.hideLoading()
    } else{
    const fetchedMovieInfoList = await douban.find('in_theaters', 0, 20)
        .then(d => {
          let movieInfoList = d.subjects
          movieInfoList.forEach(function (item) {
            item['summary'] = ''
            item['tag'] = item['genres'].join(' / ')
          })
          this.setData({
            hotMovieList: movieInfoList
          })
          return movieInfoList
        })

      // console.log(fetchedMovieInfoList)
    //获取现有的数据库movie-ifo的id作为list，然后判断新获取的list有没有在这里面
    //如果没有则新增条目
    //如果有则不作任何操作
    //可以考虑切换到云函数

    //获取已存电影id列表
    const storedMovieIdList = await db.testAggregate()
      // console.log(storedMovieIdList.list)
    if (storedMovieIdList.list.length > 0){
      let newMovieInfoList = await fetchedMovieInfoList.filter(item => !~(storedMovieIdList.list[0].movieIdList).indexOf(item.id))
      // console.log(newMovieInfoList)
      await db.addMovieInfoDebug(fetchedMovieInfoList, newMovieInfoList, fetchTime, fetchDate)
    } else {
      await db.addMovieInfoDebug(fetchedMovieInfoList, fetchedMovieInfoList, fetchTime, fetchDate)
    }
    }
    wx.hideLoading()
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async getRandomComment(){
    let commentInfo = await db.getRandomComment()
    this.setData({
      randomComment: [{
        title: commentInfo.list[0].movieTitle, 
        coverUrl: commentInfo.list[0].coverUrl,
        commentId: commentInfo.list[0]._id,
        avatar: commentInfo.list[0].avatar,
        username: commentInfo.list[0].username
      }]
    })
  },
  navToComment(event){
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?commentId=' + this.data.randomComment[0].commentId + "&title=" + this.data.randomComment[0].title + "&coverUrl=" + this.data.randomComment[0].coverUrl,
    })
  },

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