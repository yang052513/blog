---
title: 正则表达式基础
date: 2020-06-19 11:31:47
tags: ['regular expression', 'javascript', 'learning everyday']
categories: 每日一学
comments: false
---

> A regular expression is a sequence of characters that define a search pattern.

正则表达式简而言之我们可以对一个字符串组合进行查找，替换，以及字符验证等其他操作。举个例子，我们有一个 login 的登陆页面，我们希望对用户密码加以强度监测。用户密码必须要包含大写字母，数字，特殊符号，以及长度大于 8 的要求。正则表达式就是用来对密码字符串进行查找来判断是否满足我们的规则。

这个网站可以让你在练习过程中更好的了解正则表达式https://regexr.com/

<!-- more -->

## Syntax 语法

```bash
/pattern/modifier
```

pattern 即我们想要搜索字符串的 pattern，比如我们想查找一个字符串中所有的`play`。pattern 的两侧我们分别用`/`包裹起来，我们所有的规则都在这两个`/`之内。`modifier`即表达式的修饰符。

## Modifiers 修饰符

下面将介绍`g`, `i`, `m`, `s`, `u`, `y`以及它们分别的作用。

### Global 全局

`g`修饰符可以让我们搜索整个字符串内所有匹配的字符。

```js
const text =
  'Hinata studies and is accepted to Karasuno, the same high school the Little Giant played for, but is shocked to discover that Kageyama has also chosen to attend Karasuno. What is karasuno?'

let karasuno = text.match(/Karasuno/g)

// 返回["Karasuno", "Karasuno"]
```

> 如果我们不包括`g`修饰符时，则只会返回查找的第一个匹配结果。

### Case Insensitive 不区分大小写

`i` 即让表达式不区分大小写。

之前的例子，假设我们想返回所有`karasuno`但不区分大小写。

```js
let karasuno = text.match(/karasuno/gi)

//返回["Karasuno", "Karasuno", "karasuno"]
```

### Multiline 多行搜索

跟搜索整个字符串不同。当添加了`m`修饰符，`^`和`$`则只会匹配每行的开头和结尾。

```js
const text =
  'Hinata studies and is accepted to Karasuno\nThe same high school the Little Giant played for but is shocked to discover that Kageyama has also chosen to attend Karasuno. What is karasuno'

let karasuno = text.match(/karasuno$/gim)

//["Karasuno", "karasuno"] 第一段和最后一段结尾处。
```

与之前字符串不同的是现在这个字符串在`Karasuno`出有新的一行开始。所以我们添加`m`修饰符来返回每行以`karasuno`为结尾的字符(不区分大小写)。

如果我们不包括`m`修饰符，则只会返回整个字符串最后结尾处的`karasuno`。

## Character Classes

### Character set [abc]

返回所有括号内包括的字符。

```js
const text = 'Hinata studies and is accepted to Karasuno'
console.log(text.match(/[ak]/g))

//返回 ["a", "a", "a", "a", "K", "a", "a"]
```

### Negated set [^abc]

返回所有括号内不包括的字符。

```js
const text = 'Kit kat'
console.log(text.match(/[^kt]/gi))
// 返回 ["i", " ", "a"]
```

### Range [a-z]

返回字符串中所有在括号范围内的字符。

```js
const text = 'Hinata studies and is accepted to Karasuno'
console.log(text.match(/[a-c]/gi))
//返回 ["a", "a", "a", "a", "c", "c", "a", "a"]
```

### Word \w

返回字符串中所有单字字符，包括字母数字和下划线。但不包括 ASCII 之外的字符。

https://wiktel.com/standards/ascii.htm

同等于`[A-Za-z0-9_]`

```js
const text = 'Some Japanese pass by 最後の字符'
console.log(text.match(/\w/gi))
// 返回 ["S", "o", "m", "e", "J", "a", "p", "a", "n", "e", "s", "e", "p", "a", "s", "s", "b", "y"]
```

### Not Word \W

与`\w`截然相反，返回字符串中所有非单字字符。

同等于`[^A-Za-z0-9_]`

```js
const text = 'Some Japanese pass by 最後の字符'

console.log(text.match(/\W/gi))
// 返回 [" ", " ", " ", " ", "最", "後", "の", "字", "符"]

console.log(text.match(/[^A-Za-z0-9_ ,]/gi))
// 返回 ["最", "後", "の", "字", "符"]
```
