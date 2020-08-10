---
title: ReactNative 开发原生移动端应用
date: 2020-08-08 11:00:50
tags: ['react-native', 'react', 'note']
categories: Notes
cover: 'https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/1_QDQvlCg420lzRElCK4AYhw.png?alt=media&token=619670bd-3da8-4090-bbfd-8f79ae0a8267'
---

# Setup 配置

## Install Expo CLI 安装

确保开发环境已经安装了`Node.js`.

```shell
npm install expo-cli --global
```

## Initialize Project 创建项目

```shell
expo init project-name
cd project-name
expo start
```

然后可以在 Expo Tools 面板中选择 Androidh 或者 IOS 模拟器。这里我们使用 Android Studiod AVD manager 模拟器。

在 Android Studio 中创建虚拟环境后，直接在 Expo Tool 面板点击`Running on Android device`或者输入`a`在 terminal。第一次运行时需要在虚拟器上安装 Javascript 包以及依赖，所以安装时间会久一点。安装完成后会自动在模拟器运行 App

# Fundamentals 基本概念

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
```

## ScrollView 滑动视图

在 React Native 中渲染一个列表，我们用 ES6 map 遍历数组然后渲染每个 item 为 Text 即可。默认情况下如果列表高度超过模拟机的高度会出现溢出，这时候我们可以用`<ScrollView>` API 把列表 wrap 起来就可以滚动显示。

```jsx
  const [userList, setUserList] = useState([
    { name: 'Yang Li', id: '1' },
    { name: 'Jason Wang', id: '2' },
    { name: 'Alex Zhao', id: '3' },
  ])

<ScrollView>
  {userList.map(user => (
    <View key={user.id}>
      <Text>{user.name}</Text>
    </View>
  ))}
</ScrollView>
```

## Flat List 列表

使用`<FlatList />` API 实现列表的渲染

```jsx
const [userList, setUserList] = useState([
  { name: 'Yang Li', id: '1' },
  { name: 'Jason Wang', id: '2' },
  { name: 'Alex Zhao', id: '3' },
])

<FlatList
    numColumns={2}
    keyExtractor={item => item.id}
    data={userList}
    renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

## Touchable Components 可触组件

我们可以使用`<TouchableOpacity>` API 来对组件进行点击操作。下面的例子实现了点击组件时会从 View 中删除该组件。

```jsx
const [userList, setUserList] = useState([
  { name: 'Yang Li', id: '1' },
  { name: 'Jason Wang', id: '2' },
  { name: 'Alex Zhao', id: '3' },
])

const deleteCard = selectedUser => {
  setUserList(prevUser => {
    return prevUser.filter(user => user.id !== selectedUser)
  })
}

return (
  <FlatList
    numColumns={2}
    keyExtractor={item => item.id}
    data={userList}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => deleteCard(item.id)}>
        <Text style={styles.userCard}>{item.name}</Text>
      </TouchableOpacity>
    )}
  />
)
```

## Alerts 警示面板

使用`Alert` API 对用户进行提示。

```jsx
import { Alert } from 'react-native'

const handleSubmit = (inputValue) => {
    if(inputValue === '') {
        Alert.alert('Error', 'Please enter your name', [
            {text: 'OK', onPress: () => console.log('alert closed')
        ])
    }
}
```

## Keyboard Dismiss 键盘忽略

点击任何区域不再显示 Keyboard

```jsx
<TouchableWithoutFeedback
  onPress={() => {
    keyboard.dismiss()
    console.log('dismissed keyboard')
  }}
>
  <View>
    <Text>Code Here</Text>
  </View>
</TouchableWithoutFeedback>
```

## Custom Fonts 自定义字体

如果想导入自定义的字体，需要使用`expo`中的`Font`库。我们首先利用`loadAsync`来加载字体，这个函数接受一个对象的参数，对象即字体引用名以及字体文件所在位置。

我们同时要确保字体加载完成后再渲染组件，这里用`<AppLoading />`来做异步处理，当字体加载完成后更新 fontLoaded state。

```jsx
import React, { useState } from 'react'
import * as Font from 'expo-font'
import Home from './screens/Home'
import { AppLoading } from 'expo'

const fetchFonts = () =>
  Font.loadAsync({
    'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
    quicksand: require('./assets/fonts/Quicksand.ttf'),
  })

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (fontLoaded) {
    return <Home />
  } else {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    )
  }
}
```

之后便可以在其他组件的`StyleSheet`中引用我们导入的字体

```jsx
export default function Home() {
  ;<View>
    <Text style={styles.textPrimary}>Hello</Text>
  </View>
}

const styles = StyleSheet.create({
  textPrimary: {
    fontFamily: 'quicksand',
    fontSize: 20,
  },
})
```

## Global Styles 全局样式化

在 CSS 中我们可以通过`className`来做到样式化的重复利用。在 React Native 中我们同理可以创建一个单独的全局样式化文件，来管理通用的样式化。其他组件使用时只需要导入文件即可。

在`styles`文件夹中创建`global.js`管理样式化

```jsx
import {StyleSheet} from 'react-native'

export const globalStyles = StyleSheet.create({
  boxContainer: {
    padding: 20,
    borderRadius: 5
  },
  titleText: {
    fontFamily: 'quicksand'
    fontWeight: 'bold'
  }
})
```

在其他组件中导入`globalStyles`

```jsx
import { globalStyles } from '../styles/global'

export default function Home() {
  return (
    <View style={globalStyles.boxContainer}>
      <Text style={globalStyles.titleText}>Hello</Text>
    </View>
  )
}
```

# Navigation and Router 路由库

## Stack Navigation 栈导航

### Install Dependencies

```shell
npm install react-navigation
expo install react-native-gesture-handler react-native-reanimated
npm install react-navigation-stack
```

### Setup Routers

创建一个`router`文件夹，并创建一个`homeStack.js`文件。

如果没有在`navigationOptions`内声明样式化，会使用`defaultNavigationOptions`

**homeStack.js**

```jsx
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/Home'
import CardDetail from '../screens/CardDetails'

// 默认情况下首先显示Home Screen
const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'AnimeKnow',
    },
  },
  CardDetail: {
    screen: CardDetail,
    navigationOptions: {
      title: 'Anime Details',
    },
  },
}

const RouteStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#4a4a4a',
    headerStyle: { backgroundColor: '#03a9f4', height: 60 },
  },
})

export default createAppContainer(RouteStack)
```

**App.js**

```jsx
import Router from './router/homeStack'

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (fontLoaded) {
    return <Router />
  } else {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    )
  }
}
```

### Navigation with Button 按钮事件导航

在之前的 Setup 中，我们默认显示的为`Home`组件，现在添加按钮来进行组件的导航。

默认情况下，`react-navigation`会自动添加一个返回箭头按钮来实现 pop 组件。

**Home.js**

```jsx
export default function Home({navigation}) {
  const handleDetailNav = () => {
    navigation.navigate('CardDetail')
  }

  return (
    <View>
      <Text>Home Page</Text>
      <Button title='View More Details' onPress={handleDetailNav}>
    </View>
  )
}
```

同理添加一个`<Button />`手动实现回到上一个组件

**CardDetail**

```jsx
export default function CardDetail({navigation}) {
  const handleReturn = () => {
    navigation.goBack()
  }

  return (
    <View>
      <Text>Card Details page</Text>
      <Button title='Go Back' onPress={handleReturn}>
    </View>
  )
}
```

### Passing Data Between Components 传递数据

点击每个卡片显示该卡片的信息。具体思路如下

1. 使用 FlatList API 渲染所有卡片
2. 对卡片添加`onPress`触发，并转入到`<CardDetail />`
3. props 接受并显示数据

**Home.js**

```jsx
export default function Home({ navigation }) {
  const [animeList, setAnimeList] = useState([
    { key: '1', title: 'Attack on Titan', episode: 24, rating: 9.5 },
    { key: '2', title: 'Fate Stay Night', episode: 22, rating: 7.5 },
    { key: '3', title: 'Clannad', episode: 13, rating: 10.0 },
  ])

  return (
    <View>
      <FlatList
        data={animeList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CardDetail', item)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
```

在`<CardDetail />`组件中利用`getParam`获取传递的数据

**CardDetail**

```jsx
export default function CardDetail({ navigation }) {
  return (
    <View>
      <Text>{navigation.getParam('title')}</Text>
      <Text>{navigation.getParam('episode')}</Text>
      <Text>{navigation.getParam('rating')}</Text>
    </View>
  )
}
```

## Drawer Navigation 侧滑导航菜单栏

### Install

```shell
npm install react-navigation-drawer
```

在`router`文件夹内创一个`aboutStack.js`

**aboutStack**

```jsx
import {createStackNavigator} from 'react-navigation-stack'
import About from '../screens/about'

const screens = {
  About: {
    screen: About,
    navigationOptions: {
      title: 'About AnimeKnow
    }
  }
}

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 60}
  }
})

export default AboutStack
```

**drawer.js**

```jsx
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import HomeStack from './homeStack'
import AboutStack from './aboutStack'

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  About: {
    screen: AboutStack,
  },
})

export default createAppContainer(RootDrawerNavigator)
```

**App.js**

导入侧滑菜单组件

```jsx
import Router from './router/drawer'

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (fontLoaded) {
    return <Router />
  } else {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    )
  }
}
```
