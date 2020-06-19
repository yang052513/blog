---
title: ES6与Javascrpit的对比
date: 2020-06-17 22:55:19
tags: ['javascript', 'es6', 'notes']
categories: 笔记
comments: false
---

> 在之前学 React 的过程中渐渐的从 js 写法转变为 es6 写法，不过都是学到什么用么。于是今天重新来学习一下 ES6 的新特性以及对比跟 javascript 的区别

<!-- more -->

## 简介

引用维基百科的定义

> ECMAScript is a scripting-language specification standardized by Ecma International. It was created to standardize JavaScript to help foster multiple independent implementations.

简单来说，ES6 就是在原 javascript 的基础上创建了新的语法和特性来让代码更易读和简介。

## Variables

**Javascript**
ES6 之前我们声明变量用 var, 但是 var 我们可以重复声明同一个变量。

比如

```js
var name = 'Yang'
var name = 'Jason'

for (var i = 0; i < 5; i++) {
  console.log(i)
  //0, 1, 2, 3, 4
}

console.log(i) //0, 1, 2, 3, 4 不是block scoping, 可能会有未知错误
```

**ES6**
ES6 中我们可以用`let`和`const`来声明变量

- let 和 const 都是 block scoping: 在`{}`中声明的 let 和 const 只能在`{}`中 access
- let 的变量可以重新定义
- const 的变量声明后不可以更改

```js
let name = 'Yang'
name = 'Nathan' //ok

const title = 'ES6 Notes'
title = 'Cant change const variable' //error: variable has already been declared

for (let i = 0; i < 5; i++) {
  console.log(i)
  //0, 1, 2, 3, 4
}

console.log(i) //error
```

## String Concatenation

**Javascript**
较早的 Javascript 中我们只需要用`+`就可以实现 string concatenation。

```js
var name = 'Yang'
var age = 23
console.log('My name is' + name + ' and my age is' + age)
```

**ES6**
ES6 中我们可以用 template literal。比`+`更方便。我们只需要用``来包括内容，用\${}来声明变量即可。

```js
const name = 'Yang'
const age = '23'
console.log(`My name is ${name} and my age is ${age}`)
```

## Object Deconstruction

**Javascript**
Old Javascript 我们用`.`来获取对象的变量。

```js
var profile = {
  name: 'Yang',
  age: 23,
  avatar: 'img/user.jpg',
}

console.log(profile.name, profile.age, profile.avatar)
```

**ES6**
ES6 中我们可以使用`{}`destruct 对象，然后可以直接引用变量名。

```js
const profile = {
  name: 'Yang',
  age: 23,
  avatar: 'img/user/jpg',
}

const { name, age, avatar } = profile
console.log(name, age, avatar)
```

## Arrow Functions

**Javascript**

```js
function greeting() {
  console.log('Hello javascript')
}

var greeting = function () {
  console.log('Hello javascript')
}
```

**ES6**

```js
const greeting = () => {
  console.log('Hello javascript')
}

//如果只有一个parameter 可以省略()
const sayHello = name => {
  console.log(`Hello ${name}`)
}

//return statement只有一行时可以省略{}
const sayHello = name => console.log(`Hello ${name}`)
```

## Default Parameters

**Javascript**

```js
function addOperation(numOne, numTwo) {
  //如果没有input将设置默认值为1
  var oneDefault = numOne || 1
  var twoDefault = numTwo || 1

  return oneDefault + twoDefault
}
```

**ES6**

```js
const addOperation = (numOne = 1, numTwo = 1) => {
  return numOne + numTwo
}

addOperation(13) //14
```

## Array Functions

ES6 中引入了 forEach, map 和 filter。forEach 对当前数组进行操作。map 和 filter 拷贝原数组在其基础上进行更改

**ES6**

```js
const animeList = ['fate zero', 'fate stay night', 'haikyuu', 'clannad']

//index返回数组内每个元素的索引值
animeList.forEach((anime, index) => {
  console.log(anime, index)
})

//map创建一个新的数组
const myAnimeList = animeList.map(myAnime => return myAnime.includes('fate')
)

//假设每个动画都有自己的评分
const myFavouriteList = animeList.filter(item => item.rank >= 9.3)
```

## Constructor Functions and Classes

**ES6**

```js
class Anime {
    constructor(name, year, rank) {
        this.name = name
        this.year = year
        this.rank = rank
    }
    const animeInfo = () => {
        console.log(`The anime is ${this.name}, and made in ${this.year}。`)
    }
}

const fate = new Anime('Fate Stay Night', 2015, 9.5)

console.log(fate.animeInfo())

//继承 extends
class AnimeYuri extends Anime {
    constructor(name, year, rank, isForChild) {
        //从父级anime中继承name props
        super(name, year, rank)
        this.isForChild = isForChild
    }
}

const yuriyuri = new AnimeYuri('Yuriyuri', 2017, 9.9, true)
```

## Promise

### Using Promise: fetch()

**ES6**

```js
const url = 'https://theapiurl/'

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
```
