<template>
  <div class="user">
    <div class="profile common-board">
      <!-- <img :src="info.avatar_url" alt="avatar" class="avatar" /> -->
      <div class="avatar">
        <BaseImage :src="info.avatar_url" :img-style="{ borderRadius: '50%' }" />
      </div>
      <div class="username">{{ info.loginname }}</div>
      <div class="profile-item score">积分: {{ info.score }}</div>
      <div class="profile-item created-at">账号创建于: {{ info.create_at | dateTimeFormat }}</div>
      <div class="socials">
        <NuxtLink
          v-if="info.githubUsername"
          :to="`https://github.com/${info.githubUsername}`"
          target="_blank"
          class="socials-item"
        >
          <i class="iconfont icon-github-fill"></i>
        </NuxtLink>
      </div>
    </div>
    <div class="activities">
      <div class="topics common-board">
        <div class="topics-header">
          <div class="topics-header__title">最近创建的话题</div>
        </div>
        <template v-if="info.recent_topics.length">
          <TopicItem v-for="topic in info.recent_topics" :key="topic.id" v-bind="topic" />
        </template>
        <div v-else class="topics-empty">无话题</div>
      </div>
      <div class="topics common-board">
        <div class="topics-header">
          <div class="topics-header__title">最近参与的话题</div>
        </div>
        <template v-if="info.recent_replies.length">
          <TopicItem v-for="topic in info.recent_replies" :key="topic.id" v-bind="topic" />
        </template>
        <div v-else class="topics-empty">无话题</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import { obj2CamelCase } from '@/utils'
export default {
  name: 'User',
  data() {
    return {
      info: {
        loginname: '',
        avatar_url: '',
        githubUsername: '',
        create_at: '',
        score: '',
        recent_topics: [],
        recent_replies: [],
      },
    }
  },
  async fetch() {
    const { name } = this.$route.params
    try {
      const { success, data } = (await getUserInfo(this.$axios, name)).data
      if (success) {
        this.info = data
        this.info.recent_topics = data.recent_topics.map((item) => obj2CamelCase(item))
        this.info.recent_replies = data.recent_replies.map((item) => obj2CamelCase(item))
      }
    } catch (e) {
      console.log(e)
    }
  },
}
</script>

<style lang="less" scoped>
.user {
  .profile {
    position: relative;
    padding: 10px;
    font-size: 12px;
    color: var(--color-gray);
    &-item {
      line-height: 24px;
    }
    .avatar {
      display: block;
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    .username {
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      color: #333;
    }
    .socials {
      position: absolute;
      top: 14px;
      right: 14px;
      &-item {
        &:hover {
          text-decoration: none;
        }
        i {
          font-size: 24px;
        }
      }
    }
  }
  .activities {
    margin-top: 10px;
    .topics {
      margin-bottom: 10px;
      &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid var(--border-color);
        font-size: 14px;
        color: var(--color-gray);
        &__more {
          font-size: 12px;
        }
      }
      &-empty {
        padding: 10px;
        font-size: 12px;
        color: var(--color-gray);
      }
    }
  }
}
</style>
