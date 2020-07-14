---
title: 用Hexo开启你的博客写作之旅
date: 2020-07-06 01:01:59
tags: ['hexo', 'articles']
categories: Articles
cover: 'https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/1_aOv6h3h_v9PQWa03zGACnw.png?alt=media&token=bf892997-8e6f-4ccd-a4b3-652c79b90f0d'
---

> 引用官方的话，Hexo 定义为`快速、简洁且高效的博客框架`, 让用户更注重在写作上。本文介绍如何快速搭建一个 Hexo 的静态博客以及主题推荐设置。

## 安装 Hexo CLI

在终端中输入以下指令全局安装`hexo CLI`。安装成功后可以输入`hexo -v`来看版本号

```shell
npm install hexo-cli -g
```

## 创建博客项目

在想要保存项目的目录文件夹内输入`hexo init`来创建项目。

```shell
cd myfolder
hexo init myblog
```

这样我们就成功创建了 myblog 的博客项目。然后运行下面的命令就可以在端口 4000 访问了。

```shell
cd myblog
npm install
hexo server
```

## 开始第一篇写作

在项目目录内，我们只需要在终端输入`hexo new post postname`即可创建一个新的 post。语法为 markdown。

## 主题设置

我的博客是用的[hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly), 之前也是换过各种主题比如一开始的 Next, matery, fluid, melody 等。还要看个人喜欢。

主题设置的方式都是一样的，假设我们现在想更换默认主题为`hexo-theme-butterfly`。在我们博客项目的目录下输入以下指令

```shell
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

然后在目录内找到`_config.yml`配置文件，更改`theme`处为`theme: butterfly`.

## 部署

静态网站的部署我们选择 Netlify,绑定 Github Repo 每次更新 master 后自动 deploy。

在 Netlify 的主页面内，选择`New site from Git`然后选择`Github`.（当然根据你代码托管的站点选择，Netifly 支持 GitLab 和 Bitbucket).

之后就选择我们的 repo，如果 repo 是 private 可见，我们可以在 Netlify 设置中选择 Github 认证即可全部访问。

`master`即我们选择部署的分支，Build command 为 hexo genrate, hexo 会在 public 文件夹生成静态文件用来部署。

然后`Deploy site`就成功了~

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-13%20225116.png?alt=media&token=53541199-eed1-4263-8574-4a2a183d23ac" width="400px" height="auto"/>

部署成功后，我们后续写作只需要执行下面的命令 Netlify 就会自动帮我们更新部署了。

```shell
cd myblog
hexo clean
hexo generate
git push origin master
```
