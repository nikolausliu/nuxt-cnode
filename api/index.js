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

export const validateToken = (axios, params) => {
  return axios.post('/accesstoken', params)
}

export const collectTopic = (axios, params) => {
  return axios.post('/topic_collect/collect', params)
}

export const uncollectTopic = (axios, params) => {
  return axios.post('/topic_collect/de_collect', params)
}

export const updownTopic = (axios, id, params) => {
  return axios.post(`/reply/${id}/ups`, params)
}

export const replyTopic = (axios, id, params) => {
  return axios.post(`/topic/${id}/replies `, params)
}

export const postTopic = (axios, params) => {
  return axios.post(`/topics`, params)
}
