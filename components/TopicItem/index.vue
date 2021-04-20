<template>
  <div class="topic-item">
    <template v-if="pending"> </template>
    <template v-else>
      <NuxtLink :to="`/user/${author.loginname}`" class="avatar">
        <BaseImage :src="author.avatar_url" :img-style="{ borderRadius: '4px' }" />
      </NuxtLink>
      <div class="right">
        <NuxtLink class="title" :to="`/topic/${id}`">
          <span v-if="top" class="tag tag-top">置顶</span
          ><span v-if="good" class="tag tag-good">精华</span>{{ title }}
        </NuxtLink>
        <div class="info">
          <template v-if="tab">
            <span class="tag">{{ tab | tag }}</span>
            <span>·</span>
          </template>
          <template v-if="author.loginname">
            <NuxtLink :to="`/user/${author.loginname}`">{{ author.loginname }}</NuxtLink>
            <span>·</span>
          </template>
          <template v-if="visitCount">
            <span>{{ replyCount }}/{{ visitCount }}</span>
            <span>·</span>
          </template>
          <template v-if="lastReplyAt">
            <span>最后回复于{{ lastReplyAt | timeago }}</span>
          </template>
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
    margin-right: 10px;
    width: 48px;
    height: 48px;
    .img {
      width: 48px;
      height: 48px;
      border-radius: 4px;
      &-error {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    .title {
      display: flex;
      align-items: center;
      line-height: 26px;
      margin-bottom: 2px;
      .tag {
        padding: 4px;
        line-height: 12px;
        font-size: 12px;
        border-radius: 2px;
        margin-right: 5px;
        background: #334;
        color: #fff;
      }
    }
    .info {
      height: 20px;
      font-size: 12px;
      color: #ccc;
      .tag {
        padding: 4px;
        line-height: 12px;
        border-radius: 2px;
        background-color: #f5f5f5;
        color: #999;
      }
    }
  }
}
</style>
