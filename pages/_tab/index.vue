<template>
  <div class="common-board">
    <TheTabs />
    <div v-if="$fetchState.pending">
      <content-placeholders
        v-for="item in 20"
        :key="item"
        style="padding: 10px; border-bottom: 1px solid #eee"
      >
        <content-placeholders-heading :img="true" />
      </content-placeholders>
    </div>
    <div v-if="$fetchState.error">An Error Occured...</div>
    <div v-else class="posts">
      <template v-if="list.length">
        <TopicItem v-for="item in list" :key="item.id" v-bind="item" />
      </template>
      <div v-else class="empty"> 没有话题了 </div>
    </div>
    <ThePagination :next-disabled="!list.length" />
  </div>
</template>

<script>
import { getTopics } from '@/api'
import { obj2CamelCase } from '@/utils'
export default {
  data() {
    return {
      list: [],
    }
  },

  async fetch() {
    const { tab } = this.$route.params
    const { page = 1 } = this.$route.query
    try {
      const res = await getTopics(this.$axios, { tab, page })
      this.list = res.data.data.map((item) => {
        return obj2CamelCase(item)
      })
    } catch (e) {
      console.log(e)
    }
  },

  fetchOnServer: true,

  watch: {
    // watchQuery doesn't work,and i don't know why
    // so i use watch as a fallback and it works
    '$route.query.page'() {
      this.$fetch()
    },
  },

  watchQuery: true,
}
</script>

<style lang="less" scoped>
.empty {
  padding: 10px;
  font-size: 14px;
  color: var(--color-gray);
}
</style>
