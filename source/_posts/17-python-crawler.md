---
title: Some Python Crawler Notes
date: 2020-06-23 16:37:13
tags: ['python', 'web crawler', 'notes']
categories: Notes
cover: 'https://dynomapper.com/images/website_crawlers_banner.jpg'
---

> Life is short, use python

# requests Library

## GET Request

We know in HTTP there are GET, POST, HEAD, PUT... and other methods which respect to the request message we want. `request` library also has the releated method for us to make request. The most commonly used is `GET` method. The `GET` method allows us to retrieve data from the specific url.

```Python
import requests
url = 'https://wallpaperplay.com/search?term=anime'
print(requests.get(url))
```

The code above will print `<Response [200]>` in the console which means requests success.

## Status Code

In the previous section, our program returned `<Response [200]>`. `200` is a status code means status `OK` which our request was successful, you might seen `404 Not Found page` sometime. For a complete reference of HTTP status code, you can check out the [wiki link here](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

To catch error when we make requests

```Python
import requests
url = 'https://wallpaperplay.com/search?term=anime'
response = requests.get(url)
status = response.status_code

if status:
    # ... do something
    print('Request successfully')
else:
    print('Request failed')
```

## Content

When we make request to a server, we usually want to have something returned back. In our cases, we want to return the content of the HTML elements.

For example, [this webiste](https://wallpaperplay.com/search?term=anime) dispalys a series of anime wallpapers.

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-06-23%20170046.png?alt=media&token=fbb9f5bc-48f9-46fe-8a6f-6881e46ed47b" alt="cs" />

`response.text` will convert the response content to string. We will get the following output。

> `response.content` will return the response content in raw bytes

```python
import reuqests
url = 'https://wallpaperplay.com/search?term=anime'
response = requests.get(url)
print(response.text)
```

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <title>Search result for anime</title>
    <meta name="description" content="">
            <link rel="shortcut icon" type="image/ico" href="/favicon.ico"/>
    <meta name="csrf-token" content="SdGboAl48dNsvQhX9xAvY8oYzsDcReXqweWUNyrT">
    <link href="https://fonts.googleapis.com/css?family=Lobster|Roboto"
          rel="stylesheet">

    <!-- ...... More ......-->
```

## Headers .headers

The header response will give us the infomation of the server header which we could access

```Python
import requests
url = 'https://wallpaperplay.com/search?term=anime'
response = requests.get(url)

print(response.headers)

print(response.headers['Content-Type']) # text/html; charset=UTF-8
```

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
