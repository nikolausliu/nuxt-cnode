<template>
  <div class="layout-default">
    <TheHeader />
    <section class="main">
      <Nuxt />
    </section>
    <div v-if="accesstoken" class="post" title="发布话题">
      <i class="el-icon-plus"></i>
    </div>
    <el-backtop :right="24" :bottom="24" title="回到顶部"></el-backtop>
  </div>
</template>

<script>
export default {
  name: 'Default',

  computed: {
    accesstoken() {
      return this.$store.state.user.accesstoken
    },
  },

  errorCaptured(err, vm, info) {
    // this.renderError = info === "render"; // indicates a template rendering error
    console.log('errorCaptured in layout', err, vm, info)
    // 阻止错误继续冒泡
    return false
  },
}
</script>

<style lang="less" scoped>
.main {
  max-width: var(--main-max-width);
  margin: 70px auto 20px;
  border-radius: 2px;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.post {
  position: fixed;
  right: 24px;
  bottom: 76px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 14px;
  border-radius: 50%;
  background-color: #fff;
  color: #909090;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
  cursor: pointer;
  &:hover {
    background: #f2f6fc;
  }
}
</style>

<style lang="less">
.layout-default .el-backtop {
  font-size: 14px;
  color: #909090;
}
</style>
