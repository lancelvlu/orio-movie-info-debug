
import regeneratorRuntime from "./runtime"
const douban = require('./douban')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


module.exports = {
  formatTime: formatTime,
  isAuthenticated() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo'] === true) {
            resolve()
          } else {
            reject()
          }
        }
      })
    })
  },

  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.isAuthenticated().then(() => {
        wx.getUserInfo({
          success(res) {
            const userInfo = res.userInfo
            resolve(userInfo)
          }
        })
      }).catch(() => {
        reject()
      })
    })
  },

  getId() {
    return Math.floor((1 + Math.random()) * 0x100000000).toString(16).slice(1)
  },

  formatTime(time, reg) {
    const date = typeof time === 'string' || typeof time === 'number' ? new Date(time) : time;
    const map = {};
    map.yyyy = date.getFullYear();
    map.yy = ('' + map.yyyy).substr(2);
    map.M = date.getMonth() + 1
    map.MM = (map.M < 10 ? '0' : '') + map.M;
    map.d = date.getDate();
    map.dd = (map.d < 10 ? '0' : '') + map.d;
    map.H = date.getHours();
    map.HH = (map.H < 10 ? '0' : '') + map.H;
    map.m = date.getMinutes();
    map.mm = (map.m < 10 ? '0' : '') + map.m;
    map.s = date.getSeconds();
    map.ss = (map.s < 10 ? '0' : '') + map.s;

    return reg.replace(/\byyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s\b/g, $1 => {
      return map[$1];
    });
  }
}
