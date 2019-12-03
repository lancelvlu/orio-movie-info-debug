// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  
  let markList = await db.collection('comment-mark').where({
    user: user
  }).get()
  let commentList = await Promise.all(markList.data.map(async item => {
    let temp = await db.collection("movie-comments").where({
      _id: item.commentId
    }).get()
    return {
      movieTitle: temp.data[0].movieTitle,
      coverUrl: temp.data[0].coverUrl,
      commentId: temp.data[0]._id,
      commentInfo: {
        commentType: temp.data[0].commentType,
        commentContent: temp.data[0].commentContent,
        avatar: temp.data[0].avatar,
        username: temp.data[0].username
  
      }
    }
  }))
  console.log(commentList)
  return commentList
}