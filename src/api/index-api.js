import axios from 'axios'
import { uaInfo, commonParams, hostUrl } from 'api/config'
// 首页轮播
export function sliderData () {
  console.log(uaInfo)
  const url = hostUrl + 'Activity.json?action=GetAPPAds2'

  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 热门广告
export function getHotAds () {
  const url = hostUrl + 'Activity.json?action=GetHotAds'

  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return Promise.resolve(res.data)
  })
}
// 是否显示名医
export function showDoctor () {
  const url = hostUrl + 'DOrH.json?action=GetIsShowRecommendDOrH'

  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 帖子类型
export function postType (param) {
  const url = hostUrl + 'Lable.json?action=GetHomeLableIds'

  const data = Object.assign({}, commonParams, param)

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return Promise.resolve(res.data)
  })
}

// 首页帖子
export function indexPost (ableId) {
  const url = hostUrl + 'Post.json?action=GetHomePostsAndAds'

  const data = Object.assign({}, {}, {
    lableId: ableId,
    fromId: ''
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
