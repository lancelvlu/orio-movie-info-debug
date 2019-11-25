// pages/cover/cover.js
const douban = require("../../utils/douban")
const db = require("../../utils/db")
import regeneratorRuntime from "../../utils/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab : "hot-list",
    currentMovie : 0,
    hotMovieList :''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotmovieList()
    wx.getSystemInfo({
      success: (res) => {
        let clientHeight = res.windowHeight, clientWidth = res.windowWidth, rpxR = 750 / clientWidth;
        let winHeight = clientHeight * rpxR;
        // console.log(winHeight)
        this.setData({
          winHeight: winHeight
        });
      }
    })
    // console.log(this.data.winHeight)
  },

  handleChange(detail){
    // this.setData({
    //   currentTab : detail.detail.key
    // })
    wx.navigateTo({
      url: '/pages/' + detail.detail.key + "/" + detail.detail.key,
    })
    // console.log(detail.detail.key)
  },

  getHotmovieList(){
    wx.showLoading({
      title: '让数据飞一会儿...',
    })
    douban.find('in_theaters', 0, 10)
      .then(d => {
        let temp = d.subjects
        temp.forEach(function (item) {
          item['summay'] = ''
          item['tag'] = item['genres'].join(' / ')
        })
        this.setData({
          hotMovieList: temp
        })
        return new Promise((resolve, reject) => {
          resolve(temp)
        })
      }).then(value => {
        db.addMovieInfoDebug(value)
        wx.hideLoading()
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