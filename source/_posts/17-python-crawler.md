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
html = Beautiful(response, 'html.parser')

# copy to a new html file
with open('demo.html', 'w', encoding='utf-8') as file:
    file.write(str(html.prettify()))

print(source_code.prettify())
```
