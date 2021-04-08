import router from './router'

import NProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 进度条样式
NProgress.configure({ showSpinner: false }) // NProgress configuration


import { appStore } from '@/store/modules/app'

import wsCache from '@/cache'

import getPageTitle from '@/utils/get-page-title'

import { permissionStore } from '@/store/modules/permission'

import type { RouteRecordRaw } from 'vue-router'

const whiteList: string[] = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    // 判断是否已经登
    if (wsCache.get(appStore.userInfo)) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            // 是否已经进行过路由的添加操作
            if (permissionStore.isAddRouters) {
                next()
                return
            }
            permissionStore.GenerateRoutes().then(() => {
                permissionStore.addRouters.forEach(async (route: RouteRecordRaw) => {
                    await router.addRoute(route.name!, route) // 动态添加可访问路由表
                })
                const redirectPath = (from.query.redirect || to.path) as string
                const redirect = decodeURIComponent(redirectPath)
                const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
                permissionStore.SetIsAddRouters(true)
                next(nextData)
            })
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            })
        }
    }
})

router.afterEach((to) => {
    // document.title = getPageTitle(to.meta.title, appStore.title)
    NProgress.done() // 结束进度条
})
