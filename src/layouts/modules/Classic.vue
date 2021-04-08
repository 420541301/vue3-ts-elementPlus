<template>
  <div class="app_wrap">
    <div class="sider_wrap">
      <Sider :layout="layout" mode="vertical" />
    </div>
    <div class="main_wrap">
      <el-scrollbar class="main_wrap_content main__wrap--fixed--all">
        <div class="header_warp">
          <Header />
        </div>
        <div class="content_warp">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { appStore } from "@/store/modules/app";

import Header from "_c/Header/index.vue";
import Sider from "_c/Sider/index.vue";
export default defineComponent({
  name: "Classic",
  components: {
    Header,
    Sider,
  },
  setup() {
    const layout = computed(() => appStore.layout);
    return { layout };
  },
});
</script>

<style lang="less" scoped>
@import "./style.less";
</style>