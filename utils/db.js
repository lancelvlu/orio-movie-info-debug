
import regeneratorRuntime from "./runtime"
const db = wx.cloud.database({
  env: 'orio-movie-info-alc3g'
})
wx.cloud.init()

module.exports = {
  async addMovieInfoDebug(movieList, fetchTime, fetchDate){
    // let hostMovieIdList = movieList.map(item=> {
    //   return item.id
    // })
    console.log(fetchTime)
    console.log(fetchDate)
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
    movieList.forEach(movieInfo => {
      db.collection("movie-info").add({
        data: movieInfo,
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log("Success")
        },
        fail: console.error
      })
    })
  },
  async readMovieInfoDebug(){
    let temp = await db.collection('hot-movie-list').get()
    return temp
  },
  async readOneMovieInfoDebug(movieId) {
    let temp = await db.collection('movie-info').where({id: movieId}).get()
    return temp
  },
  updateSummary(movieId, movieSummary){
    db.collection('movie-info').where({id: movieId}).update({summary: movieSummary})
  },
  fetchJudgement(fetchDate){
    return db.collection('hot-movie-list').where({ fetchDate: fetchDate }).get()
  },
  testAggregate(){
    db.collection("movie-info").aggregate().group({
      _id: "$subtype",
      uniqueValues: $.sum(1)
    }).end()
  }

}