# nuxt-cnode

基于服务端渲染框架 Nuxt.js 实现的[CNode社区](https://cnodejs.org/)

[访问地址](http://nikolausliu.top/cnode)

写这个项目的时候遇到的问题和解决方案都记录在源码的`docs`目录下了

这个项目用到的API是直接用的CNode官方提供的API,但是官方实际上只开放了一部分API，所以官方未开放部分的功能都没有实现。

项目的样式部分参考了[V2ex](https://www.v2ex.com/)这个站点，然后整站的字体会优先使用了我喜欢的CasCadia Code和Fira Code这种代码字体，如果你的设备上安装了这个字体的话可以看到效果。


- [x] 6个tab列表页
- [x] 帖子详情页
- [x] 个人中心页
- [x] 发布话题
- [x] 收藏话题
- [x] 编辑自己发布的话题
- [x] 发表评论及回复评论（@某人的交互上做了优化，还加了评论小尾巴）
- [x] 点赞评论
- [x] 登录（CNode只提供了从官方站点获取access_token登录的方式）
- [x] 退出登录


# 部署

部署使用了github actions，基本过程如下：

1. 如果某次代码改动需要部署，先给代码打tag并push到远程`git tag v0.x.x`,`git push origin v0.x.x`
2. github actions执行`main.yml`，执行一系列检出、安装依赖、lint、build操作之后，得到构建产物
3. 把需要部署的构建产物`tar`压缩成一个`release.tgz`包
4. 用`release.tgz`包发布一个release并上传到github的服务器，这一步完成后在github仓库里可以看到刚刚上传完成的release产物，这个产物是可以下载的
5. 下一步远程ssh连接到我的阿里云，`cd`进我们要部署的目录，然后下载上一步的`release.tgz`包，并解压
6. 安装依赖，然后`pm2 reload ecosystem.config.js`重启node服务

上面的步骤中，其实大部分的action都是用的第三方的action，然后还需要在github仓库中配置很多密钥，比如`secrets.ALIYUN_HOST`、`secrets.ALIYUN_PORT`、`secrets.ALIYUN_USERNAME`、`secrets.ALIYUN_PASSWORD`等这几个都是连接我的阿里云必须的参数，但是这些敏感信息肯定不能放在源码里暴露给别人，所以就在仓库的设置页面配置成密钥，这部分就不展开说了，往上搜一下很多文章。

其实上面的过程就算是完成自动化的部署流程了，此时可以通过阿里云的公网IP加我们项目的端口号来访问项目了，一开始我就是这么做的，后来优化了下，用nginx做了代理转发，大致说下吧。

1. 一开始，我的域名`nikolausliu.top`是直接域名解析到我的github pages博客`nikolausliu.github.io`的。
2. 后来我买了阿里云的ecs服务器，但一直没怎么用。慢慢地我开始在服务器上跑了一些node服务，但此时都是直接通过公网IP访问的，因为我的域名是直接解析到了我的博客地址的，相当于被占用了。
3. 服务器上挂的服务渐渐多起来以后我就想还是不要直接用IP访问这些服务了吧，所以想到用nginx
4. 首先要把域名解析到github pages的那几个记录干掉，改成解析到我的公网IP
5. 然后配置nginx根路径proxy_pass转发到我的github pages地址（这中间还申请了ssl证书来让域名支持https，其实光是这个就可以单独记录一篇博客，当时也没搞）
6. 其它的服务通过配置意义对应的location来完成

nginx配置都是常规的配置就不贴了。
