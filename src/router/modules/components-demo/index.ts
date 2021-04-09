import { AppRouteRecordRaw } from '../../types'
import Layout from '@/layouts/index.vue'
const componentsDemo: AppRouteRecordRaw[] = [
    {
        path: '/components-demo',
        component: Layout,
        redirect: '/components-demo/editor',
        name: 'ComponentsDemo',
        meta: {
            title: '功能组件',
            alwaysShow: true
        },
        children: [
            {
                path: 'editor',
                component: () => import('_p/components-demo/editor/index.vue'),
                name: 'Editor',
                meta: {
                    title: '富文本'
                }
            }
        ]
    },
]
export default componentsDemo