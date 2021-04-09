import type { RouteRecordRaw } from 'vue-router'
export interface RouteMeta {
  hidden?: boolean
  alwaysShow?: boolean
  title?: string
  icon?: string
  noCache?: boolean
  activeMenu?: string
  followRoute?: string
  showMainRoute?: boolean
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta
  children?: AppRouteRecordRaw[]
}
