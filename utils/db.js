
import regeneratorRuntime from "./runtime"
const db = wx.cloud.database({
  env: 'orio-movie-info-alc3g'
})
wx.cloud.init()

module.exports = {
  async addMovieInfoDebug(inputData){
    inputData.forEach(movieInfo => {
      db.collection("movie-debug").add({
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
    let temp = await db.collection('movie-debug').get()
    return temp
  },
  async readOneMovieInfoDebug(movieId) {
    let temp = await db.collection('movie-debug').where({id: movieId}).get()
    return temp
  },
  updateSummary(movieId, movieSummary){
    db.collection('movie-debug').where({id: movieId}).update({summary: movieSummary})
  }
}