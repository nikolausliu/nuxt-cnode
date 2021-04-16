全局的样式文件可以通过`nuxt.config.js`的`css`选项指定

```javascript
export default {
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/styles/reset.less'],
}
```

如果要用到预处理器，不需要额外的配置，但是需要安装相关的依赖，这里以`less`为例：

```sh
npm install -D less less-loader@7.3.0
```

这里注意`less-loader`在安装的时候使用了指定版本号，这是因为`less-loader`8.0.0 版本开始会有兼容问题，报下面的错，而 8.0.0 的上一个版本就是 7.3.0

![less-loader-error](./screenshots/less-loader-error.png)
