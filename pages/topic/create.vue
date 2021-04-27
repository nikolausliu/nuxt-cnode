<template>
  <div class="create common-board">
    <div class="create-header">发布话题</div>
    <div class="create-body">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="tab">
          <el-select v-model="form.tab" placeholder="请选择板块" size="small" clearable>
            <el-option
              v-for="item in tabs"
              :key="item.tab"
              :label="item.title"
              :value="item.tab"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="title">
          <el-input
            v-model="form.title"
            placeholder="标题字数10字以上"
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :autosize="{ minRows: 6 }"
            placeholder="话题内容支持markdown格式哦"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submit">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { tabs } from '@/constant'
import { postTopic } from '@/api'
export default {
  name: 'TopicCreate',

  data() {
    return {
      tabs: tabs.filter((item) => item.tab !== 'all' && item.tab !== 'good'),
      form: {
        tab: '',
        title: '',
        content: '',
      },
      rules: {
        tab: [{ required: true, message: '请选择话题板块' }],
        title: [{ required: true, message: '请填写话题标题' }],
        content: [{ required: true, message: '请填写话题内容' }],
      },
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            accesstoken: this.$store.state.user.accesstoken,
            ...this.form,
          }
          postTopic(this.$axios, params)
            .then((res) => {
              if (res.data.success) {
                this.$router.push(`/topic/${res.data.topic_id}`)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.create {
  background: #fff;
  &-header {
    padding: 10px;
    font-size: 14px;
    color: var(--color-gray);
    border-bottom: 1px solid var(--border-color);
  }
  &-body {
    padding: 10px;
  }
}
</style>
