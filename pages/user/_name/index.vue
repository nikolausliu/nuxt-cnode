<template>
  <div class="user">
    <div class="profile common-board">
      <img :src="info.avatar_url" alt="avatar" class="avatar" />
      <div class="username">{{ info.loginname }}</div>
      <div class="github">Github: {{ info.githubUsername }}</div>
      <div class="score">积分: {{ info.score }}</div>
      <div class="created-at">账号创建于: {{ info.create_at | dateTimeFormat }}</div>
    </div>
    <div class="activities">
      <div class="topics common-board">
        <div class="topics-header">
          <div class="topic-headers__title">最近创建的话题</div>
          <a class="topic-headers__more">查看更多</a>
        </div>
        <TopicItem v-for="topic in info.recent_topics" :key="topic.id" v-bind="topic" />
      </div>
      <div class="topics common-board">
        <div class="topics-header">
          <div class="topic-headers__title">最近参与的话题</div>
          <a class="topic-headers__more">查看更多</a>
        </div>
        <TopicItem v-for="topic in info.recent_replies" :key="topic.id" v-bind="topic" />
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
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
        this.info.recent_topics = data.recent_topics.slice(0, 5)
        this.info.recent_replies = data.recent_replies.slice(0, 5)
      }
    } catch (e) {
      console.log(e)
    }
  },
}
</script>

<style lang="less" scoped>
.user {
  // display: flex;
  .profile {
    float: left;
    width: 290px;
    padding: 10px;
    margin-right: 10px;
    font-size: 12px;
    color: var(--color-gray);
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 4px;
    }
  }
  .activities {
    float: left;
    width: 500px;
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
      }
    }
  }
}
</style>
