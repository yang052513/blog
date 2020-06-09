---
title: Sass Cheat Sheet
date: 2020-06-08 22:33:44
tags: ['Sass', 'css', 'note']
comments: false
categories: '笔记'
---

> 继 less 之后用的第二个 CSS preprocessor。主要记录了变量，嵌套，继承，函数以及计算相关的内容。

<!-- more -->

## Variables

```scss
$btnPrimaryColor: rgb(125, 125, 125);

header button {
  background-color: $btnPrimaryColor;
}

.contact button {
  background-color: $btnPrimaryColor;
}
```

## Nested

```scss
header {
  text-align: center;
  button {
    border: 1px solid black;
    &:hover {
      background: red;
    }
  }
  p {
    font-size: 14px;
  }
}
```

## Separate files

style.scss

```scss
@import './header';
@import './variable';
```

variable.scss

```scss
$btnPrimaryColor: rgb(125, 125, 125);
$btnSecondaryColor: rgb(100, 100, 100);
```

\_header.scss

```scss
header {
  text-align: center;
  button {
    border: 1px solid black;
    &:hover {
      background: red;
    }
  }
  p {
    font-size: 14px;
  }
}
```

## Mixed-In

```scss
/* can be placed in other files */
@mixin flexCenter($direction, $background) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
  background: $background;
}

header {
  @include flexCenter(column, rgb(100, 240, 222));
}
```

## Extends

\_header.scss

```scss
header {
  text-align: center;
  button {
    border: 1px solid black;
    &:hover {
      background: red;
    }
  }
  p {
    font-size: 14px;
  }
}
```

style.scss

```scss
@import "./header";

.contact {
    @extend header;
    /* overwrite */
    background: rgb(0, 0, 255)'
}
```

## Calculation

```scss
header {
  text-align: center;
  p {
    font-size: 100% - 20%;
  }
}
```
