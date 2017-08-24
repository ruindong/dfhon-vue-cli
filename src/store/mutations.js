import * as types from './mutations-types'

const mutations = {
  [types.SET_CITY] (state, city) {
    state.city = city
  },
  [types.SET_LOGIN] (state, login) {
    state.login = login
  },
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_NOW_PAGE] (state, nowPage) {
    state.nowPage = nowPage
  }
}
export default mutations
