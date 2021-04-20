<template>
  <div class="topic">
    <template v-if="$fetchState.pending">
      <div class="common-board topic-skeleton">
        <div class="header">
          <div class="skeleton title"></div>
          <div class="skeleton extra"></div>
        </div>
        <div class="content">
          <div v-for="item in 20" :key="item" class="paragraph">
            <div class="skeleton"></div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="topic-info common-board">
        <div class="topic-header">
          <div class="topic-title">{{ info.title }}</div>
          <div class="topic-extra">
            <NuxtLink :to="`/user/${info.author_id}`">{{ info.author.loginname }}</NuxtLink>
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
      <div class="replies common-board">
        <div class="replies-header">
          <span>{{ info.replies.length }}条回复</span>
          <span>·</span>
          <span
            >由
            <NuxtLink :to="`/user/${info.replies[info.replies.length - 1].author.loginname}`">{{
              info.replies[info.replies.length - 1].author.loginname
            }}</NuxtLink>
            最后回复于 {{ info.replies[info.replies.length - 1].create_at | dateTimeFormat }}</span
          >
        </div>
        <div
          v-for="(reply, replyIndex) in info.replies"
          :id="reply.id"
          :key="reply.id"
          class="replies-item"
        >
          <NuxtLink :to="`/user/${reply.author.loginname}`" class="replies-item__avatar">
            <img :src="reply.author.avatar_url" alt="avatar" />
          </NuxtLink>
          <div class="replies-item__info">
            <div class="replies-item__top">
              <NuxtLink :to="`/user/${reply.author.loginname}`" class="replies-item__author">{{
                reply.author.loginname
              }}</NuxtLink>
              <NuxtLink class="replies-item__floor" :to="`#${reply.id}`"
                >{{ replyIndex + 1 }}楼</NuxtLink
              >
              <span class="replies-item__time">{{ reply.create_at | timeago }}</span>
              <div class="replies-item__opts">
                <i class="replies-item__reply iconfont icon-reply-fill"></i>
                <div class="replies-item__upvote">
                  <i class="iconfont icon-good"></i>
                  <span>{{ reply.ups.length }}</span>
                </div>
              </div>
            </div>
            <div class="replies-item__content markdown-body" v-html="reply.content"></div>
          </div>
        </div>
      </div>
    </template>
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
  &-skeleton {
    .header {
      padding: 10px;
      border-bottom: 1px solid var(--border-color);
      .title {
        width: 50%;
        height: 30px;
        margin-bottom: 5px;
      }
      .extra {
        height: 16px;
      }
    }
    .content {
      padding: 10px;
      .paragraph {
        padding: 2px 0;
        margin-bottom: 16px;
        .skeleton {
          height: 24px;
        }
      }
    }
  }

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

  .replies {
    margin-top: 20px;
    &-header {
      padding: 10px;
      font-size: 12px;
      border-bottom: 1px solid var(--border-color);
      color: var(--color-gray);
    }
    &-item {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid var(--border-color);
      &__avatar {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        margin-right: 10px;
        img {
          width: 48px;
          height: 48px;
          border-radius: 4px;
        }
      }
      &__info {
        flex-grow: 1;
      }
      &__top {
        line-height: 20px;
        margin-bottom: 5px;
        font-size: 12px;
        color: var(--color-fade);
      }
      &__opts {
        display: flex;
        align-items: center;
        float: right;
      }
      &__reply {
        cursor: pointer;
        margin-right: 5px;
      }
      &__upvote {
        display: flex;
        align-items: center;
        i {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
