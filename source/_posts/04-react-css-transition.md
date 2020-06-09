---
title: 利用React Transition Group实现平滑的动画
date: 2020-06-02 20:19:38
tags: ['笔记', 'react', 'react-router']
comments: false
categories: '笔记'
---

> 通过利用 React Router 我们可以实现页面的跳转和切换。但默认 react router 的效果很生硬，我们可以通过利用 React Transition Group 来实现路由切换的平滑动画

<!-- more -->

# 配置

## 安装

使用 Transition 之前我们需要安装 React Transition Group

npm 下安装
`npm install react-transition-group --save`

yarn 下安装
`yarn add react-transition-group`

## 导入

在组件中导入`react-transition-group`

`import {TransitionGroup, CSSTransition} from 'react-transition-group'`

# 路由

假设我们已经建立了一个 setting 里的路由。现在我们可以通过不同的链接在 setting 组件中切换来渲染不同的组件，比如主题，语言，更新日志组件的切换。

```js
<Switch location={location}>
  <Route exact path="/setting/profile">
    <Profile />
  </Route>
  <Route path="/setting/theme">
    <Apparence />
  </Route>
  <Route path="/setting/language">
    <Language />
  </Route>
  <Route path="/setting/about">
    <About />
  </Route>
  <Route path="/setting/changelog">
    <ChangeLog />
  </Route>
</Switch>
```

然后我们添加 TransitionGroup 和 CSSTransition 到 Switch 组件的外层

```js
<TransitionGroup>
  <CSSTransition
    key={location.key}
    timeout={{ enter: 1000, exit: 1000 }}
    classNames="fade"
  ></CSSTransition>
</TransitionGroup>
```

React 每一个组件都应该有自己独立的 key，我们可以用 router 的 location 来添加到 CSSTransition 做 key
`timeout`用来设置我们动画的时长。`classNames`用来作为前缀在 css 中写每个状态的动画。比如我们在上面添加了`fade`，我们在 css 中就可以写`fade-enter`, `fade-enter-active`, `fade-exit`, `fade-exit-active`来根据 state 的状态管理动画。以下是一个 slide 加透明度时长 1s 的动画。

```css
//在动画开始前，我们设置组件的透明度为0并向左偏移50像素
.fade-enter {
  opacity: 0;
  transform: translateX(-50px);
}

//当被active的时候，我们将要跳转的router透明度设置为1并为正常位置
.fade-enter-active {
  opacity: 1;
  transform: translateX(0px);
  transition: all 1s;
}

//退出动画起始设置为默认
.fade-exit {
  opacity: 1;
  transform: translateX(0px);
}

//退出动画开始 向右偏移并透明度变为0
.fade-exit-active {
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s;
}
```
