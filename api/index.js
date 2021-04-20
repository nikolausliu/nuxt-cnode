import { obj2query } from '@/utils'

export const getTopics = (axios, params) => {
  const query = obj2query(params)
  return axios.get(`/topics${query}`)
}

export const getTopicDetail = (axios, id, params) => {
  const query = obj2query(params)
  return axios.get(`/topic/${id}${query}`)
}

export const getUserInfo = (axios, loginname) => {
  return axios.get(`/user/${loginname}`)
}

export const login = (axios, params) => {
  return axios.post('/accesstoken', params)
}
