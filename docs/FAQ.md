# 在模板和 css 里引入图片怎么写？

```
nuxt-cnode
├─ assets
│  └─ imgs
│     └─ logo.png
└─ static
   └─ imgs
      └─ logo.png
```

如果有上面的目录结构，则对于`assets`

```vue
<template>
  <img src="~/assets/imgs/logo.png" />
  <!-- 对于动态的图片需要用require -->
  <img :src="require(`~/assets/imgs/${image}.png`)" />
</template>

<script>
export default {
  data() {
    return {
      image: 'logo',
    }
  },
}
</script>

<style>
img {
  background: url('~assets/imgs/logo.png');
}
</style>
```

对于`static`:

```vue
<template>
  <img src="/imgs/logo.png" />
</template>

<style>
img {
  background: url('/imgs/logo.png');
}
</style>
```
