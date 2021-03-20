// 测试模板
const state = {
  token: localStorage.getItem('token')
}

const mutations = {
  SET_TOKEN: (state: { user: any }, token: any) => {
    state = token
    localStorage.setItem('token', token)
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
