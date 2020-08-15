---
title: Swift 5 原生IOS开发
date: 2020-08-12 23:28:50
tags: ['flutter', 'mobile', 'note']
categories: Notes
cover: 'https://miro.medium.com/max/1100/1*S4__g3knEbuuE6qHyWIbNQ.png'
---

# Variables 变量

## Constants and Variables 常量与变量

用`var`来代指变量类型。`let`来表示常量类型

```swift
var userName = 'Yang Li'
let MAX_HP = 200
```

## Type Annotations 注释类型

对变量或常量添加注释类型

```swift
var userName: String
let MAX_HP, MAX_MP: Double
var isToggle: Bool
```

# Basic Operators 运算符

## Assignment Operator 赋值运算符

Swift 中赋值运算符可以用来赋值，更新数值，判断左右两边是否相等。

比如下面的例子中，赋予 userName 的值为`yang052513`且 userPassword 为`1234qwer`

```swift
let (userName, userPassword) = ('yang052513', '1234qwer')
```

但 Swift 中赋值运算符**不返回任何数值**, 也就是说不能用`=`来做判断条件。

## Arithmetic Operators 算术运算符

### Unary Operator 一元运算符

用`+`或者`-`作为前缀运算符

```swift
let POSITIVE_ONE = 1
let NEGATIVE_ONE = -POSITIVE_ONE // -(1) -> -1
```

```swift
let NAGATIVE_ONE = -1
let COPY = +NEGATIVE_ONE // +(-1) -> -1
```

## Compound Assignment Operators 复合赋值运算

```swift
var numOfLikes = 0
numOfLikes += 1
```

## Comparsion Operators 比较运算符

```swift
a == b
a != b
a > b
a < b
a >= b
a <= b
```

## Ternary Conditional Operator 条件运算符

```swift
let hasBuff = false
let BASE_EQUIP = 100
let MAX_HP = BASE_EQUIP + (hasBuff ? 20 : 0) //100
```

下面 themeOption 是一个非`nil`数值，themeOption ?? 返回 `true`。所以设定`theme`为`themeOption`

```swift
let defaultTheme = '#03a9f4'

var themeOption = '#4a4a4a'
var theme = themeOption ?? defaultTheme //#4a4a4a
```

## Range Operators 范围运算符

### Closed Range Operator 闭区间范围运算符

闭区间范围运算符用`a...b`表示，即返回 a 与 b 之间的数值并包括 a 和 b。下面的代码会依次从 1 打印到 3

```swift
for value in 1...3
    print(value)
```

### Half-Open Range Operator 半开区间范围运算符

半开区间范围运算符用`a..<b`表示，即从 a 到 b 的所有数值，但**不包括 b**

下面的代码中循环`animations`数组并依次打印每部动画的名称。因为数组第一个索引为 0，且数组内最后一个元素的索引为长度减去 1.所以我们可以用`0..<array.count`来遍历

```swift
var animations = ['Attack on Titan', 'Fate Stay Night', 'Clannad']

for index in 0..<animations.count {
    print(index)
}
```

### One-Sided Ranges 单边范围运算符

我们同样可以使用`a...`或者`....a`来进行单范围的取值

```swift
animations[2...] // Clannad
animations[...2] // Attack on Titan, Fate Stay Night, Clanned
animations[..<2] // Attack on Titan, Fate Stay Night
```

## Logical Operators 逻辑运算符

```swift
var isToggle = false
var isClose = true
print(!isToggle) //true
print(isToggle && isClose) //false
print(isToggle || isClose) //true
```
