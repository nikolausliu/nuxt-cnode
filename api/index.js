import { obj2query } from '@/utils'

export const getTopics = (axios, params) => {
  const query = obj2query(params)
  return axios.get(`/topics${query}`)
}

export const getTopicDetail = (axios, id, params) => {
  const query = obj2query(params)
  return axios.get(`/topic/${id}${query}`)
}
