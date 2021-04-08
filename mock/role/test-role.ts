export const checkedRoleNodes = [
    {
        path: '/components-demo',
        component: '#',
        redirect: '/components-demo/editor',
        name: 'ComponentsDemo',
        meta: {
            title: '功能组件',
        },
        children: [
            {
                path: 'editor',
                component: 'components-demo/editor/index',
                name: 'Editor',
                meta: {
                    title: '富文本'
                }
            }
        ]
    }
]