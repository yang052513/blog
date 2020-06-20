---
title: 如何创建你的第一个React组件库并发布到npm
date: 2020-06-14 23:51:11
tags: ['react', 'typescript', 'notes', 'npm', 'node']
categories: Articles
cover: 'https://www.itprotoday.com/sites/itprotoday.com/files/styles/article_featured_retina/public/github-npm.png?itok=NVoj-tk8'
---

> 在学习 React 开发项目的过程中，很多时候希望能够重复利用之前项目的组件。比如一些常用的 css 和 js 交互特效，又或者是一个反馈面板根据 props 显示状态回馈，可能也只是一个简单样式化的按钮。于是就产生出了自己创建组件然后传到 npm 上来再次利用。本文用 typescript 为例来介绍如何创建你的第一个 npm 库

<!-- more -->

## 安装 npm

首先我们创建一个文件夹，命名为我们的项目名。比如如下我们创建一个命名为`react-current-time`的项目, 然后进入到该项目目录中

```cmd
mkdir react-current-time
cd react-current-time
```

然后我们可以安装建立`package.json`文件到该目录

```cmd
npm init -y
```

之后安装 typescript 依赖到该目录

```cmd
npm i typescript -D
```

接下来安装 typescript 的配置文件

```cmd
npx tsc --init
```

安装 react 依赖

```cmd
npm i react @types/react -D
```

完成以上后我们可以进入文件夹目录配置相关文件

## 配置文件

### tsconfig.json

首先打开目录中的`tsconfig.json`文件，然后更改为以下相关的设置

```json
{
  "compilerOptions": {
    "jsx": "react",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "lib"
  },
  "include": ["src"]
}
```

更改完`tsconfig.json`文件后，我们在项目目录创建`src`目录并创建`index.tsx`文件在该目录，这也是我们文件的入点

## 创建组件

接下来我们就可以像平时一样创建组件。如下我们创建一个卡片的组件接受父级的 props 并渲染

```jsx
import React from 'react'

interface Props {
    name: string
    category: string
    isRare: boolean
}

export const Card: React.FC<Props> = ({name, category, isRare}) => {
    return (
        <div>
            <p>Card name: {name}</p>
            <p>Card category: {category}</p>
            {isRare ? <p>Rare Card</p> : null}
        </div>
    )
}
```

## 打包发布到 npm

当我们的组件完成后，我们可以打包我们的项目发布到 npm。

首先打开项目目录内的`package.json`文件，在`scripts`处加入`"build": "tsc -p ."`

```json
{
  "scripts": {
    "build": "tsc -p ."
  }
}
```

在 terminal 中进入到该项目目录，然后在该目录下输入`npm run build`

```cmd
npm run build
```

输入`npm login`登录 npm

```cmd
npm login
Username: yang052513
password:
```

最后用命令`npm publish`就可以发布到 npm 上，可以在个人信息的 package 处查看

> 注: 初次发布的版本为`1.0.0`, 可以在项目根目录的`package.json`文件进行更改。更改之后若要发布新的版本必须在`package.json`文件内更改`version`之后才能发布

## 导入和使用

现在我们就可以用我们的自己的组件库啦。下面用一个`react` boiler plate 项目来展示如何导入我们自己的库。

首先在我们新的项目中安装我们建立的 npm 包

```cmd
npm install react-card-demo
```

然后导入组件

```cmd
import {Card} from react-card-demo
```

> 注: 因为我们之前用的`typescript`来创建的组件，所以要加上`{}`。如果是`jsx`, 可以直接`import Card from react-card-demo`

```jsx
import React from 'react'
//导入组件
import { Card } from 'react-card-demo`

export const App: React.FC = () => {
    return (
        <div className="app=container">
              {/* 我们之前给Card组件创建了3个props */}
            <Card name="Fate Stay Night" category="Gal Game" isRare={false}>
        </div>
    )
}
```
