---
title: Python爬虫之Request库
date: 2020-06-23 16:37:13
tags: ['python', 'web crawler', 'notes']
categories: Python爬虫
cover: 'https://programmer.help/images/blog/a3fce23eb3fdd08341287253f42bb04f.jpg'
---

> Python 爬虫系列之如何使用`requests`库。教程参考 Real Python。

## 安装和导入 reuqest 库

```shell
pip install request
```

```python
import requests
```

## GET Request

HTTP 的请求方式有很多种，常见比如有 GET, POST, PUT 等等。不同的请求方式也想对应其所执行的动作。比如 GET 请求，我们一般可以用来请求 API 返回的数据。比如下面的代码我们对`wallpaperplay.com`发起 GET 请求。如果请求成功我们会得到`200`的代码即代表成功。

```Python
import requests
url = 'https://wallpaperplay.com/search?term=anime'
print(requests.get(url)) # <Response [200]>
```

### Status Code

其他的`Status Code`比较常见的有`404`, 即代表请求错误。更详细的 HTTP status code 可以参考[维基百科](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

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

### Content

当我们对一个服务器发起请求时，我们通常是希望能够返回一些我们需要的数据。

比如[这个壁纸网站](https://wallpaperplay.com/search?term=anime)展示了很多二次元的高清壁纸，我们的目标就是想要获得该网站的所有内容, 那我们可以用`.content`或者`.text`方法来获取所有响应内容。`.content`返回内容格式需要我们首先转化为`utf-8`编码格式。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-06-23%20170046.png?alt=media&token=fbb9f5bc-48f9-46fe-8a6f-6881e46ed47b" alt="cs" />

<br />

```python
import reuqests
url = 'https://wallpaperplay.com/search?term=anime'
response = requests.get(url)
print(response.text)
```

打印的结果为

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

### Headers

请求头可以返回响应内容的类型，我们在爬虫的时候更多的是伪造请求头/

`request.get()`第二个参数就可以接受一个`dict`类型的请求头。

```python
headers = {
    'User-Agent': 'Aweme 10.3.0 rv:103020 (iPhone; iOS 12.2; en_CA) Cronet',
    'Accept-Encoding': 'gzip, deflate, br',
    'Host': 'api3-core-c-lq.amemv.com',
    'Connection': 'keep-alive',
}

url = 'someurlyourequest'

response = requests.get(url, headers=headers).content

```
