import { timeago, dateTimeFormat } from '@/utils/time'
import { tabs } from '@/constant'

const tag = (t) => {
  const target = tabs.find((item) => {
    return item.tab === t
  })
  return (target && target.title) || ''
}

export default {
  timeago,
  dateTimeFormat,
  tag,
}
