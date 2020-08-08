---
title: ReactNative 开发原生移动端应用
date: 2020-08-08 11:00:50
tags: ['react-native', 'react', 'note']
categories: Notes
cover: 'https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/1_QDQvlCg420lzRElCK4AYhw.png?alt=media&token=619670bd-3da8-4090-bbfd-8f79ae0a8267'
---

# 配置

## 安装 Expo CLI

确保开发环境已经安装了`Node.js`.

```shell
npm install expo-cli --global
```

## 创建项目

```shell
expo init project-name
cd project-name
expo start
```

然后可以在 Expo Tools 面板中选择 Androidh 或者 IOS 模拟器。这里我们使用 Android Studiod AVD manager 模拟器。

在 Android Studio 中创建虚拟环境后，直接在 Expo Tool 面板点击`Running on Android device`或者输入`a`在 terminal。第一次运行时需要在虚拟器上安装 Javascript 包以及依赖，所以安装时间会久一点。安装完成后会自动在模拟器运行 App

# React Native

## Views, Text & Styles 视图，文本，样式化

React 中 View 可以看作是 HTML 中的 div，我们可以在 View 添加 Text, Image. Text 跟`<p>`相似，用来渲染文本内容。StyleSheet 用来样式化元素，这里用驼峰命名跟 CSS 不同。

```jsx
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.appContainer}>
      <Text style={styles.currRoute}>Home</Text>
      <Text>Contact</Text>
      <Text>Servicsse</Text>
      <Text>ss</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currRoute: {
    backgroundColor: 'red',
    padding: 20,
  },
})
```

## Text Inputs 文本输入框

使用<TextInput /> API 来填写表单更改 state。

```jsx
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default function App() {
  const [user, setUser] = useState({
    name: '',
    age: '',
  })

  return (
    <View style={styles.appContainer}>
      <Text>Enter Your Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Yang Li"
        onChangeText={e => setUser({ ...user, name: e })}
      />
      <Text>Enter Your Age</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 23"
        onChangeText={e => setUser({ ...user, age: e })}
      />

      <Text>
        Hello
        <Text style={styles.userInfo}>
          {user.name} {user.age}
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#4a4a4a',
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  userInfo: {
    color: '#03a9f4',
    fontWeight: 'bold',
  },
})
```
