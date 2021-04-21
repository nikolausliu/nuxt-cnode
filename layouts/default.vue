<template>
  <div>
    <TheHeader />
    <section class="main">
      <Nuxt />
    </section>
  </div>
</template>

<script>
export default {
  name: 'Default',

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
</style>
