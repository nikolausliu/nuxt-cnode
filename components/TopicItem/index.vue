<template>
  <div class="topic-item">
    <template v-if="pending"> </template>
    <template v-else>
      <img :src="author.avatar_url" alt="avatar" class="avatar" />
      <div class="right">
        <a class="title" :href="`/topic/${id}`">{{ title }}</a>
        <div class="info">
          <span class="tag">{{ tab | tag }}</span>
          <span>·</span>
          <NuxtLink :to="`/user/${author.loginname}`">{{ author.loginname }}</NuxtLink>
          <span>·</span>
          <span>{{ replyCount }}/{{ visitCount }}</span>
          <span>·</span>
          <span>{{ lastReplyAt | timeago }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    pending: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
    authorId: {
      type: String,
      default: '',
    },
    tab: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    lastReplyAt: {
      type: String,
      default: '',
    },
    good: {
      type: Boolean,
      default: false,
    },
    top: {
      type: Boolean,
      default: false,
    },
    replyCount: {
      type: Number,
      default: 0,
    },
    visitCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: String,
      default: '',
    },
    author: {
      type: Object,
      default: () => ({
        loginname: '',
        avatar_url: '',
      }),
    },
  },
}
</script>

<style lang="less" scoped>
.topic-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
  .avatar {
    width: 48px;
    height: 48px;
    margin-right: 10px;
    border-radius: 4px;
  }
  .right {
    .title {
      line-height: 26px;
      margin-bottom: 2px;
    }
    .info {
      // display: flex;
      // align-items: center;
      height: 20px;
      font-size: 12px;
      color: #ccc;
      // .divider {
      //   padding: 0 5px;
      // }
      .tag {
        padding: 4px;
        line-height: 12px;
        border-radius: 2px;
        background-color: #f5f5f5;
        color: #999;
      }
      // .link {
      //   color: #778087;
      //   text-decoration: none;
      //   &:hover {
      //     color: #4d5256;
      //     text-decoration: underline;
      //   }
      // }
    }
  }
}
</style>
