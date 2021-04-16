<template>
  <div class="post-item">
    <template v-if="pending"> </template>
    <template v-else>
      <img :src="author.avatar_url" alt="avatar" class="avatar" />
      <div class="right">
        <div class="title">{{ title }}</div>
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
          <!-- <div class="divider">·</div> -->
          <!-- <div class="info-item">最后回复来自{{  }}</div> -->
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
      margin-bottom: 4px;
    }
    .info {
      display: flex;
      align-items: center;
      height: 18px;
      font-size: 12px;
      color: #ccc;
      .divider {
        padding: 0 5px;
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
