export const state = () => ({
  accesstoken: '1',
  loginname: '',
  avatar_url: '',
})

export const mutations = {
  login(state, payload) {
    state.accesstoken = payload
  },
  getUser(state, payload) {
    state.loginname = payload.loginname
    state.avatar_url = payload.avatar_url
  },
}
