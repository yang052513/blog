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

## useEffect(): 管理生命周期

我们之前在 class 组件中可以利用`componentDidMount`以及其他函数来管理生命周期。现在，我们可以利用 useEffect 来管理组件的渲染或者处理第三方 API 的请求数据。

```jsx
useEffect(() => {
  //action
}, [dependencies])
```

useEffect()中有两个参数，第一个为 arrow 函数即我们要执行的操作。第二个参数为依赖，当依赖发生变化时就会执行 useEffect。

如果我们只想执行 useEffect 一次，类似于之前 componentDidMount。我们给第二个参数留空的数组即可。

```jsx
useEffect(() => {
  const url = 'https://whatevertheapiis/'
  fetch(url)
    .then(repsonse => response.json)
    .then(data => {
      console.log(data)
    })
}, [])
```

## useContext(): 跨组件传递状态

在之前的版本中我们可以利用 context 来创建 Consumer 和 Provider。但是 useContext()可以更加方便。

最简单的例子，用户登录之后，用户名是可以被多个组件使用。

比如下面我们创建一个 ProfileMenu 和 Dashboard 组件。这两个组件都需要用到用户的姓名。

```jsx
export const App: React.FC = () => {
  return (
    <div className="app-container">
      <ProfileMenu />
      <Dashboard />
    </div>
  )
}
```

首先我们需要给 Profile 和 Dashboard 组件创建一个 Context

```jsx
import React, { createContext } from 'react'

const UserNameContext = createContext({})
```

然后我们把 Profile 和 Dashboard 封装在我们刚刚建立的`UserNameContext`中作为状态的**提供者**(Provider), 以供子级组件共享。

```jsx
export const App: React.FC = () => {
  return (
    <UserNameContext.Provider
      value={{
        userName: 'Yang Li',
      }}
    >
      <div className="app-container">
        <ProfileMenu />
        <Dashboard />
      </div>
    </UserNameContext.Provider>
  )
}
```

然后我们就可以在 ProfileMenu 和 Dashboard 中引用我们`UserNameContext`的 userName

```jsx
export const ProfileMenu: React.FC = () => {
  const { userName } = useContext(UserNameContext)
  return (
    <div clasName="profile-menu-container">
      <p>{userName}</p>
    </div>
  )
}

export const Dashboard: React.FC = () => {
  const { userName } = useContext(UserNameContext)
  return (
    <div className="dashboard-container">
      <h2>Welcome Back {userName}</h2>
    </div>
  )
}
```
