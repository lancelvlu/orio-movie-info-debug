// pages/hot-list/hot-list.js
const douban = require("../../utils/douban")
const util = require("../../utils/util")
const db = require("../../utils/db")
import regeneratorRuntime from "../../utils/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotMovieList: "", 
    commentInfo: {
      text: "我觉得还不错，推介看一下",
      avatarUrl: "https://i.loli.net/2017/08/21/599a521472424.jpg",
      reviewerName: "lancelvlu"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotMovieList(options.fetchDate)
  },

  async getHotMovieList(fetchDate){
    wx.showLoading({
      title: '让数据飞一会儿',
    })
    let hotMovieList = await db.readMovieInfoDebug(fetchDate) 
    wx.hideLoading()
    this.setData({
      hotMovieList: hotMovieList.data[0].movieList,
    })
    // console.log(hotMovieList.data)
  },

  navToMovieDetail(event){
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?movieId=' + event.currentTarget.dataset.movieId,
    })
    // console.log(event)
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