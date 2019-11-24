// pages/mypage/mypage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentInfo: {
      text: "我觉得还不错，推介看一下",
      avatarUrl: "https://i.loli.net/2017/08/21/599a521472424.jpg",
      reviewerName: "lancelvlu"
    },
    hotFilmList: [
      {
        title: "阿凡达",
        coverImgUrl: "http://p4.qhimg.com/t01c6ab89da78575832.jpg",
        tag: "动作 / 剧情 / 奇幻 / 科幻"
      },
      {
        title: "终结者",
        coverImgUrl: "http://p5.qhimg.com/d/_hao360/video/n200905_19_100926095.jpg",
        tag: "科幻",
      },
      {
        title: "建国大业",
        coverImgUrl: "http://p1.qhimg.com/d/_hao360/video/vimg0292.jpg",
        tag: "剧情 / 历史"
      },
    ],
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onTapLogin(event) {
    // console.log(event)
    this.setData({
      userInfo: event.detail.userInfo,
    })
  },

  navBackHome(event) {
    wx.navigateTo({
      url: '/pages/cover/cover',
    })
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