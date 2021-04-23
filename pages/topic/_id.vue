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
            <template v-if="accesstoken">
              <span>·</span>
              <i
                class="iconfont"
                :class="info.is_collect ? 'icon-favorites-fill' : 'icon-favorites'"
                @click="switchCollect"
              ></i>
            </template>
          </div>
        </div>
        <div class="topic-content markdown-body" v-html="info.content"></div>
      </div>
      <div class="replies common-board">
        <div class="replies-header">
          <span>{{ info.replies.length }}条回复</span>
          <template v-if="info.replies.length">
            <span>·</span>
            <span
              >由
              <NuxtLink :to="`/user/${info.replies[info.replies.length - 1].author.loginname}`">{{
                info.replies[info.replies.length - 1].author.loginname
              }}</NuxtLink>
              最后回复于
              {{ info.replies[info.replies.length - 1].create_at | dateTimeFormat }}</span
            >
          </template>
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
              <span>·</span>
              <NuxtLink class="replies-item__floor" :to="`#${reply.id}`"
                >{{ replyIndex + 1 }}楼</NuxtLink
              >
              <span>·</span>
              <span class="replies-item__time">{{ reply.create_at | timeago }}</span>
              <div class="replies-item__opts">
                <i v-if="accesstoken" class="replies-item__reply iconfont icon-reply-fill"></i>
                <div class="replies-item__upvote">
                  <i
                    class="iconfont"
                    :class="reply.is_uped ? 'icon-good-fill' : 'icon-good'"
                    @click="switchUpdown(reply.id, replyIndex)"
                  ></i>
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
import { getTopicDetail, collectTopic, uncollectTopic, updownTopic } from '@/api'
export default {
  name: 'Topic',

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
      const params = {}
      if (this.accesstoken) {
        params.accesstoken = this.accesstoken
      }
      const { success, data } = (await getTopicDetail(this.$axios, id, params)).data
      if (success) {
        this.info = data
      }
    } catch (e) {
      console.log(e)
    }
  },

  computed: {
    accesstoken() {
      return this.$store.state.user.accesstoken
    },
  },

  methods: {
    switchCollect() {
      const params = {
        topic_id: this.info.id,
        accesstoken: this.accesstoken,
      }
      if (this.info.is_collect) {
        uncollectTopic(this.$axios, params).then((res) => {
          console.log('res', res)
          if (res.data.success) {
            this.info.is_collect = false
          }
        })
      } else {
        collectTopic(this.$axios, params).then((res) => {
          console.log('res', res)
          if (res.data.success) {
            this.info.is_collect = true
          }
        })
      }
    },

    switchUpdown(id, index) {
      updownTopic(this.$axios, id, { accesstoken: this.accesstoken }).then((res) => {
        console.log('res', res)
        const { success, action } = res.data
        if (success) {
          if (action === 'up') {
            this.info.replies[index].is_uped = true
            this.info.replies[index].ups.push(this.$store.state.user.id)
          } else {
            this.info.replies[index].is_uped = false
            this.info.replies[index].ups.pop()
          }
        }
      })
    },
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
    .iconfont {
      cursor: pointer;
    }
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
