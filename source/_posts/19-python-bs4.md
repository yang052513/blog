---
title: Python Crawler - BeautifulSoup
date: 2020-07-01 00:06:00
tags: ['python', 'web crawler', 'notes', 'python-crawler-series']
categories: Notes
cover: 'https://camo.githubusercontent.com/7f296c12bff3c6f017c3304b37d03f4b41172174/68747470733a2f2f7374617469632e64617461736369656e6365646f6a6f2e636f6d2f77702d636f6e74656e742f75706c6f6164732f507974686f6e42656175746966756c536f75702d30342e706e67'
---

> Life is short, use python

# BeautifulSoup Library

## Reformat HTML elements

We could using `request` library to get the HTML elements first and then use `BeautifulSoup` format the structures

```Python
import requests
from bs4 import BeautifulSoup

url = 'https://github.com/yang052513'

response = requests.get(url).text
html = BeautifulSoup(response, 'html.parser')

# copy to a new html file
with open('demo.html', 'w', encoding='utf-8') as file:
    file.write(str(html.prettify()))

```

## Element Tag Search and Find

```Python
# find the first p element and return as <p>some content</p>
html.p

# convert the first p element content to string as 'some content'
html.p.string

# return the first p element parent name, e.g. <div>
html.p.parent.name

# return the first p element parent content
html.p.parent.string

# return the first p element class name
html.p['class']

# find all the a tag element
html.find_all('a')

# find all the a tag element with id "selector_id"
html.find_all(id="selector_id")

# find all the img tag with class name "thumb_img"
html.find_all("img", {"class": "thumb_img"})

# get all the text from the html
html.get_text()
```
