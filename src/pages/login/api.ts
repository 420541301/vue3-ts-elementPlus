import { fetch } from '@/axios-config/axios'

interface PropsData {
  params?: any
  data?: any
}

const api = 'mock'

export const loginApi = ({ data }: PropsData) => {
  return fetch({ url: api + '/user/login', method: 'post', data })
}

export const getRoleDetApi = ({ params }: PropsData) => {
  return fetch({ url: api + '/role/detail', method: 'get', params })
}
