---
title: 数据可视化 D3在React中的应用
date: 2020-08-03 10:53:37
tags: ['data visiualization', 'react', 'note']
categories: Notes
cover: 'https://cdn.dribbble.com/users/22018/screenshots/2456036/d3.png'
---

## 安装

```shell
npm i d3 --save

npm i @types/d3 --save
```

## 选择器 select 和 selectAll

利用 D3 select 方法选中 DOM 对象并附加属性

首先声明一个变量`svgRef`来获取 svg DOM 元素添加宽度和高度值分别为 1000 和 500

其中 attr 跟用`jQuery`选择器相似，我们用`string`来声明属性类型，值如果不是数字类型(number)也可以用 string 字符串的方式来表示

`selectAll`可以选择多个元素，其选择方式同为`string selector`。比如`selectAll('.rectEle')`会选择所有`className`为 rectEled 额元素

```jsx
import React, { useRef, useEffect } from 'react'
import { select, selectAll } from 'd3-selection'

export const Demo: React.FC = () => {
  const svgRef = (useRef < SVGSVGElement) | (null > null)

  useEffect(() => {
    select(svgRef.current).attr('width', 1000).attr('height', 500)
    selectAll('rect')
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', 'red')
      .attr('x', (_, index) => index * 150) // 在x 轴每一个元素间隔150px
  })

  return (
    <div>
      <svg ref={svgRef}>
        <rect />
        <rect />
        <rect />
      </svg>
    </div>
  )
}
```

## 导入数据 Data Joins

我们可以通过利用`data()`方法来加载数据并创建图形，并利用`enter()`来让 D3 自动添加 DOM 元素根据数据的数量。

```jsx
const data = [
  { width: 50, height: 100, color: 'purple' },
  { width: 50, height: 70, color: 'red' },
  { width: 50, height: 220, color: 'blue' },
  { width: 50, height: 400, color: 'green' },
  { width: 50, height: 300, color: 'yellow' },
  { width: 50, height: 100, color: '#ff932f' },
  { width: 50, height: 200, color: '#0a94dd' },
  { width: 50, height: 600, color: '#03a9f4' },
  { width: 50, height: 50, color: 'orange' },
]

export const App: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null | any>(null)
  const [selection, setSelection] = useState<null | Selection<
    any,
    unknown,
    null,
    undefined
  >>(null)

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current))
    } else {
      // svg容器 宽度 高度
      selection.attr('width', 1200).attr('height', 1000)

      // 每个rect元素的属性 间隔50px x轴
      const rects = selection
        .selectAll('rect')
        .data(data)
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('fill', d => d.color)
        .attr('x', (_, index) => index * 50)

      // 根据data数组添加rect DOM
      rects
        .enter()
        .append('rect')
        .attr('width', d => d.width)
        .attr('height', d => d.height)
        .attr('fill', d => d.color)
        .attr('x', (_, index) => index * 50)
    }
  }, [selection])

  return (
    <div className="app-container">
      <svg ref={svgRef}>
        <rect />
      </svg>
    </div>
  )
}
```
