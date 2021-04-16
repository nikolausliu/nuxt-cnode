<template>
  <div>
    <header class="header">
      <nav class="nav">
        <NuxtLink v-for="item in nav" :key="item.title" class="nav-item" :to="`/${item.tab}`">{{
          item.title
        }}</NuxtLink>
      </nav>
    </header>
    <section class="pagination">
      <a v-if="!prevDisabled" :href="prev">&lt;上一页</a>
      <a v-else class="disabled">&lt;上一页</a>
      <span>{{ page }}</span>
      <!-- <input v-model="page" class="input" type="text" @keyup.enter="jump" /> -->
      <!-- <el-input-number
        v-model="page"
        controls-position="right"
        size="small"
        :min="1"
      ></el-input-number> -->
      <a :href="next">下一页&gt;</a>
    </section>
    <section class="main">
      <Nuxt />
    </section>
  </div>
</template>

<script>
import { tabs } from '@/constant'
export default {
  data() {
    return {
      nav: tabs,
    }
  },
  computed: {
    // page: {
    //   get() {
    //     const page = this.$route.query.page
    //     return parseInt(page) || 1
    //   },
    //   set(val) {
    //     const page = parseInt(val) || 1
    //     this.page = page
    //   },
    // },
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
  // methods: {
  //   jump() {
  //     this.$router.push(`?page=${this.page}`)
  //   },
  // },
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 55px;
  background: #444;
  .nav {
    max-width: 800px;
    margin: 0 auto;
    padding: 15px 5px;
    .nav-item {
      display: inline-block;
      line-height: 24px;
      transition: color 0.15s ease;
      vertical-align: middle;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 300;
      letter-spacing: 0.075em;
      text-decoration: none;
      &:not(:last-child) {
        margin-right: 1.8em;
      }
      &.nuxt-link-active {
        color: #fff;
      }
    }
  }
}
.pagination {
  position: fixed;
  top: 55px;
  right: 0;
  left: 0;
  z-index: 998;
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
  // input {
  //   margin: 0 5px;
  //   width: 50px;
  //   padding: 0 10px;
  //   border: 1px solid #eee;
  //   font-size: 14px;
  //   outline: none;
  //   color: #34495e;
  // }
}
.main {
  max-width: 800px;
  margin: 135px auto 20px;
  border-radius: 2px;
  background: #fff;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
