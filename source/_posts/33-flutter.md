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

# Strings and Characters 字符串

## Initializing Empty String 初始化空字符串

使用单引号`''`或者`String()`来初始化空的字符串。两种方法同等。

```swift
var welcomeMsg = ''
var byeMsg = String()
```

我们可以用`isEmpty`来判断字符串是否是空的

```swift
var isStringEmpty = byeMsg.isEmpty
print(isStringEmpty)
```

## String Interpolation 字符串插值

在变量或表达式之前用`\`(backslash)表示

```swift
var attempt = 5
let MAX_ATTEMPT = 10
var warningMsg = "You tried to log in \(attempt) times and maximum attempt is \(MAX_ATTEMPT) times"

print(warningMsg)
// You tried to log in 5 times and maximum attempt is 10 times
```

## Accessing and Modifying a String

### String Indices 字符串截取

```swift
let animeTitle = 'Clannad'

let firstLetter = animeTitle[animeTitle.startIndex] // C
let lastLetter = animeTitle[(before:animeTitle.endIndex)] // d
let thirdLetter = animeTitle[animeTitle.index(animeTitle.startIndex, offsetBy: 2)] // a
```

### Inserting and Removing 插入和删除

#### Insert

插入单个字符到特定的位置使用`insert(_, at: index)`

```swift
var welcomeMsg = 'Hello'
welcomeMsg.insert('!', at: welcomeMsg.endIndex) // Hello!
```

插入多个字符或者一个字符串时

```swift
var userName = 'Nathan'
var welcomeMsg = 'Hello!'

welcomeMsg.insert(contentsOf: " \(userName)", at: welcomeMsg.index(before: welcomeMsg.endIndex))
// Hello Nathan!
```

#### Remove

字符串的删除与插入相似，即找到要更改的索引值位置

```swift
welcomeMsg.remove(at: welcomeMsg.index(before: welcomeMsg.endIndex))
// Hello Nathan
```

同样我们可以删除一定范围内的字符，比如下面的代码我们想删除用户名，我们先得到用户名的长度再 offset 同等长度即可

```swift
var userNameOffset = -userName.count // -6
var removeRange = welcomeMsg.index(welcomeMsg.endIndex, offsetBy: userNameOffset) // Nathan
welcomeMsg.removeSubrange(removeRange)

//Hello
```
