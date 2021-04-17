<template>
  <div class="post-item">
    <template v-if="pending"> </template>
    <template v-else>
      <img :src="author.avatar_url" alt="avatar" class="avatar" />
      <div class="right">
        <NuxtLink class="title" :to="`/topic/${id}`">{{ title }}</NuxtLink>
        <div class="info">
          <div class="tag">{{ tab | tag }}</div>
          <div class="divider">·</div>
          <NuxtLink class="info-item link" :to="`/user/${author.loginname}`">{{
            author.loginname
          }}</NuxtLink>
          <div class="divider">·</div>
          <div class="info-item">{{ replyCount }}/{{ visitCount }}</div>
          <div class="divider">·</div>
          <div class="info-item">{{ lastReplyAt | timeago }}</div>
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
.post-item {
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
      color: #666;
      text-decoration: none;
      &:hover {
        color: #333;
        text-decoration: underline;
      }
    }
    .info {
      display: flex;
      align-items: center;
      height: 20px;
      font-size: 12px;
      color: #ccc;
      .divider {
        padding: 0 5px;
      }
      .tag {
        padding: 4px;
        line-height: 12px;
        border-radius: 2px;
        background-color: #f5f5f5;
        color: #999;
      }
      .link {
        color: #778087;
        text-decoration: none;
        &:hover {
          color: #4d5256;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
