<template>
  <el-image :src="src" class="base-image" :style="imgStyle">
    <div slot="placeholder" class="image-placeholder">
      <i class="iconfont icon-cnode-fill"></i>
    </div>
    <div slot="error" class="image-error">
      <i class="iconfont icon-image-fail-fill"></i>
    </div>
  </el-image>
</template>

<script>
export default {
  name: 'BaseImage',

  props: {
    src: {
      type: String,
      default: '',
    },
    imgStyle: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="less" scoped>
.base-image {
  width: 100%;
  height: 100%;
  .image-placeholder,
  .image-error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f7f8fa;
    i {
      font-size: 20px;
      color: #dcdee0;
    }
  }
}
</style>
