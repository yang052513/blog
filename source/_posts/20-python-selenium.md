---
title: Python Crawler - Selenium
date: 2020-07-01 00:06:11
tags: ['python', 'web crawler', 'notes']
categories: Notes
cover: 'https://miro.medium.com/proxy/1*HJpcblBvD8MpqAEZZXWVgg.png'
---

> Life is short, use python

# Selenium

> We can use requests and Beautiful to get most static site resource. However, many websites nowadays are using javascript and Ajax to dynamically loading the contents, which we need to introduce our selenium modules.

## Setup

### Install Selenium Library Using Pip

```shell
pip install selenium
```

### Download the Browser Driver

We need to download the browser driver in order to execute and manipulate actions in the browser. Selenium support many modern browser includes: Firefox, Chrome, IE, Edge, Opera. You can just type `Chrome Driver Web Driver` in google to download the respected driver.

Then we could just place the driver inside our python script folder because we have set `path` for python, so no need to set path for the driver by doing that.

## Get page source

```python
from selenium import webdriver
from bs4 import BeautifulSoup

url = 'https://www.coquitlamcollege.com/programs-courses/university-transfer-program/class-timetable/'
browser = webdriver.Chrome()
browser.get(url)

html = BeautifulSoup(browser.page_source, 'html.parser')

# then same as using bs4 before
```

### Manipulate the browser

```python
# Forward
browser.forward()

# Backward
browser.back()

# Refresh browser
browser.refresh()
```

### Scroll to the bottom of the page

```python
js = "var q=document.documentElement.scrollTop=document.body.scrollHeight"
browser.execute_script(js)
```

### Find by element

```python
# Find the first matched element
find_element_by_id
find_element_by_name
find_element_by_xpath
find_element_by_link_text
find_element_by_partial_link_text
find_element_by_tag_name
find_element_by_class_name
find_element_by_css_selector

# Find multiple elements, return as lists
find_elements_by_name
find_elements_by_xpath
find_elements_by_link_text
find_elements_by_partial_link_text
find_elements_by_tag_name
find_elements_by_class_name
find_elements_by_css_selector

```

### Fill input and submit

There are many keys and actions we could use, the example below just shows how to use selenium to type content in the input box and return the search page.

```python
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome()

url = 'https://www.roguecanada.ca/'

browser.get(url)
browser.implicitly_wait(5)

# Find the input field
input_box = browser.find_element_by_id('site-search-input')
input_box.clear()

# Type the search content
input_box.send_keys('kg plates')

# Manipulate enter
input_box.send_keys(Keys.ENTER)
```
