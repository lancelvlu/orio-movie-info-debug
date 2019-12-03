// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const user = wxContext.OPENID
  console.log("into cloud function markComment")
  let temp = await db.collection('comment-mark').where({
    user: user,
    commentId : event.commentId
  }).get()
  if (temp.data.length > 0) {
    return false
  } else {
    console.log(event.commentId)
    await db.collection('comment-mark').add({
      data: {
        user: user,
        commentId: event.commentId,
        createTime: +new Date()
      },
    })
    return true
  }

}