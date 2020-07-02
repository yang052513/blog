---
title: How to use Fiddler to Get and Modify Request for an App
date: 2020-07-01 23:57:13
tags: ['python', 'web crawler', 'fiddler']
categories: Article
cover: 'https://pic3.zhimg.com/v2-f7dd822655d8a76787389148658e4c41_1440w.jpg'
---

> a man-in-the-middle attack (MITM), also known as a hijack attack is an attack where the attacker secretly relays and possibly alters the communications between two parties who believe that they are directly communicating with each other.

举个例子。上课你写了一个纸条是对女神道歉，你把纸条先交给了中间的 B 同学，这时候 B 同学把你纸条的内容改为"辣鸡还不给我道歉"，然后传给了前面的女神同学。这时候女神同学相当暴躁啊，就在纸条上写了"老王 分 懂?"。然后我们可爱的 B 同学又把内容改为"我错啦对不起"然后传给了你。整个过程中你和你的女神的对话内容都被 B 完全控制，而 B 同学在这里就是伪装成中间人进行你们对话的修改来攻击。

本文主要讲解如何使用 Fiddler 和 Python 来利用中间人攻击原理来劫持抖音某用户的所有作品。

## 配置

### 安装 Fiddler

进入 [Fiddler 官网](https://www.telerik.com/download/fiddler)根据你的系统下载相应的版本。
