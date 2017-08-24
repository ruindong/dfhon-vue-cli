import axios from 'axios'
import { uaInfo, commonParams, hostUrl } from 'api/config'

export function getSubjectList () {
  console.log(uaInfo)
  const url = hostUrl + 'Activity.json?action=GetMallZiSubject'

  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function shopAds () {
  const url = hostUrl + 'Activity.json?action=GetAds'

  const data = Object.assign({}, commonParams, {AdEName: 'app_mall_hot'})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function preferProduct (param) {
  const url = hostUrl + 'Activity.json?action=GetProductList'

  const data = Object.assign({}, commonParams, param)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function productClass () {
  const url = hostUrl + 'class.json?action=GetAllClass'

  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function mallJingXuanSubject (param) {
  const url = hostUrl + 'Activity.json?action=GetMallJingXuanSubject'

  const data = Object.assign({}, commonParams, param)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getAllProvinceCity () {
  const url = hostUrl + 'Class.json?action=GetAllProvinceAndCity'

  const data = Object.assign({}, commonParams, {})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
