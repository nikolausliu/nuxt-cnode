<template>
  <div>
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
      <PostItem v-for="item in list" :key="item.id" v-bind="item" />
    </div>
    <ThePagination />
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
}
</script>
