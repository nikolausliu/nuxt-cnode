# 数据持久化

[vuex-persistedstate官网](https://www.npmjs.com/package/vuex-persistedstate)给出了nuxt中vuex持久化的解决方案，老夫写代码就是复制粘贴一把梭

```sh
npm install -S vuex-persistedstate js-cookie cookie
```

**plugins/persistedState.js**

```javascript
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req }) => {
  createPersistedState({
    key: 'nuxt-cnode',
    storage: {
      getItem: (key) => {
        if (process.server) {
          const parsedCookies = cookie.parse(req.headers.cookie)
          return parsedCookies[key]
        } else {
          return Cookies.get(key)
        }
      },
      setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: false }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
```

**nuxt.config.js**

```javascript
  export default {
    plugins: [
+     '@/plugins/persistedState',
    ],
  }
```