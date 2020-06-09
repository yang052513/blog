---
title: JavaScript 笔记
date: 2020-06-08 22:15:48
tags: ['笔记', 'JavaScript']
comments: true
categories: '笔记'
---

> JavaScript 数组，对象，类，函数的常用用法以及备忘录

<!-- more -->

## Variables & Strings

### Template Literals

```js
let weight = 74
let msg = `Your body weight is ${weight * 2.2} pounds`
console.log(msg)
```

Output

> Your body weight is 162.8 pounds

## Function

### Function Closure

```js
function countingdown() {
  let initNum = 0
  return function decrement() {
    initNum -= 1
  }
  decrement()
}

const countingDown = countingdown()

console.log(countingDown())
console.log(countingDown())
console.log(countingDown())
```

### Default Parameter

```js
function convertTemperature(celsius, decimalPlaces = 1) {
  const fahrenheit = celsius * 1.8 + 32
  return Number(fahrenheit.toFixed(decimalPlaces))
}

console.log(convertTemperature(21, 0))
```

### Arrow Function

#### Object

```js
const setName = (id, name) => `id: ${id} name: ${name}`
console.log(setName(1, 'Yang'))
```

#### Map

```js
const prices = products.map((item) => item.price)
console.log(prices) //[array of items price]
```

#### Fecth

```js
//fetch data from API
function getData(baseUrl) {
  return function (route) {
    return function (callback) {
      fetch(`${baseUrl}${route}`)
        .then((response) => response.json)
        .then((data) => callback(data))
    }
  }
}

//store API data getSocialMediaData
const getSocialMediaData = getData('https://jsonplaceholder.typicode.com')

//post route
const getSocialMediaPosts = getSocialMediaData('/posts')
//comment route
const getSocialMediaComments = getSocialMediaData('/comments')

//List all the post title
getSocialMediaPosts((posts) => {
  posts.forEach((post) => console.log(post.title))
})
```

## Objects & Maps

### Get and Modify Object Data

```js
const color = 'black'
const hexCode = '000'

//squat notation [] dynamically change object pair values
const colors = {
  [color]: hexCode,
}

delete colors['blue']
console.log(colors)
```

### Object Destructing

```js
const user = {
  name: 'Yang',
  username: 'yang052513',
  email: 'liyang0525@hotmail.com',
  details: {
    title: 'Web developer',
  },
  getBio() {
    console.log(`User ${this.name} is a ${this.details.title}`)
  },

  askToFriend() {
    //嵌套函数用arrow function解决this binding问题
    setTimeout(() => {
      console.log(`Would you like to friend ${this.name}`)
    }, 2000)
  },
}

user.getBio()
```

### Map

```js
const user1 = 'Yang'
const key1 = '1'

//创建一个新的map并插入用户1的key和value
const userMap = new Map([[key1, user1]])

//插入key为2 value为nathan到userMap
userMap.set('2', 'Nathan')

//循环userMap并打印每个数据
const display = (values) => document.writeln(values + '<br>')
userMap.forEach(display)

//取得用户key为1的value
const key = userMap.get('1')
console.log(key)

//userMap大小
console.log(userMap.size)
```

## Arrays & Sets

### Element Existence .some() & .every()

```js
const array = [
  {
    name: 'Attack on titan',
    rating: 9.8,
    episode: 24,
  },
  {
    name: 'Fate stay night',
    rating: 4.8,
    episode: 13,
  },
  {
    name: 'Haikyuu',
    rating: 10.0,
    episode: 24,
  },
]

//测试是否至少有一个元素的rating小于5
const ratingTest = (item) => item.rating < 5
const episodeTest = (item) => item.episode > 12
console.log(`至少有一部动画评分小于5分: ${array.some(ratingTest)}`)
console.log(`每部动画集数大于12: ${array.every(episodeTest)}`)
```

### Perform Actions on All Elements: .map() & forEach() Method

```js
const animations = [
  { name: 'attack on titan', episode: 12, rating: 6.8 },
  { name: 'fate stay night', episode: 13, rating: 7.2 },
  { name: 'haikyuu', episode: 12, rating: 4.5 },
  { name: 'clannad', episode: 24, rating: 3.2 },
  { name: 'Bokuno name', episode: 8, rating: 9.8 },
]

//重构一个新的array newAnimations
const newAnimations = animations.map((animes) =>
  //对animations里的每一个对象执行一下
  //如果rating大于8 在原object的基础上merge isHighRank
  //其他保持不变
  animes.rating > 8 ? { ...animes, isHighRank: true } : animes
)

//循环newAnimations里的每一个对象
newAnimations.forEach((animes) => {
  animes.isHighRank
    ? console.log(`${animes.name} is recommended by other users`)
    : null
})
console.log(newAnimations)
```

### Subsets of Arrays .filter() & .find()

`.filter`: 返回匹配条件的新数组

```js
const animations = [
  { name: 'attack on titan', episode: 12, rating: 6.8 },
  { name: 'fate stay night', episode: 13, rating: 7.2 },
  { name: 'haikyuu', episode: 12, rating: 4.5 },
  { name: 'aksa', episode: 24, rating: 3.2 },
  { name: 'air', episode: 8, rating: 9.8 },
]

//如果没有匹配结果 返回空数组
const animationA = animations.filter(
  (animes) => animes.name.toLowerCase().startsWith('a') && animes.rating > 7
)
console.log(animationA)
```

`.find()`: 返回匹配条件的**第一个元素/对象**

```js
const animations = [
  { name: 'haikyuu to top', episode: 12, rating: 6.8 },
  { name: 'haikyuu2', episode: 13, rating: 9.2 },
  { name: 'haikyuu', episode: 12, rating: 4.5 },
]

const animationSearch = animations.find(
  (anime) => anime.name.toLowerCase().includes('haikyuu') && anime.rating > 9
)

console.log(animationSearch)
```

### Transform Arrays .reduce()

#### Accumulator Array

```js
const cart = [
  { item: 'Squat Stand 2.0', price: 460.89 },
  { item: 'Falt Utility Bench', price: 230 },
  { item: 'Ohio Power Bar', price: 385.23 },
]

//cart数组中的每个值累加
//0 as initialize value
const cartTotal = cart.reduce((subtotal, cartItem) => {
  return subtotal + cartItem.price
}, 0)
console.log(cartTotal)
```

#### Double Array Values

```js
const numbers = [1, 2, 3, 4, 5, 6]

const doubleNum = numbers.reduce((acc, num) => {
  acc.push(num * 2)
  return acc
}, [])

const greaterThree = numbers.reduce((acc, num) => {
  if (num > 3) {
    acc.push(num)
  }
  return acc
}, 0)

//const doubleNum = numbers.map(num => num * 2)
//const greaterThree = numbers.filter(num => num > 3)

console.log(doubleNum)
console.log(greaterThree)
```

### Modify Arry with Spread Operator ...

Avoid Array Mutation

```js
const aprilAnimation = ['Haikyuu', 'Attack on Tatin']
const sepAnimation = ['Dango', 'Physico Pass']
//clone aprilAnimation into allAnimation
const allAnimation = [...aprilAnimation, ...sepAnimation]
//now use array method will not change aprilAnimation array
allAnimation.push('Clannad')
console.log(allAnimation)
```

### Get Unique Sets of Data new Set()

```js
const animeVote = [
  'Attack on titan',
  'Fate Stay Night',
  'Attack on titan',
  'Hero',
]

//先调用Set method重组新的unqie数组 然后保存到新的数组
const uniqueAnimeVote = [...new Set(animeVote)]
console.log(uniqueAnimeVote)
```

## Classes

### Constructor Function

```js
function Student(id, name, courses = []) {
  this.id = id
  this.name = name
  this.courses = courses
}

//Student method
Student.prototype.addCourse = function (course) {
  //merge the current student couse array with new courses
  this.courses = [...this.courses, course]
}

const s1 = new Student(3, 'Yang', ['Chinese', 'English', 'Math', 'Computer'])

s1.addCourse('Powerlifting')
console.log(s1.courses)
```

### Classes

```js
class Student {
  constructor(id, name, subjects = []) {
    this.id = id
    this.name = name
    this.subjects = subjects
  }

  getStdName() {
    return `Student: ${this.name}`
  }

  setStdName(name) {
    this.name = name
  }
}

const s1 = new Student(1, 'Yang', 'Math')
console.log(s1.getStdName())
```

<br>

### Inheritance

```js
class Product {
  constructor(name, price, discountable) {
    this.name = name
    this.price = price
    this.discountable = discountable
  }

  isDiscountable() {
    return this.discountable
  }
}

class SaleProduct extends Product {
  constructor(name, price, discountable, percentOff) {
    super(name, price, discountable)
    this.percentOff = percentOff
  }

  getSalePrice() {
    if (super.isDiscountable()) {
      return this.price * ((100 - this.percentOff) / 100)
    } else {
      return `${this.name} is not eligible for a discount`
    }
  }
}

const saleProduct1 = new SaleProduct('Coffee Maker', 99, false, 20)
console.log(saleProduct1.getSalePrice())
```

### Binding method to Class

```js
const isAuth = true
const user = {
  favorites: [],
}

class Product {
  constructor(name, price) {
    this.name = name
    this.price = price
    //Bind favoriteProduct method to Product class
    this.favoriteProduct = this.favoriteProduct.bind(this)
  }

  handleFavoriteProduct = () => {
    if (isAuth) {
      setTimeout(this.favoriteProduct, 1000)
    } else {
      console.log('You must be signed in to favorite products!')
    }
  }

  favoriteProduct = () => {
    user.favorites.push(this.name)
    console.log(`${this.name} favorited!`)
  }
}

const product1 = new Product('Coaster', 89.99)
product1.handleFavoriteProduct()
```
