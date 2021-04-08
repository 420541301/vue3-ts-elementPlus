<template>
  <div class="login-wrap">
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-form">
      <el-form-item prop="userName">
        <el-input v-model="form.userName" placeholder="请输入账号 admin or test" class="form--input" />
      </el-form-item>
      <el-form-item prop="passWord">
        <el-input v-model="form.passWord" show-password :minlength="3" :maxlength="18" placeholder="请输入账号 admin or test" class="form--input" />
      </el-form-item>
      <el-form-item>
        <el-button @click="login" :loading="loading" type="primary" class="login--button">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref, unref, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { permissionStore } from "@/store/modules/permission";
import { appStore } from "@/store/modules/app";
import wsCache from "@/cache";

import { loginApi, getRoleDetApi } from "./api";

interface FormModule {
  userName: string;
  passWord: string;
}
interface RulesModule {
  userName: any[];
  passWord: any[];
}
export default {
  name: "Login",
  /*
    setup 函数还有两个参数，分别是 props 、context，
    前者存储着定义当前组件允许外界传递过来的参数名称以及对应的值；
    后者是一个上下文对象，能从中访问到 attr 、emit 、slots
  */
  // setup 函数也是 Compsition API 的入口函数，变量、方法都是在该函数里定义的
  setup() {
    const { push, addRoute, currentRoute } = useRouter();
    onMounted(() => {
      // console.log(this);
      // console.log("The state is  %conMounted %cnow!", "color:red", "none");
    });
    // 在setup中，this 指向的是 undefined

    /* 
    基本类型值（String 、Nmuber 、Boolean 等）或单值对象（类似像 {count: 3} 这样只有一个属性值的对象）使用 ref
    引用类型值（Object 、Array）使用 reactive
    */
    const loginForm = ref<HTMLElement | null>(null);
    const loading = ref<boolean>(false);
    const redirect = ref<string>("");
    const form = reactive<FormModule>({
      userName: "",
      passWord: "",
    });
    watch(
      () => {
        return currentRoute.value;
      },
      (route) => {
        redirect.value = (route.query && route.query.redirect) as string;
      },
      {
        immediate: true,
      }
    );

    const rules = reactive<RulesModule>({
      userName: [{ required: true, message: "请输入账号" }],
      passWord: [{ required: true, message: "请输入密码" }],
    });
    /* 
    1、ref 是对传入数据的拷贝；toRef 是对传入数据的引用
    2、ref 的值改变会更新视图；toRef 的值改变不会更新视图
    3、toRefs 将传入的对象里所有的属性的值都转化为响应式数据对象
    */

    async function login(): Promise<void> {
      const formWrap = unref(loginForm) as any;
      if (!formWrap) return;
      loading.value = true;
      try {
        formWrap.validate(async (valid: boolean) => {
          if (valid) {
            const res = await loginApi({ data: form });
            if (res) {
              const role = await getRoleDetApi({
                params: {
                  id: res.data.roleId,
                },
              });
              if (role) {
                wsCache.set(appStore.userInfo, Object.assign(form, role.data));
                permissionStore.GenerateRoutes().then(() => {
                  permissionStore.addRouters.forEach(
                    async (route: RouteRecordRaw) => {
                      await addRoute(route.name!, route); // 动态添加可访问路由表
                    }
                  );
                  permissionStore.SetIsAddRouters(true);
                  push({ path: redirect.value || '/' })
                });
              }
            } else {
              console.log("error submit!!");
              return false;
            }
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        loading.value = false;
      }
    }

    return {
      loginForm,
      loading,
      form,
      rules,
      login,
    };
  },
};

/* 生命周期对比
    vue2              vue3
    beforeCreate    	setup
    created          	setup
    beforeMount      	onBeforeMount
    mounted          	onMounted
    beforeUpdate	    onBeforeUpdate
    updated          	onUpdated
    beforeDestory    	onBeforeUnmount
    destoryed        	onUnmounted 
  */
</script>

<style lang="less" scoped>
.login-wrap {
  width: 500px;
  height: 500px;
  margin: auto;
}
</style>
