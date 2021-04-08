<template>
  <router-view class="app"/>
</template>

<style lang="less">
.size {
  min-width: @minWidth;
  width: 100;
  height: 100%;
}
#app {
  .size;
  background: @appBg;
}
html,body {
  .size;
  margin: 0;
  padding: 0;
}
</style>
