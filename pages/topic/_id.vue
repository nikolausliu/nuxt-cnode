<template>
  <div class="topic">
    <div class="topic-info common-board">
      <div class="topic-header">
        <div class="topic-title">{{ info.title }}</div>
        <div class="topic-extra">
          <a :href="`/user/${info.author_id}`">{{ info.author.loginname }}</a>
          <span>·</span>
          <span>发布于{{ info.create_at | timeago }}</span>
          <span>·</span>
          <span>{{ info.visit_count }}次点击</span>
          <span>·</span>
          <span class="tag">{{ info.tab | tag }}</span>
        </div>
      </div>
      <div class="topic-content markdown-body" v-html="info.content"></div>
    </div>
    <div class="replies"></div>
  </div>
</template>

<script>
import { getTopicDetail } from '@/api'
export default {
  data() {
    return {
      info: {
        id: '',
        author_id: '',
        title: '',
        content: '',
        tab: '',
        last_reply_at: '',
        good: false,
        top: false,
        reply_count: 0,
        visit_count: 0,
        create_at: '',
        author: {
          loginname: '',
          avatar_url: '',
        },
        replies: [],
        is_collect: false,
      },
    }
  },
  async fetch() {
    try {
      const { id } = this.$route.params
      const { success, data } = (await getTopicDetail(this.$axios, id)).data
      if (success) {
        this.info = data
      }
    } catch (e) {
      console.log(e)
    }
  },
  fetchOnServer: false,
}
</script>

<style lang="less" scoped>
.topic {
  &-header {
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
  }
  &-title {
    font-size: 24px;
    margin-bottom: 5px;
  }
  &-extra {
    font-size: 12px;
    color: var(--color-gray);
  }
  &-content {
    padding: 10px;
  }
}
</style>
