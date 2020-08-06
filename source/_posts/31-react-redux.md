---
title: Redux 笔记
date: 2020-08-04 11:15:41
tags: ['redux', 'react', 'note', 'front-end']
categories: Notes
cover: 'https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/1_ufTZlV3JGAlFmtpNOqn2UQ%402x.png?alt=media&token=8fc10f35-e91b-48db-8ea4-0842883035bc'
---

## Setup

通过 React CLI 创建一个新的 React Project 并安装 redux 依赖。

```shell
npx create-react-app redux-demo
npm install redux react-redux
```

在`src`文件夹中创建`redux`文件夹，用来管理和存放所有 redux 相关的文件。

## Actions

创建一个`product`文件夹，所有的 reducer 都跟 product 相关。用来管理 product 的 state 和 action

**productTypes.js**

```jsx
export const BUY_PRODUCT = 'BUY_PRODUCT'
export const ADD_STOCK = 'ADD_STOCK'
```

在`productActions`中创建两个函数`BUY_PRODUCT`以及`ADD_STOCK`，分别返回响应的类型，之后在 reducer 中根据类型打包相关操作。

**productActions.js**

```jsx
import { BUY_PRODUCT, ADD_STOCK } from '.productTypes'

export const buyProduct = () => {
  return {
    type: 'BUY_PRODUCT',
  }
}

export const addStock = () => {
  return {
    type: 'ADD_STOCK',
  }
}
```

## Reducer

在`productReducer`中，我们可以根据 action 的 type 来对 state 进行更新。

**productReducer**

```jsx
import {BUY_PRODUCT, ADD_STOCK} from './productTypes'

const initialState ={
    numOfProducts: 10,
}

const productReducer = (state=initialState, action) => {
    switch(action.type) {
        case BUY_PRODUCT:
            return {
                ...state,
                numOfProducts: state.numOfProducts - 1,
            }
        case ADD_STOCK:
            return {
                ...state,
                numOfProducts: state.numOfProducts + 1
            }
        default:
            return state
    }
}

export productReducer
```

## Store

最后在`redux`根目录下创建一个`store.js`和`index.js`用来管理 state 和 action

**store.js**

```js
import { createStore } from 'redux'
import productReducer from './product/productReducer'

const store = createStore(productReducer)

export default store
```

**index.js**

```jsx
export { buyProduct, addStock } from './product/productActions'
```

## Using Redux in Component

**App.js**

```jsx
import React from 'react'
import Product from './components/Product'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div>
        <Product />
      </div>
    </Provider>
  )
}
```

**Products.js**

```jsx
import React from 'react'
import { connect } from 'react-redux'
import { buyProduct, addStock } from '../redux'

function Product(props) {
  return (
    <div>
      <h2>Number of products available {props.numOfProducts}</h2>
      <button>Buy Products</button>
      <button>Add Product to Shelf</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    numOfProducts: state.numOfProducts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyProduct: () => dispatch(buyProduct()),
    addStock: () => dispatch(addStock()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
```
