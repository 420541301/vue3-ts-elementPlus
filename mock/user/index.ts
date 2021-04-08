import { User } from './types'

const List: User[] = [
  {
    userName: 'admin',
    password: 'admin',
    role: 'admin',
    roleId: '1',
  },
  {
    userName: 'test',
    password: 'test',
    role: 'test',
    roleId: '2',
  },
]

export default [
  {
    url: 'http://localhost:8080/mock/user/login',
    type: 'post',
    response: (config: any) => {
      const data = config.body
      let hasUser = false
      for (const user of List) {
        if (
          user.userName === data.userName &&
          user.password === data.passWord
        ) {
          hasUser = true
          return {
            code: '0000',
            data: user,
          }
        }
      }
      if (!hasUser) {
        return {
          code: '500',
          message: '账号或密码错误',
        }
      }
    },
  },
]
