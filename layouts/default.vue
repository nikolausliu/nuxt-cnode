<template>
  <div>
    <TheHeader />
    <section class="main">
      <Nuxt />
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.main {
  max-width: var(--main-max-width);
  margin: 70px auto 20px;
  border-radius: 2px;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
