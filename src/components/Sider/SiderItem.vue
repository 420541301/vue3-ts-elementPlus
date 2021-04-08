<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import type { RouteRecordRaw } from "vue-router";
import path from "path";
import { isExternal } from "@/utils/validate";
export default defineComponent({
  name: "SiderItem",
  props: {
    // route object
    item: {
      type: Object as PropType<object>,
      required: true,
    },
    isNest: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    basePath: {
      type: String as PropType<string>,
      default: "",
    },
    layout: {
      type: String as PropType<string>,
      default: "Classic",
    },
  },
  setup(props) {
    return {};
  },
});
</script>