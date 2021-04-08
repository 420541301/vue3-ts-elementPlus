import wsCache from '../../src/cache'
import { Role } from './types'
import { checkedNodes, checkedkeys } from './admin-role'
import { checkedRoleNodes } from './test-role'

let List: Role[] = wsCache.get('roleList') || [
    {
        roleName: 'admin',
        id: '1',
        checkedNodes: checkedNodes,
        checkedkeys: checkedkeys
    },
    {
        roleName: 'test',
        id: '2',
        checkedNodes: checkedRoleNodes,
        checkedkeys: []
    }
]

export default [
    // 详情接口
    {
        url: 'http://localhost:8080/mock/role/detail',
        type: 'get',
        response: (config: any) => {
            const { id } = config.query
            for (const role of List) {
                if (role.id === id) {
                    return {
                        code: '0000',
                        data: role
                    }
                }
            }
        }
    },
]