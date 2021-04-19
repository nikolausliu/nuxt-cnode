<template>
  <header class="header">
    <div class="inner">
      <a class="logo" href="/">
        <img src="~/assets/imgs/logo.svg" alt="logo" />
      </a>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
  background: #444;
  .inner {
    display: flex;
    align-items: center;
    width: var(--main-max-width);
    height: 100%;
    margin: 0 auto;
    .logo {
      img {
        width: 120px;
      }
    }
  }
}
</style>
