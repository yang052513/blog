---
title: Git Notes
date: 2020-05-25 20:10:15
tags: ['笔记', 'git']
comments: false
categories: '笔记'
---

> 平时总结的一些 git command 以及常用的命令

<!-- more -->

# Command

## 配置

### 设置用户名到 Github Commit

没有设置 git user name 之前，所有的 commit 的都会显示为提交 commit 用户的 admin 名称。要想显示提交记录者的 github 信息，需要在用 git 前添加以下两条信息

`git config --global user.name`
`git config --global user.email`

> `global`将会用于所有 git。输入后会弹出 github 登录窗口。MacOS 会在 terminal 里输入用户名和密码

## 分支

### 常用的一些指令

```
git branch 显示repo中所有的branch
git branch friend_feature 创建一个名为friend_feature的分支
git swicth feature_mainfeature 切换当前分支到feature_mainfeature
git merge feature_mainfeature 将feature_mainfeature与当前分支merge
git branch -d friend_feature 删除名为friend_feature的分支
git branch -m social_feature 更改当前分支名为social_feature
```

## Commit

### 流程

Gitflow Workflow 一般为常用的开发方式。即每个功能有自己的分支，分支完成后先 merge 到 dev 分支上。如果 dev 分支没有任何问题就可以 merge 到 master 上。因为 master 分支是要确保为最稳定可用的代码

```
递交内容到feature_home分支
git add .
git commit -m"home component done"
git push origin feature_home

切换到dev分支 并merge feature_home到dev分支上
git switch dev
git merge feature_home
git push origin dev

之后创建一个pull request就可以了
```
