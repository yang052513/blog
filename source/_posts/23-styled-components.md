---
title: Styled Components 在JS里写CSS?
date: 2020-07-04 23:53:29
tags: ['notes', 'react', 'styled-components', 'css']
categories: Notes
cover: 'https://miro.medium.com/max/2800/1*6E-EG6HczqSSsEQFgFlG-A.png'
---

> 在做 UI package 的时候发现`Styled Components`好用啊，可以绑定 props 基本 SCSS 支持的方法都支持。本来只是想着了解一下的目的。结果发现做组件打包还挺好用的。可是如何跨组件分享样式呢？SCSS 和 Less 中都有 mixin 方法可以直接调用 method，但 styled-components 是要先声明渲染的元素类型然后给样式化。styled-component 解决了组件间的分享样式但总体的重复利用度还是问题。再比如一些比较复杂的样式化也会让 debug 比较困难。

## 安装 Styled Componets 库

```shell
npm install styled-components --save
```

如果项目用的是 typescript

```shell
npm install @types/styled-components --save
```

## 样式化一个组件

styled.div 即我们要渲染一个`div`元素的组件，在` `` `声明 CSS 样式。

```jsx
import styled from 'styled-components'

export const App = () => {
  const Container = styled.div`
    background-color: blue;
    width: 300px;
    border: 1px solid gray;
  `
  return <Container>This is my div</Container>
}
```

## 用 Props 更改样式化

我们也可以用在样式化只使用 props。比如下面的代码如果`App`组件没有`textColor` props, 那就用灰色字体色，反之用 props 给的颜色。

```jsx
import React from 'react'
import styled from 'styled-components'

interface Props {
  textColor?: string;
}

export const App: React.FC<Props> = ({ textColor }) => {
  const Container = styled.div`
    width: 300px;
    background-color: blue;
    color: ${textColor ? textColor : 'gray'};
  `
  return (
    <Container>
      <p>This is my div</p>
    </Container>
  )
}
```

## 继承组件样式化

我们也可以在原有组件的基础上添加其他的样式。跟之前在`styled`后面生面元素不同，我们现在只需要在`()`内加入想要继承样式的组件就可以。比如下面`BorderCard`继承所有`Card`的样式但是添加了一个新的`border`样式。

```jsx
import React from 'react'
import styled from 'styled-components'

export const App: React.FC = () => {
  const Card = styled.div`
    background-color: blue;
    width: 300px;
  `

  const BorderCard = styled(Card)`
    border: 1px solid red;
  `

  return (
    <div>
      <Card></Card>
      <BorderCard></BorderCard>
    </div>
  )
}
```

## 伪元素

跟 Sass 语法相似，我们用`&`来代指主要元素

```jsx
import React from 'react'
import styled from 'styled-components'

export const App: React.FC = () => {
  const Card = styled.div`
    background-color: blue;
    width: 300px;
    &:hover {
      background-color: red;
    }
  `

  return <Card></Card>
}
```

## 动画 keyframes

用`keyframes`之前我们要先导入`keyframes`库

```jsx
import React from 'react'
import styled, { keyframes } from 'styled-components'

const bounceLoading = keyframes`
  to {
    opacity: 0.3;
    transform: translate3d(0, -1.5rem, 0);
  }
  `

const Dot = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 20px;
  background: rgb(202, 57, 57);
  border-radius: 50%;
  animation: 0.8s ${bounceLoading} infinite alternate;
`
export const App: React.FC = () => {
  return <Dot></Dot>
}
```
