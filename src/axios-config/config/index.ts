import { ConfigOptions } from './types'

const config: ConfigOptions = {
  /**
   * api请求基础路径
   */
  base_url: {
    dev: 'http://localhost:8080',
    pro: 'http://localhost:8080',
  },
  /**
   * 接口成功返回状态码
   */
  result_code: '0000',
  /**
   * 接口请求超时时间
   */
  request_timeout: 5000,
  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  default_headers: 'application/json',
}
export default config
