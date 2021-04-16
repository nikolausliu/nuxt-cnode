export const timeago = (time) => {
  const now = Date.parse(new Date()) / 1000
  const date = new Date(time)
  const limit = now - date.getTime() / 1000
  let content = ''
  const _minute = 60
  const _hour = _minute * 60
  const _day = _hour * 24
  const _year = _day * 365
  if (limit < _minute) {
    content = `${limit}秒前`
  } else if (limit >= _minute && limit < _hour) {
    content = `${Math.floor(limit / 60)}分钟前`
  } else if (limit >= _hour && limit < _day) {
    content = `${Math.floor(limit / 3600)}小时前`
  } else if (limit >= _day && limit < _year) {
    content = `${Math.floor(limit / 86400)}天前`
  } else {
    content = '很久前'
  }
  return content
}
