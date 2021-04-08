/**
 * Options API形式的组件生命周期钩子和Composition API之间的实际对应关系
 * beforeCreate -> setup()
 * created -> setup()
 * beforeMount -> onBeforeMount
 * mounted -> onMounted
 * beforeUpdate -> onBeforeUpdate
 * updated -> onUpdated
 * beforeDestroy -> onBeforeUnmount
 * destroyed -> onUnmounted
 * errorCaptured -> onErrorCaptured
 */

import { createApp } from "vue";

import App from "./App.vue";

import router from "./router";

import store from "./store";

import './permission'

import { mockXHR } from '../mock'

import ElementPlus from 'element-plus';
import '@/styles/index.less'

mockXHR() // mock注册

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
