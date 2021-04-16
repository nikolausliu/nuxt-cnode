import Vue from 'vue'
import filters from '@/utils/filters'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
