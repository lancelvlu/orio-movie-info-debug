// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  console.log(event.commentType)
  await db.collection('movie-comments').add({
    data: {
      user:user,
      username: event.username,
      avatar: event.avatar,
      commentType: event.commentType,
      commentContent: event.commentContent,
      movieId: event.movieId,
      movieTitle: event.movieTitle,
      coverUrl: event.coverUrl,
      createTime: +new Date()
    },
  })
  return {}
}