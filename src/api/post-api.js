import axios from 'axios'
import { commonParams, hostUrl } from 'api/config'

export function GetHomeRecommendLable (params) {
  const url = hostUrl + 'Lable.json?action=GetHomeRecommendLable'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function GetTopPosts (params) {
  const url = hostUrl + 'Post.json?action=GetTopPosts'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function GetPostOfHome (params) {
  const url = hostUrl + 'Post.json?action=GetPostOfHome'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
