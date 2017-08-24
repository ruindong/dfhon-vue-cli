
const commonUrl = {
  0: 'http://api3.dfhon.cn/v3/',
  1: 'http://api.dfhon.cn/v3/',
  2: 'https://api.dfhon.cn/v3/'
}
export const uaInfo = navigator.userAgent
export const hostUrl = commonUrl[1]

export const commonParams = {
  app_phoneModel: 'h5',
  app_version: '1.0.0',
  channel_id: 'App Store',
  app_mac: '881D6D3B-0C53-4AC6-9F88-1D06858153E6',
  app_innerVersion: '20170707',
  app_terminal: 'apple'
}

export const options = {
  param: 'jsonpCallback'
}

export const ERR_OK = 0

export const screenW = window.screen.width
export const screenH = window.screen.availHeight
export const pageBoxH = window.screen.height - (screenW / 375 * 50)
