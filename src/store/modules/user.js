import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginApi, getUserApi } from '@/api/user'
const state = {
  token: getToken(),
  user: {}
}
const mutations = {
  // 获取token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 获取用户信息
  user(state, data) {
    state.user = data
  }
}
const actions = {
  // 登录
  async login(context, payload) {
    delete payload.isAgree
    const token = await loginApi(payload)
    context.commit('setToken', token)
  },
  // 用户信息
  async userInfo({ commit }) {
    const res = await getUserApi()
    commit('user', res)
  },
  // 退出登录
  logout({ commit }) {
    commit('removeToken')
    commit('user', {})
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
