<template>
  <div class="hello">
    <h1>{{propsData}}</h1>
  </div>
</template>

<script lang="ts">
import { inject } from "vue";
export default  {
  name:'child',
  setup(){
    const propsData = inject('propsData')
    return {propsData}
  }
}
</script>

<style scoped lang="less">

</style>
