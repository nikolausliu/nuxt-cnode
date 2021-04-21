export const state = () => ({
  accesstoken: '',
  id: '',
  loginname: '',
  avatar_url: '',
})

export const mutations = {
  login(state, payload) {
    state.accesstoken = payload.accesstoken
    state.id = payload.id
    state.loginname = payload.loginname
    state.avatar_url = payload.avatar_url
  },
  logout(state) {
    state.accesstoken = ''
    state.id = ''
    state.loginname = ''
    state.avatar_url = ''
  },
}
