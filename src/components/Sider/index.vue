<template>
  <div class="sidebar-container">
    <el-scrollbar>
      <el-menu :default-active="activeMenu" :mode="mode" :unique-opened="false" @select="selectMenu">
        <SiderItem />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { appStore } from "@/store/modules/app";

import SiderItem from "./SiderItem.vue";
import { isExternal } from "@/utils/validate";

export default defineComponent({
  name: "Sider",
  components: { SiderItem },
  props: {
    layout: {
      type: String as PropType<string>,
      default: "Classic",
    },
    mode: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "vertical",
    },
  },
  setup() {
    const { currentRoute, push } = useRouter();
    const activeMenu = computed(() => {
      const { meta, path } = currentRoute.value;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    function selectMenu(path: string) {
      if (isExternal(path)) {
        window.open(path);
      } else {
        push(path);
      }
    }
    return {
      activeMenu,
      selectMenu,
    };
  },
});
</script>