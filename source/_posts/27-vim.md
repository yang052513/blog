---
title: Vim 解放你的双手
date: 2020-07-11 12:28:05
tags: ['editor', 'notes']
categories: Notes
cover: 'https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/vim-banner.png?alt=media&token=9a867eb9-e03f-4ee3-a6c8-bef084fe28b8'
---

:q 退出
:wq with save
:q! quit w/o save

i: insert mode
esc: command mode
dd: 删除当前行
u: 撤销操作

G: 到最低行
gg: 到最顶行

{ :上一个代码块
} ：下一个代码块

10 j 向下 10 行
5 } 向下 5 个代码块

yy 复制当前行
p 粘贴到当前行下面

V 选择模式

o 在当前行下方插入新的一行 进入编辑模式
O 在当前行上方插入新的一行 进入编辑模式

w 向前一个字符
b 向后一个字符

:30 到第 30 行

0 到当前行的起始
w 到当前行第一个字符串位置

0w 跳转到当前行第一个字母位置

\$ 到当前行末端

t！ 跳转到当前行!前一个位置
f! 跳转到当前行!的位置

cW 删掉当前字符

D 删除当前行当前位置右侧所有字符

- 查找
