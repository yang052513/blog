---
title: Python 将数据存储到MongoDB
date: 2020-07-08 23:51:55
tags: ['python', 'mongoDB', 'database']
categories: Articles
cover: 'https://i.pcmag.com/imagery/reviews/02Q6yxveinggAu3PomearaV-7.fit_scale.size_1028x578.v_1569481734.jpg'
---

> 之前写的爬虫都是保存在本地的 JSON 文件在前端调用，但现在每次运行一次脚本替换以前的 JSON 文件不够灵活。于是来学习一下 MongoDB 数据库，来如何把 Python 爬到的数据存储到 Mongo 云端 Atlas。

## 安装 Setup

```shell
pip install pymongo
```

## 连接 Mongo 数据库 Connection

把`<password>`和`<dbname>`替换成相对应的 admin 密码和数据库名称。

```python
import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://yang_admin:<password>@cluster0-uo1ne.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority")
```

如果运行出现 connectional 问题时，安装以下库可以解决该问题。

```shell
pip install dnspython
python3 -m pip install pymongo[srv]
```

## 写入 Write

`cluster`相当于是所有数据库的集合，那在这个集合中我们可以有很多数据库。比如下面的这个例子我们想要写入数据到`courseflex`数据库。在一个数据库中，我们又有`collection`。collection 可以包括很多 documents。举个简单的例子，一个`user` collection 可以有很多用户的 document，比如用户 1，用户 2.

### 写入单个 document

假设我们现在要写入一些课程信息数据到`courseflex`数据库，可以利用`insert_one`或者`insert_many`。前者只能写入一个 document，后者可以批量写入多个 document

```python
import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://yang_admin:123mypw@cluster0-uo1ne.gcp.mongodb.net/courseflex?retryWrites=true&w=majority")

db = cluster['courseflex']
collection = db['course]

course_info = {
    "_id": 'ACCT 101A',
    "class": 'ACCT',
    "category": 'Accounting',
    "instructor": 'Yang Li'
}

cou
collection.insert_one(course_info)
```

> 如果写入的 document 不声明`_id`, Mongo 会自动生成一个`ObjectID`

### 写入多个 document

写入多个 document 只要在`insert_many()`方法中用`[]`包裹要写入的 document 即可

```python
department_col = db['department']

department_1 = {"title": 'ACCT'}
department_2 = {"title": 'ECON'}
department_3 = {"title": 'CHIN'}

department_col.insert_many([department_1, department_2, department_3])
```

## 查找 Find

### 遍历所有 document

之前的例子中我们写入了课程类别到`department` collection 中，要想遍历所有的 document 引用`find()`

```python
for info in department_col.find():
    print(info['title'])
```

### 查找相关 document

利用`find()`方法只需要给出查找领域的参数即可获得所有结果。

```python
# 保存所有结果到变量
results = department_col.find({"title": 'ECON'})

for department in results:
    print(department)
```

> 如果查找`_id`只会返回一个相关的 document

## 删除 Delete

删除和写入的写法相似，把`insert`换为`delete`即可，删除同样支持`delete_one`或者`delete_many`

删除`_id`为`ACCT 101A`的 document

```python
collection.delete_one({'_id': 'ACCT 101A'})
```

删除整个 collection 中的所有 document

```python
collecition.delete_many({})
```

## 更新 Update

利用 [update operators](https://docs.mongodb.com/manual/reference/operator/update/#id1) 来对相关 document 的值进行更改或添加

`$set` operator 可以在 document 上添加或设置一个新的值。

```python
# 更改现有的值
collection.update({"_id": 'ACCT 101A'}, {'$set':{'title': 'YOUR NEW TITLE'}})

# 添加新的值
collection.update({"_id": 'ACCT 101A'}, {'$set':{'schedule': 'M 08:30 to 10:30'}})
```

## 数量 Count

返回相关 collection 的 document 数量

```python
num_of_courses = collection.count_documents({})

num_of_acct = collection.count_documents({"category": "ACCT"})
```
