<template>
  <section class="pagination">
    <NuxtLink v-if="!prevDisabled" :to="prev">&lt;上一页</NuxtLink>
    <a v-else class="disabled">&lt;上一页</a>
    <span>{{ page }}</span>
    <NuxtLink :to="next">下一页&gt;</NuxtLink>
  </section>
</template>

<script>
export default {
  computed: {
    page() {
      const page = this.$route.query.page
      return parseInt(page) || 1
    },
    prev() {
      return `?page=${this.page - 1}`
    },
    prevDisabled() {
      return this.page === 1
    },
    next() {
      return `?page=${this.page + 1}`
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  height: 50px;
  padding: 15px 30px;
  text-align: center;
  background: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  a {
    color: #34495e;
    font-size: 14px;
    text-decoration: none;
    &.disabled {
      color: #ccc;
    }
  }
  span {
    margin: 0 10px;
    color: #34495e;
    font-size: 14px;
  }
}
</style>
