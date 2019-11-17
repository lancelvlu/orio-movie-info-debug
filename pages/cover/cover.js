// pages/cover/cover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab : "hot",
    currentFilm : 0,
    hotFilmList : [
      {
        title: "阿凡达",
        coverImgUrl: "http://p4.qhimg.com/t01c6ab89da78575832.jpg",
        randomReview: {
          reviewerName: "lulu",
          reviewerAvatar: "https://c-ssl.duitang.com/uploads/item/201811/16/20181116003702_mlard.thumb.700_0.jpg"
        }
      },
      {
        title: "终结者",
        coverImgUrl: "http://p5.qhimg.com/d/_hao360/video/n200905_19_100926095.jpg",
        randomReview: {
          reviewerName: "xhh",
          reviewerAvatar: "http://b-ssl.duitang.com/uploads/item/201708/24/20170824110601_evE3L.jpeg"
        }
      },
      {
        title: "建国大业",
        coverImgUrl: "http://p1.qhimg.com/d/_hao360/video/vimg0292.jpg",
        randomReview: {
          reviewerName: "zzr",
          reviewerAvatar: "http://cdn.duitang.com/uploads/item/201410/26/20141026191422_yEKyd.thumb.700_0.jpeg"
        }
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        let clientHeight = res.windowHeight, clientWidth = res.windowWidth, rpxR = 750 / clientWidth;
        let winHeight = clientHeight * rpxR;
        console.log(winHeight)
        this.setData({
          winHeight: winHeight
        });
      }
    })
    // console.log(this.data.winHeight)
  },

  handleChange(detail){
    this.setData({
      currentTab : detail.detail.key
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