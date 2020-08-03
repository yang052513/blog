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

### 代码 Demo Code

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

### 代码 Demo Code

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

## Scales

之前的例子中我们用数据给定的数值来定义 svg 元素的高度。假设进行操作的数据值比较大比如 30,000。那么用这个数值来定义元素的高度`30000px`是不太可行的。我们可以用 D3 中的`d3-scale`库来对数据的取值范围进行映射并在一个新的范围返回新的对应数值。

具体的步骤为首先利用`max`找到数据中的最大值，这个值决定了`domain`。`max()`第一个参数为所操作的数组，第二个为一个函数即 accessor, 也就是数组的哪个属性我们要找最大值

```jsx
import { max } from 'd3-array'

const data = [{ name: 'Ford', number: 90000 }]
const maxValue = max(data, d => d.number)
```

然后利用`scale-linear`来创建一个变量函数。`domain()`和`range()`的范围默认为从 0 到 1。这里我们设置 domain 为 0 到数组内的最大值。range 即为映射的高度，这里最高设置为 svg 容器的高度。

```jsx
const y = scaleLinear().domain([0, maxValue!]).range([0, 500])
```

最后在创建`rect`元素时，在`attr`高度里利用上面创建的函数即可。

### 代码 Demo Code

```jsx
import React, { useRef, useEffect, useState } from 'react'
import { select, selectAll, Selection } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'

const data = [
  {
    name: 'Ford',
    number: 9000,
    color: '#03af94',
  },
  {
    name: 'Apple',
    number: 19000,
    color: 'red',
  },
  {
    name: 'Google',
    number: 5000,
    color: 'purple',
  },
  {
    name: 'Amazon',
    number: 23000,
    color: 'orange',
  },
  {
    name: 'BMW',
    number: 3200,
    color: 'blue',
  },
]
export const App: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null | any>(null)
  const [selection, setSelection] = useState<null | Selection<
    any,
    unknown,
    null,
    undefined
  >>(null)

  const maxValue = max(data, d => d.number)
  const y = scaleLinear().domain([0, maxValue!]).range([0, 500])
  const x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, 300])
    .paddingInner(0.5)

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current))
    } else {
      selection
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', d => x(d.name)!)
        .attr('fill', d => d.color)
        .attr('height', d => y(d.number))
    }
  }, [selection])

  return (
    <div className="app-container">
      <svg ref={svgRef} width={300} height={500}></svg>
    </div>
  )
}
```

## Group, Margins, Axis

继续之前的例子，我们这次加入 x 和 y 的坐标轴并对元素进行分类组合。

首先声明 svg 容器的样式类, 我们把 svg 分为三个部分，x 坐标轴，y 坐标轴，以及数据呈现的 rect 元素。

```jsx
const dimensions = {
  width: 800,
  height: 500,
  chartWidth: 700,
  chartHeight: 400,
  marginLeft: 100,
}
```

创建坐标需要引用`d3-axis` modules, `axisBottom`即在容器内的下方创建, 数值我们传入之前创建的`x`和`y`变量。`ticks`可以用来根据给定数量的参数渲染坐标轴的分割。`tickFormat`即用来样式化坐标轴内容。

```jsx
const xAxis = axisBottom(x)
const yAxis = axisLeft(y)
  .ticks(5)
  .tickFormat(d => `${d} units`)
```

之后我们便可以在 svgRef 里面加入坐标轴如下。

```jsx
const xAxisGroup = selection
  .append('g')
  .attr(
    'transform',
    `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`
  )
  .call(xAxis)

const yAxisGroup = selection
  .append('g')
  .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
  .call(yAxis)
```

### Demo Code 代码

```jsx
import React, { useRef, useEffect, useState } from 'react'
import { select, selectAll, Selection } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { axisLeft, axisBottom } from 'd3-axis'

const data = [
  {
    name: 'Ford',
    number: 9000,
    color: '#03af94',
  },
  {
    name: 'Apple',
    number: 19000,
    color: 'red',
  },
  {
    name: 'Google',
    number: 5000,
    color: 'purple',
  },
  {
    name: 'Amazon',
    number: 23000,
    color: 'orange',
  },
  {
    name: 'BMW',
    number: 3200,
    color: 'blue',
  },
]

const dimensions = {
  width: 800,
  height: 500,
  chartWidth: 700,
  chartHeight: 400,
  marginLeft: 100,
}

export const App: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null | any>(null)
  const [selection, setSelection] = useState<null | Selection<
    any,
    unknown,
    null,
    undefined
  >>(null)

  const maxValue = max(data, d => d.number)
  const y = scaleLinear()
    .domain([0, maxValue!])
    .range([0, dimensions.chartHeight])
  const x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, dimensions.chartWidth])
    .paddingInner(0.05)

  const xAxis = axisBottom(x)
  const yAxis = axisLeft(y)
    .ticks(5)
    .tickFormat(d => `${d} units`)

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current))
    } else {
      const xAxisGroup = selection
        .append('g')
        .attr(
          'transform',
          `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`
        )

        .call(xAxis)

      const yAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .call(yAxis)

      selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft},0)`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', d => x(d.name)!)
        .attr('fill', d => d.color)
        .attr('height', d => y(d.number))
    }
  }, [selection])

  return (
    <div className="app-container">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
      ></svg>
    </div>
  )
}
```

## Update
