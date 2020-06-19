---
title: React常用Hooks笔记
date: 2020-06-18 21:37:47
tags: ['react', 'framework', 'front-end', 'react-hooks', 'notes']
categories: 笔记
comments: false
---

> React Hooks 是 react 16.8 之后的新特性。相比于之前的在 class 组件中管理 state，我们现在可以在函数组件(function component)中管理状态和生命周期

<!-- more -->

## useState(): 管理状态 hooks

在之前的函数组件中，我们只能由上至下传递 props 而且 props 是只读不可更改，只有 class 组件才可以有状态管理。

现在，函数组件也可以利用 useState()管理组件状态。

useState()有两个 parameters，期中第一个是变量，即指向状态的 value。第二个是管理该状态的函数，通常以 set 开头加状态名。

比如我们声明一个用户登录的状态。

```jsx
import React, {useState} from 'react'

export const App:React.FC = () => {
    // 初始化isLogged的状态为false
    const [isLogged, setIsLoggedIn] = useState<boolean>(false)

    // 点击按钮后 更改isLogged的状态为true
    const handleLogin = () {
        setIsLoggedIn(true)
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

```

## useEffect(): 管理声明周期
