export const obj2query = (obj) => {
  let query = ''
  if (Object.prototype.toString.call(obj) !== '[object Object]') return query
  query = Object.keys(obj)
    .map((key) => {
      return `${key}=${obj[key]}`
    })
    .join('&')
  return query ? `?${query}` : query
}

export const underscoreCase2CamelCase = (str) => {
  if (typeof str !== 'string') return ''
  return str.replace(/_(\w)/g, function (match, letter) {
    return letter.toUpperCase()
  })
}

export const obj2CamelCase = (obj) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return obj
  const res = {}
  Object.keys(obj).forEach((key) => {
    res[underscoreCase2CamelCase(key)] = obj[key]
  })
  return res
}
