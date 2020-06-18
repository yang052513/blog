---
title: Typescript 让你的Javascript更严谨
date: 2020-06-12 12:42:27
tags: ['react', 'tsx', 'typescript', 'front-end', 'notes']
categories: 笔记
comments: false
---

> 学习 Angular 的时候要用 typescritp 来写。于是学习 typescript 成了我的 angular 的前置课程。本文主要是记录 typescript 的一些特性和语法，以及介绍一些在 react 中写 typescript(tsx)的基础。

<!-- more -->

## 简介 Introduction

> Typescript 是 javascript 的 superset，也就是说你之前学到的 javascript 或者 ES6 的写法都可以写在 typescript 中。但是不同的是我们可以给变量添加类型(type), 比如 number 可以是 interger 或者 double, 又或者是 boolean 的类型。我们甚至可以给函数添加返回的类型等等。我们在之后会一一介绍。总体来说，typescript 可以让我们之前写的 javascript 更加严谨且代码更容易理解。

## 安装 Environment Setup

安装 typescript 之前我们确保已经安装了 node.js。如果没有，可以到 nodejs.org 下载 LTS 版本(LTS 即 long term support 也就是稳定版)。

如果你不确定是否已经安装过 node.js, 可以在 cmd 中输入`node -v`。安装过的话会显示当前 node 的版本号。

之后我们便可以在 cmd 中输入`npm install -g typescript`。

## 变量定义 Variable Declartions

这里跟 ES6 一样。我们简单介绍下两种变量定义的方法 let 和 const

**let**

- 首先，let 不需要初始化(initialize)数值。比如我们可以声明一个 myAge 变量如：let myAge。
- 其次，let 可以重新声明变量值。比如我们声明一个变量 let myAge = 5。之后我们可以 myAge = 10。

**const**

- const 必须初始化一个数值，不能留空。比如`cont myName`这样就会报错。
- const 声明的变量值，之后**不可以更改**。假设我们创建了一个变量`const myName = 'Yang'`。之后就不可以更改 myName 的值了。
- 大多数情况下，const 可能是我们会用到最多的声明方式。我们也尽可能选择 const 以避免 let 重复声明(re-assign)可能会带来的未知错误。比如函数，常量我们都可以用 const 来声明。

## 变量类型 Variable Types

在给变量定义类型后，我们重新声明变量的值必须匹配它的类型。比如 `let example:string`。我们之后只能定义 example 为 string。这样也可以让我们的代码更严谨。这部分我们主要介绍 boolean, number, string, null, undefined, array, any 类型。

### Boolean

boolean 即 true 或 false
`let isRare:boolean = false`

### Number

number 类型可以是 int 或者是 double

```ts
let myAge: number = 23
let monitorPrice: number = 399.99
```

### String

```ts
const title: string = 'Typescript 2020'
```

### Null Undefined

null 和 undefined 都属于附属类型（sub-types)。即我们可以给之前的任何变量声明 null 和 undefined。

```ts
let username: null = null
let userprofile: undefined = undefined
```

但我们很多情况下是预期得到的变量类型是 string 或者 number，但又可能返回 null 和 undefined。就可以用以下方式

```ts
const username: string = null
const isUser: boolean = undefined
```

### Array

定义数组的类型也很简单。在类型后加入`[]`

```ts
let cartList: string[] = ['apple', 'orange', 'milk']
let randomNumList: number[] = [13, 22, 3, 344]
```

或者用 Generics 的写法来定义

```ts
let cartList: Array<string> = ['apple', 'orange', 'milk']
let randomNumList: Array<number> = [13, 22, 3, 344]
```

### Tuples

假设我们想在数组中混合变量类型，那我们可以用 tuple 来实现

```ts
let myMixList: [string, number, boolean] = ['name', 23, false]
```

需要注意的是 tuple 数组内的元素是固定的。也就说一旦我们声明完变量类型，我们不可以添加其他元素到 tuple 数组。

```ts
let myMixList: [string, number, boolean] = ['name', 'number', false] //error
let myMixList: [string, number, boolean] = ['name', 23, 23] //error
let myMixList: [string, number, boolean] = [false, 23, false] //error

myMixList[0] = 23 //erro: 不能更改变量类型
myMixList[1].toLowerCase() //error: 数组索引值1处为数字 不能用string method
```

### Any

有些情况下我们不确定我们变量的类型。比如我们想 fecth 第三方 API 获取数据的时候，有的数据可能会返回 null 或者 undefined，或者其他类型我们不确定。这时候我们可以用 any。

```ts
let unknowType: any = 'Can be a string'
unknowType = 23
unknowType = false
```

### Void

我们一般用于返回函数时定义的类型。

```ts
const modalMsg = (): void => {
  console.log('This function does not return anything')
}

const plusOperation = (numOne, numTwo): void => {
  return numOne + numTwop //error:我们定义了void类型，即函数不返回任务值。
}
```

### Object

`object`即排除所有 primitive 的类型(number, string, boolean, null, undefined)

```ts
const userProfile: object = { name: 'Yang', age: 23 }
const errorProfile: object = 30 //error
```

## 函数 Functions

## 接口 Interface

## 类 Class

## 访问控制修饰符 Access Modifiers

## React 与 TSX

### Function Components

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

#### useState Hooks

```ts
//声明的state可以是number也可以是null
const [count, setCount] = useState<number | null | undefined>(5)

//在useState中传递props
const [count, setCount] = useState<{ name: string }>(name)
```
