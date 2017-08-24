export function dateFormat (params) {
  var date = new Date(params)
  // var Y = date.getFullYear()
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  var D = date.getDate()
  var h = date.getHours()
  var m = date.getMinutes()
  // var s = date.getSeconds()
  if (isNaN(date)) {
    return params
  }
  var date2 = Date.parse(new Date()) / 1000
  var today = date2 - date2 % 86400 - 28800  // 凌晨0：0：0
  var lastTime = date.getTime() / 1000
  if ((lastTime - today) > 0) {
    return '今天 ' + h + ':' + m
  } else if ((today - lastTime) < 86400) {
    return '昨天 ' + h + ':' + m
  } else {
    return M + '月' + D + '日' + ' ' + h + ':' + m
  }
}

export function dateNomal () {
  var myDate = new Date()
  var date = myDate.getFullYear() + '/' + sup(myDate.getMonth()) + '/' + sup(myDate.getDate())
  var time = sup(myDate.getHours()) + ':' + sup(myDate.getMinutes()) + ':' + sup(myDate.getSeconds())
  return date + ' ' + time
}

function sup (n) { return (n < 10) ? '0' + n : n }

export function checkPhone (phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false
  } else {
    return true
  }
}
