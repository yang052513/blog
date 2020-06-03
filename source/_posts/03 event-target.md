---
title: event.target与event.currentTarget
date: 2020-05-25 20:10:15
tags: ['笔记', 'javascript']
comments: true
categories: '笔记'
---

> 获取当前点击的元素的 id 或者 class name

# event.target

event.target 一般我们可以用来绑定触发事件的元素。比如常用可以在`input`上来获取文本内容。

比如我们有一个信息对象，可以用`event.target`来拿到`input`输入的值然后传到`useState`里

```jsx
function handleInput(event) {
    const {name, value} = event.target
    setInput(prevInput => {
        ...prevInput,
        [name, value]

    })
}

```

<!-- more -->

# event.currentTarget

如果我们绑定的是一个元素，比如`<i>`或者`<button>`然后想返回触发事件元素的`id`或者`className`。

我们可以用`event.currentTarget`因为这个可以监听当前被触发事件的元素

```jsx
;<i id="keyid" onClick={handleEvent}></i>

function handleEvent(event) {
  console.log(event.currentTarget.id)
}
```

> keyid
