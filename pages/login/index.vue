<template>
  <div class="login common-board">
    <div class="login-header">用户登录</div>
    <div class="login-form">
      <el-form inline>
        <el-form-item label="accesstoken:">
          <el-input
            v-model="accesstoken"
            size="small"
            clearable
            @keyup.enter="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api'
export default {
  name: 'Login',

  data() {
    return {
      accesstoken: '',
    }
  },

  methods: {
    handleLogin() {
      if (this.accesstoken === '') {
        this.$message.error('请填写accesstoken')
        return false
      }
      login(this.$axios, { accesstoken: this.accesstoken })
        .then((res) => {
          console.log('res', res)
        })
        .catch((err) => {
          console.dir(err)
          this.$message.error(err.response.data.error_msg || err.response.statusText || '未知错误')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  &-header {
    padding: 10px;
    font-size: 14px;
    color: var(--color-gray);
    border-bottom: 1px solid var(--border-color);
  }
  &-form {
    margin-top: 22px;
    padding: 10px;
  }
}
</style>
