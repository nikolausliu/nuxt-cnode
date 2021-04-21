<template>
  <header class="header">
    <div class="inner">
      <NuxtLink class="logo" to="/">
        <img src="~/assets/imgs/logo.svg" alt="logo" />
      </NuxtLink>
      <nav class="nav">
        <NuxtLink v-if="!accesstoken" to="/login">登录</NuxtLink>
        <el-dropdown v-else trigger="click" @command="handleCommand">
          <div class="avatar">
            <BaseImage :src="avatarUrl" :style="{ borderRadius: '50%' }" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="goUser">个人主页</el-dropdown-item>
            <el-dropdown-item command="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {
    accesstoken() {
      return this.$store.state.user.accesstoken
    },
    loginname() {
      return this.$store.state.user.loginname
    },
    avatarUrl() {
      return this.$store.state.user.avatar_url
    },
  },

  methods: {
    handleCommand(command) {
      switch (command) {
        case 'goUser':
          this.goUser()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    goUser() {
      this.$router.push(`user/${this.loginname}`)
    },
    logout() {
      this.$store.commit('user/logout')
      this.$router.push('/')
    },
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
    justify-content: space-between;
    align-items: center;
    width: var(--main-max-width);
    height: 100%;
    margin: 0 auto;
    .logo {
      img {
        width: 120px;
      }
    }
    .nav {
      display: flex;
      align-items: center;
      height: 100%;
      a {
        margin-left: 20px;
        font-size: 14px;
        color: var(--color-fade);
        &:hover {
          color: #fff;
          text-decoration: none;
        }
      }
      .avatar {
        width: 30px;
        height: 30px;
        cursor: pointer;
        &:focus {
          outline: 0;
        }
      }
    }
  }
}
</style>
