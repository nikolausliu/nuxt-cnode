import { obj2query } from '@/utils'

export const getTopics = (axios, params) => {
  const query = obj2query(params)
  return axios.get(`https://cnodejs.org/api/v1/topics${query}`)
}
