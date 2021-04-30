# 部署到阿里云CMS服务器

部署那一步构建出错很多次，主要是下面几个报错导致的：

## Unable to establish SSL connection

github build runner在ssh连接阿里云服务器后，用`wget https://github.com/nikolausliu/nuxt-cnode/releases/latest/download/release.tgz -O release.tgz`下载github资源，但是github访问一直不稳定，所以就经常失败。这个是网络问题，平时访问github就经常崩，也没找到什么好的解决方法。

## nvm: command not found 和 npm: command not found

阿里云上的node我是用nvm装的，之前每次连接的时候都要重新`nvm use`一下，运行以下命令来固定下node版本，后面就不用每次都`nvm use`了

```sh
nvm alias default v12.6.0
nvm use v12.6.0
```

然后就是环境变量的问题，因为nvm安装node的时候没有把node放在`/usr/local/bin`下，我们把`node`和`npm`软链过去：

```sh
ln -s "$NVM_DIR/versions/node/v12.6.0/bin/node" "/usr/local/bin/node"
ln -s "$NVM_DIR/versions/node/v12.6.0/bin/npm" "/usr/local/bin/npm"
```

做完这两步处理，actions终于不报错了。