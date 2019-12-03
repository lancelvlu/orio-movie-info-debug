
import regeneratorRuntime from "./runtime"
const util = require('./util')

const db = wx.cloud.database({
  env: 'orio-movie-info-alc3g'
})
wx.cloud.init()

module.exports = {
  async addMovieInfoDebug(movieList, newMovieList, fetchTime, fetchDate){

    await db.collection("hot-movie-list").add({
      data: {
        fetchTime: fetchTime,
        movieList: movieList,
        fetchDate: fetchDate
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log("Success")
      },
      fail: console.error
    })
    if (newMovieList.length > 0){
      newMovieList.forEach(movieInfo => {
        db.collection("movie-info").add({
          data: movieInfo,
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log("Success")
          },
          fail: console.error
        })
      })
    } else {
      console.log("无需更新电影信息列表")
    }

  },
  async readOneMovieInfoDebug(movieId) {
    let temp = await db.collection('movie-info').where({id: movieId}).get()
    return temp
  },

  readMovieInfoDebug(fetchDate){
    return db.collection('hot-movie-list').where({ fetchDate: fetchDate }).get()
  },
  testAggregate(){
    const $ = db.command.aggregate
    return db.collection("movie-info").aggregate().group({
      _id: null,
      movieIdList: $.addToSet('$id')
    }).end()
  },
  addComment(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'addComment',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },
  getComment(commentId) {
    return db.collection('movie-comments').where({
      _id: commentId
    }).get()
  },
  getRandomComment() {
    return db.collection('movie-comments').aggregate().sample({size: 1}).end()
  },
  getCommentList(movieId) {
    return db.collection('movie-comments').where({
      movieId: movieId
    }).get()
  },
  markComment(data) {
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'markComment',
          data,
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },
  getMarkedComment(openId){
    return util.isAuthenticated()
      .then(() => {
        return wx.cloud.callFunction({
          name: 'getMarkedComment',
        })
      }).catch(() => {
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {}
      })
  },
  uploadRadio(radioTempPath) {
    return wx.cloud.uploadFile({
      cloudPath: `radio-record/${util.getId()}.mp3`,
      filePath: radioTempPath,
    })
  },
}