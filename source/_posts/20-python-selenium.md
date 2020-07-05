---
title: Python爬虫之Selenium模拟浏览器操作
date: 2020-07-01 00:06:11
tags: ['python', 'web crawler', 'notes', 'python-crawler-series']
categories: Python爬虫
cover: 'https://miro.medium.com/proxy/1*HJpcblBvD8MpqAEZZXWVgg.png'
---

# Selenium

> 在之前静态网站的爬取中，request 库和 bs4 已经可以满足大多数需求。但有的时候我们想要爬取的站点时用 js 来动态加载的，比如有的要把页面拉到最下方才可以加载。那这时候我们可以利用 selenium 来模拟浏览器行为进行页面的爬取。不过 Selenium 的速度还是不行，毕竟要启动浏览器，加载头部图片等等。之后会学习别的技术来替代。按照官方的定义，selenium 是用来自动化测试，即我们也可以用来执行一些列任务。

## 设置

### 安装 Selenium

```shell
pip install selenium
```

### 下载浏览器驱动

Selenium 比较麻烦的地方就是配置驱动。我们安装`selenium`库后，还必须要驱动下载并设置为环境变量才可以在脚本中正确启动。Selenium 支持的浏览器驱动也比较全，包括的有 Firefox, Chrome, IE, Edge, Opera。需要注意的是驱动的版本要匹配你浏览器的版本，不然也会出问题。

下载完驱动后，我是把驱动直接放在 python 安装目录下，因为 python 已经设置了环境变量，所以就不需要单独设置浏览器驱动的环境变量路径了。

## 常用方法

### 操作浏览器

```python
from selenium import webdriver
from bs4 import BeautifulSoup

url = 'https://www.coquitlamcollege.com/programs-courses/university-transfer-program/class-timetable/'
browser = webdriver.Chrome()
browser.get(url)

# 前进浏览器记录
browser.forward()

# 后退浏览器记录
browser.back()

# 刷新浏览器
browser.refresh()
```

### 滑动页面

我们可以用`execute_script`方法来执行脚本命令。下面代码我们声明一个`js`变量，内容即滑动到 body 的底部。

```python
js = "var q=document.documentElement.scrollTop=document.body.scrollHeight"
browser.execute_script(js)
```

### 查找元素

我们同样可以用 Selenium 来查找元素，一般配合`get_attribute()`方法使用来获取元素的值。

```python
# 匹配第一个找到的原色
find_element_by_id
find_element_by_name
find_element_by_xpath
find_element_by_tag_name
find_element_by_class_name
find_element_by_css_selector

# 返回多个结果
find_elements_by_name
find_elements_by_xpath
find_elements_by_tag_name
find_elements_by_class_name
find_elements_by_css_selector

```

### input 的输入和递交

我们可以用`send_keys()`方法来执行键盘指令。

```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome()

url = 'https://www.roguecanada.ca/'

browser.get(url)
browser.implicitly_wait(5)

# 找到输入框元素
input_box = browser.find_element_by_id('site-search-input')
input_box.clear()

# 输入框输入内容
input_box.send_keys('kg plates')

# 回车
input_box.send_keys(Keys.ENTER)
```
