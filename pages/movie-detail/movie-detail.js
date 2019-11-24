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
    movieInfo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
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
      console.log("in yes")
      wx.hideLoading()
    } else {
      console.log("in no")
      await douban.findOne(movieId).then(d =>{
      this.setData({
        'movieInfo.summary' : d.summary
      })
      wx.hideLoading()
      return new Promise((resolve, reject)=>{
        resolve({id:movieId, summary: d.summary})
      })
    }).then( value => {
      db.updateSummary(value.id, value.summary)
    }

    )
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