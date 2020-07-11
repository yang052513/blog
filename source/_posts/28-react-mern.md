---
title: React MERN Stack 配置
date: 2020-07-11 13:28:05
tags: ['MERN', 'react', 'mongoDB', 'express', 'node']
categories: Notes
cover: 'https://miro.medium.com/proxy/1*FVtCyRdJ6KOr4YswTtwMeA.jpeg'
---

> MERN stack setup 笔记。

## React 配置

在`course-flex`项目文件夹中创建`client`文件夹并安装`create-react-app`

```shell
mkdir course-flex
cd course-flex
npx create-react-app client
```

## Node 配置

### 安装相关依赖

执行以下命令创建`package.json`以及安装相关依赖. `mongoose`和`express`可以搭建服务器来连接 MongoDB 数据库。`axios`之后用来 fetch 数据库的 documents. `concurrently`可以在命令行中同时运行多个命令。`dotenv`用来管理 MognoDB 的 URI

```shell
npm init -y
npm install mongoose express axios morgan concurrently dotenv cors
```

### server.js 配置

首先在项目文件夹内创建`.env`, 复制 MongoDB Atlas Connect 内的连接如下。替换`<password>`和`<dbname>`为相关的数据库密码和名称。

```env
ATLAS_URI=mongodb+srv://yang_admin:<password>@cluster0-uo1ne.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority
```

然后在项目文件夹中创建`server.js`.

`server.js`

```js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8080

const MONGODB_URI = process.env.ATLAS_URI

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log(`MongoDB连接成功~`)
})

app.get('/api', (req, res) => {
  const data = {
    name: 'Yang Li',
  }
  res.json(data)
})

app.listen(PORT, console.log(`服务器在${PORT}启动`))
```

## Concurrently React & Node

全局安装`npm install -g nodemon`, 然后配置`package.json`运行脚本

`package.json`

```json
{
  "name": "courseflex",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "client": "cd client && yarn start",
    "dev": "concurrently -n 'server,client' -c 'green, blue' \"nodemon server.js\" \"npm run client\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.19.2",
    "concurrently": "^5.2.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mongoose": "^5.9.20",
    "morgan": "^1.10.0"
  }
}
```

在命令行中输入`npm run dev`即可启动 node server 和 react app
