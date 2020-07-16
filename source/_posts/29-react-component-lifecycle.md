---
title: Axios与Fetch的对比
date: 2020-07-15 22:37:54
tags: ['API', 'javascript']
categories: Articles
cover: 'https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/zRP0GYN.jpg?alt=media&token=311eee9f-6def-4660-a603-e91ea99bf7a2'
---

## fetch()

基本的语法为`const promise = fetch(url, [options])`

`url`是我们进行请求的路径，`option`即我们进行请求时可设置的 request header。

### 基本的 fetch()

```js
fetch('api/users')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.log(`error while fetching ${error}`)
  })
```

### 利用 Async Await

```js
options = {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}

url = 'api/users'

const fetchUsers = async () => await (await fetch(url, options)).json()

fetchUsers()
  .then(data => console.log(data))
  .catch(error => console.log(`error during fetch ${error.message}`))
```

## axios

```shell
npm install axios
```

### 基本的 axios 请求一个 API

```js
url = 'api/users'

axios
  .get(url)
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
```

### React useEffect 利用 axios

```js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const User = () => {
  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios(`api/user/${uid}`)
      setUserInfo(response.data)
    }

    fetchUserInfo()
  }, [])
}
```
