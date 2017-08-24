import axios from 'axios'
import { uaInfo, commonParams, hostUrl } from 'api/config'

export function login (params) {
  console.log(uaInfo)
  const url = hostUrl + 'User.json?action=Login'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return Promise.resolve(res.data)
  })
}
export function zxb (params) {
  const url = hostUrl + 'Zxb.json?action=GetZXBCountByUserId'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function GetFansCount (params) {
  const url = hostUrl + 'User.json?action=GetFansCount'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function GetAttentionCount (params) {
  const url = hostUrl + 'User.json?action=GetAttentionCount'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function Logout (params) {
  const url = hostUrl + 'User.json?action=Logout'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function GetPhoneCode (params) {
  const url = hostUrl + 'MobileMsg.json?action=GetPhoneCode'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function GetPhoneLogin (params) {
  const url = hostUrl + 'User.json?action=GetPhoneLogin'

  const data = Object.assign({}, commonParams, params)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
