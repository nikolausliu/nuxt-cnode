<template>
  <nav class="tabs">
    <NuxtLink v-for="item in nav" :key="item.title" class="tabs-item" :to="`/${item.tab}`">{{
      item.title
    }}</NuxtLink>
  </nav>
</template>

<script>
import { tabs } from '@/constant'
export default {
  data() {
    return {
      nav: tabs,
    }
  },
}
</script>

<style lang="less" scoped>
.tabs {
  max-width: var(--main-max-width);
  margin: 0 auto;
  padding: 10px;
  border-bottom: 1px solid #eee;
  &-item {
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    padding: 5px 8px;
    margin-right: 5px;
    border-radius: 2px;
    color: #555;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background-color: #f5f5f5;
      color: #000;
    }
    &.nuxt-link-active {
      background-color: #334;
      color: #fff;
    }
  }
}
</style>
