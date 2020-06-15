---
title: Typescript
date: 2020-06-12 12:42:27
tags: ['react', 'tsx', 'typescript', 'front-end', 'notes']
categories: 笔记
comments: false
---

> Typescript 与 React

<!-- more -->

## Function Components

在 typescript 中写 function components 以及传递 props。相比在 jsx 中，typescript 可以声明一个接口 Props 然后从接口中传递父级的属性

如下创建一个 Card 组件

```ts
//Props可以传递object
interface Attribute {
  hp: number
  mp: number
  attack: number
  info: string
}

//父级属性
interface Props {
  name: string
  isRare: boolean
  toggle: (method: string) => string
  attribute: Attributes
}

//用<Props>来声明Props
export const Card: React.FC<Props> = ({ name, isRare, toggle, attribute }) => {
  return (
    <div>
      <h3>Card name is {name}</h3>
      {isRare ? <p>This card is rare</p> : null}
    </div>
  )
}
```

## useState Hooks

```ts
//声明的state可以是number也可以是null
const [count, setCount] = useState<number | null | undefined>(5)

//在useState中传递props
const [count, setCount] = useState<{ name: string }>(name)
```
