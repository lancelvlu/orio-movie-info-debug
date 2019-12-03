// pages/movie-detail/movie-detail.js
const douban = require("../../utils/douban")
const util = require("../../utils/util")
const db = require("../../utils/db")
import regeneratorRuntime from "../../utils/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieInfo: "",
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
    this.updateMovieInfo(options.movieId)
  },
  
  async updateMovieInfo(movieId){
    wx.showLoading({ title: '让数据飞一会儿' })
    let temp = await db.readOneMovieInfoDebug(movieId)
    this.setData({
      movieInfo: {
        title: temp.data[0].title,
        coverUrl: temp.data[0].images.large,
        summary: temp.data[0].summary,
        tag: temp.data[0].tag,
        id: movieId}
    })
    if (!!temp.data[0].summary){
      wx.hideLoading()
    } else {
      await douban.findOne(movieId).then(d =>{
      this.setData({
        'movieInfo.summary' : d.summary
      })
      wx.cloud.callFunction({
        name: 'updateSummary',
        data: {
          movieId: movieId,
          movieSummary: d.summary
        }
      })
      wx.hideLoading()
    })
    }

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
      url: '/pages/comment-edit/comment-edit?movieId=' + this.data.movieInfo.id + "&commentType=" + this.data.actions1[detail.index]['name'] + "&coverUrl=" + this.data.movieInfo.coverUrl + "&title=" + this.data.movieInfo.title,
    })
    // console.log(this.data.actions1[detail.index])
  },

  goToCommentList(event){
    wx.navigateTo({
      url: '/pages/comment-list/comment-list?movieId='+this.data.movieInfo.id,
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