---
title: Git学习的一些记录
date: 2020-05-25 20:10:15
tags: ["笔记", "git"]
comments: true
categories: "笔记"
---

> 平时总结的一些git comman以及一些误区

# Command

## 配置

### 设置用户名到Github Commit

没有设置git user name之前，所有的commit的都会显示为提交commit用户的admin名称。要想显示提交记录者的github信息，需要在用git前添加以下两条信息

`git config --global user.name`
`git config --global user.email`

> `global`将会用于所有git。输入后会弹出github登录窗口。MacOS会在terminal里输入用户名和密码

<!-- more -->

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

Gitflow Workflow一般为常用的开发方式。即每个功能有自己的分支，分支完成后先merge到dev分支上。如果dev分支没有任何问题就可以merge到master上。因为master分支是要确保为最稳定可用的代码

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