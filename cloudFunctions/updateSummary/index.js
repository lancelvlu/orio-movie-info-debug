// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  // console.log(event)
  // console.log(event.movieId)
  // console.log(event.movieSummary)
  await db.collection('movie-info').where({ id: event.movieId }).update({ 
    data:{
      summary: event.movieSummary
    } })
  return {}
}