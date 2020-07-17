---
title: React常用Hooks笔记
date: 2020-06-18 21:37:47
tags: ['react', 'framework', 'front-end', 'react-hooks', 'notes']
categories: 笔记
cover: 'https://www.educative.io/api/page/6018530514305024/image/download/5753173610332160'
---

> React Hooks 是 react 16.8 之后的新特性。相比于之前的在 class 组件中管理 state，我们现在可以在函数组件(function component)中管理状态和生命周期

<!-- more -->

## useState(): 管理状态 hooks

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

### Custom Hooks Counter 例子

除了利用 react 官方提供的 hooks API 之外，我们还可以把我们自己的函数封装成 hooks 重复利用。

比如上面的 counter 我们可以封装为 useCounter()。

```jsx
import React, {useState} from 'react'

export default const useCounter = (defaultValue) => {
    const [count, setCount] = useState(defaultValue)

    const increment = () {
        setCount(prevCnt => prevCnt + 1)
    }

    //就像我们声明useState两个参数一样，第一个为变量，第二个为函数。
    return [count, increment]
}
```

在我们的 App 组件中运用我们的 useCounter hooks

```jsx
import React, {useState} from 'react'
import useCounter from './useCounter'

export default const App = () => {
    const [count, handleCount] = useCounter(10)

    return (
        <div className="app-container">
            <p>{count}</p>
            <button onClick={handleCount}>Increment</button>
        </div>
    )
}
```

### Form Hooks 例子

首先创建一个`useForm()` Hooks

```jsx
import { useState } from 'react'

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues)

  return [
    values,
    event => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      })
    },
  ]
}
```

在其他组件中利用`useForm()` Hooks

```jsx
import React, { useState } from 'react'
import { useForm } from './useForm'

export const App = () => {
  const [values, handleForm] = useForm({
    username: '',
    email: '',
    password: '',
  })

  return (
    <div>
      <input name="username" value={values.username} onChange={handleForm} />
      <input name="password" value={values.password} onChange={handleForm} />
      <input name="email" value={values.email} onChange={handleForm} />
    </div>
  )
}
```

## useEffect(): 管理生命周期

我们之前在 class 组件中可以利用`componentDidMount`以及其他函数来管理 state 的生命周期。现在，我们可以利用 useEffect 来管理组件的渲染或者处理第三方 API 的请求数据。useEffect()中有两个参数，第一个为 arrow 函数即我们要执行的操作。第二个参数为依赖，当依赖发生变化时就会执行 useEffect。

```jsx
useEffect(() => {
  //action
}, [dependencies])
```

### 执行 effect 一次

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

### 根据依赖来决定执行次数

我们在第二个参数`[]`内写入依赖。比如我们想要这个 effect 每次`url`改变时执行。

```jsx
const [url, setUrl] = useState('')
useEffect(() => {
  fetch(`https://whatevertheapiis/${url}`)
    .then(response => response.json)
    .then(data => {
      console.log(data)
    })
}, [url])
```

### 利用 callback 来 clean up

有的时候你只希望`useEffect`在渲染的时候执行一次，但是会提示缺少依赖的警告。那我们可以把想要执行的函数作为第一个函数即可

```jsx
const fetchUsers = () => {
  firebase
    .firestore()
    .collection('user')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(docs => {
        setUserLists(currUsers => [...currUsers, docs.data()])
      })
    })
}

useEffect(fetchUsers, [])
```

或者直接在`useEffect()`中声明函数, 跟上面用`callback`同理

```jsx
useEffect(() => {
  const fetchUsers = () => {
    return firebase
      .firestore()
      .collection('user')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(docs => {
          setUserLists(currUsers => [...currUsers, docs.data()])
        })
      })
  }
  fetchUsers()
}, [])
```

### 自定义 Fetch Hooks

我们在处理多个组件都需要调用 API 时，除了上面在组件内用`useEffect()`只渲染一次的方法外，我们还可以自定义`userEffect()` hook 来重复利用相同的方法。那我们改变一下上面的`fetchUser`写法为`useFetchUser()`。

**useFetch.js**

```jsx
import { useState, useEffect } from 'react'
import firebase from 'firebase'

export const useFetch = (collection: string) => {
  const [loading, setLoading] = useState < boolean > true
  const [docs, setDocs] = useState < any > []

  useEffect(() => {
    const fetchCollection = async () => {
      const querySnapshot = await firebase
        .firestore()
        .collection(collection)
        .get()
      querySnapshot.forEach(doc => {
        setDocs((prevData: any) => [...prevData, doc.data()])
        setLoading(false)
      })
    }
    fetchCollection()
  }, [])
  return { docs, loading }
}
```

**App.js**

```js
import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'

export const App = () => {
  const { docs, loading } = useFetch('user')

  return <div>{loading ? 'Loading Animaion...' : <p>{docs.username}</p>}</div>
}
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

## useReducer(): 状态管理

首先来看一下 useReducer()的参数

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

其中第一个`state`即函数的状态值， `dispath`则是用来发送 action。`reduce`即我们我们之后 Reducer 的函数。`initialState`为状态的初始值。

比如我们有 3 个按钮，分别对应着数字的加，减，归零。利用 useReducer()来实现即

```jsx
export const Counter: React.FC = () => {
  const counterReducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return {
          ...state,
          count: state.count + 1,
        }
      case 'decrement':
        return {
          ...state,
          count: state.count - 1,
        }
      case 'reset':
        return {
          ...state,
          count: 0,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(counterReducer, { count: 0 })
  return (
    <div className="counter-container">
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>

      <p>{state.count}</p>
    </div>
  )
}
```

<iframe src="https://stackblitz.com/edit/react-2ytrpj?embed=1&file=index.js&hideExplorer=1&hideNavigation=1"></iframe>

我们当然也可以利用 useState()来实现同样的效果，但是我们需要给 increment, decrement, reset 每个按钮都单独创建一个 useState()。然后每个按钮我们再利用 setIncrement()来实现状态的更新。

很明显，利用 useReducer()可以让我们的代码更容易读，也增加了代码的维护性。一个开发团队，你永远都不知道下一个跟你合作的或者接手你的代码的人的技术性。因此提高代码的阅读性和维护性是至关重要的。
