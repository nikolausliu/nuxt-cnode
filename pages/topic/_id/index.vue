<template>
  <div class="topic">
    <template v-if="$fetchState.pending">
      <div class="common-board topic-skeleton">
        <content-placeholders>
          <content-placeholders-heading />
          <content-placeholders-img />
          <content-placeholders-text :lines="20" />
        </content-placeholders>
      </div>
    </template>

    <template v-else-if="$fetchState.error">
      <div class="common-board topic-error"> 此话题不存在或已被删除 </div>
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
        <div class="topic-actions">
          <span @click="switchCollect">{{ info.is_collect ? '取消收藏' : '收藏' }}</span>
          <NuxtLink v-if="isOwner" :to="`/topic/${info.id}/edit`">编辑</NuxtLink>
          <!-- <span v-if="isOwner" @click="handleDelete">删除</span> -->
        </div>
      </div>

      <div v-if="info.replies.length" class="replies common-board">
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
            </div>
            <div class="replies-item__content markdown-body" v-html="reply.content"></div>
            <div class="replies-item__action">
              <span class="replies-item__action-item">
                <i
                  class="iconfont"
                  :class="reply.is_uped ? 'icon-good-fill' : 'icon-good'"
                  @click="switchUpdown(reply.id, replyIndex)"
                ></i>
                <span>{{ reply.ups.length }}</span>
              </span>
              <span class="replies-item__action-item" @click="mentionOn(reply)">
                <i class="iconfont icon-comment-fill"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="add-reply common-board">
        <div class="add-reply__header">
          <div class="add-reply__title">添加一条新回复</div>
        </div>
        <div class="add-reply__body">
          <el-input
            id="replyContent"
            ref="replyContent"
            v-model="content"
            type="textarea"
            :autosize="{ minRows: 6 }"
            :placeholder="replyPlaceholder"
          >
          </el-input>
          <div class="add-reply__footer">
            <el-button size="mini" type="primary" :disabled="content === ''" @click="submit"
              >回复</el-button
            >
            <el-button v-if="mentionId" size="mini" @click="cancelMention">取消@</el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  getTopicDetail,
  collectTopic,
  uncollectTopic,
  deleteTopic,
  updownTopic,
  replyTopic,
} from '@/api'
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
      content: '',
      mentionId: '',
      mentionName: '',
    }
  },

  async fetch() {
    const { id } = this.$route.params
    const params = {}
    if (this.accesstoken) {
      params.accesstoken = this.accesstoken
    }
    const { success, data } = (await getTopicDetail(this.$nuxt.$axios, id, params)).data
    if (success) {
      this.info = data
    }
  },

  computed: {
    accesstoken() {
      return this.$store.state.user.accesstoken
    },
    replyPlaceholder() {
      return this.mentionName ? `回复 ${this.mentionName}` : '支持markdown格式哦'
    },
    isOwner() {
      return this.info.author_id === this.$store.state.user.id
    },
  },

  mounted() {
    console.log(this.$fetchState)
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

    handleDelete() {
      this.$confirm('确定要删除此话题吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteTopic(this.$axios, this.info.id, { accesstoken: this.accesstoken }).then(() => {
            this.$nuxt.redirect(`/`)
          })
        })
        .catch(() => {
          console.log('取消删除')
        })
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

    focus() {
      this.$refs.replyContent.focus()
    },

    mentionOn(reply) {
      this.mentionId = reply.id
      this.mentionName = reply.author.loginname
      this.focus()
    },

    cancelMention() {
      this.mentionId = ''
      this.mentionName = ''
      this.focus()
    },

    parseMention(content) {
      if (content === '') return ''
      if (!this.mentionName) return content
      const mention = `@${this.mentionName} `
      return `${mention}\n${content}`
    },

    parseTail(content) {
      if (content === '') return ''
      return (
        content + '\n\n' + '>来自炫酷的 [nuxt-cnode](https://github.com/nikolausliu/nuxt-cnode)'
      )
    },

    submit() {
      if (!this.content) {
        this.$message.error('还没有输入回复内容哦')
      }
      let content = this.parseMention(this.content)
      content = this.parseTail(content)
      const params = {
        content,
      }
      if (this.accesstoken) {
        params.accesstoken = this.accesstoken
      }
      if (this.mentionId) {
        params.reply_id = this.mentionId
      }
      replyTopic(this.$axios, this.info.id, params)
        .then((res) => {
          this.cancelMention()
          this.content = ''
          this.$fetch()
        })
        .catch((err) => {
          console.log(err)
          this.cancelMention()
          this.content = ''
        })
    },
  },

  fetchOnServer: true,
}
</script>

<style lang="less" scoped>
.topic {
  &-skeleton {
    padding: 10px;
  }

  &-error {
    padding: 10px;
    font-size: 14px;
    color: var(--color-gray);
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
    .tag {
      padding: 3px 4px;
      border-radius: 2px;
      background-color: #f5f5f5;
    }
  }
  &-content {
    padding: 10px;
  }
  &-actions {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid var(--border-color);
    font-size: 12px;
    span,
    a {
      margin-right: 10px;
      cursor: pointer;
      color: var(--color-gray);
    }
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
        // fix: 代码块会超出最大长度
        width: calc(100% - 58px);
      }
      &__top {
        line-height: 20px;
        margin-bottom: 5px;
        font-size: 12px;
        color: var(--color-fade);
      }
      &__action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 12px;
        color: var(--color-fade);
        &-item {
          display: flex;
          align-items: center;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
  }

  .add-reply {
    margin-top: 20px;
    &__header {
      padding: 10px;
      border-bottom: 1px solid var(--border-color);
      font-size: 12px;
      color: var(--color-gray);
    }
    &__body {
      padding: 10px;
    }
    &__footer {
      display: flex;
      margin-top: 10px;
    }
  }
}
</style>
