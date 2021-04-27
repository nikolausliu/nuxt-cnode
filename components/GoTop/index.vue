<template>
  <div class="gotop" @click="goTop">
    <i class="iconfont icon-arrow-up-filling"></i>
  </div>
</template>

<script>
export default {
  name: 'GoTop',

  data() {
    return {
      visible: false,
    }
  },

  mounted() {},

  methods: {
    goTop() {
      const easeout = function (position, destination, rate, callback) {
        if (position === destination || typeof destination !== 'number') {
          return false
        }
        destination = destination || 0
        rate = rate || 2

        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function (fn) {
            return setTimeout(fn, 17)
          }
        }

        const step = function () {
          position = position + (destination - position) / rate
          if (Math.abs(destination - position) < 1) {
            callback(destination, true)
            return
          }
          callback(position, false)
          requestAnimationFrame(step)
        }
        step()
      }
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      easeout(scrollTop, 0, 5, (val) => {
        window.scrollTo(0, val)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.gotop {
  position: fixed;
  right: 24px;
  bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: #909090;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 50%;
  box-shadow: 0 0 5px rgb(0 0 0 / 5%);
  cursor: pointer;
  .iconfont {
    font-size: 12px;
  }
}
</style>
