// pages/comment-list/comment-list.js
const util = require("../../utils/util")
const db = require("../../utils/db")
import regeneratorRuntime from "../../utils/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      movieId: options.movieId
    })
  },

  async getCommentList(movieId){
    let commentDbReturn = await db.getCommentList(movieId)
    this.setData({
      commnentList: commentDbReturn.data
    })
  },

  navToComment(event) {
    wx.navigateTo({
      url: '/pages/comment-detail/comment-detail?commentId='+event.currentTarget.dataset.id
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
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
      this.getCommentList(this.data.movieId)
    }).catch(err => {
      console.log("Not Authenticated yet")
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