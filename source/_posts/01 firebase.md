---
title: Firebase数据库的那些坑
date: 2020-05-23 18:49:19
tags: [firebase, database, web, firestore, cloudstorage]
comments: true
categories: "笔记"

# description: Firebase常用的一些语句。以后来抄也比较方便 (笑)
---

> 在BCIT firebase用的还是很多。firebase如果是做个人小的项目还是比较不错基于他的实时数据库。官方的文档比较片面，所以总结了一下平常用到的一些方法。以后抄也比较方便(笑)

# Firestore

## 更改文档的信息 Set

`set`每次都会对文档进行覆盖重新。比如以下代码，每次用户登录都会重写用户名为注册的用户名

```js
const db = firebase.firestore()
firebase.auth().onAuthStateChanged(user => {
    db.collection("user")
        .doc(user.uid)
        .set({
            //设置用户名和邮箱为注册时的内容
            name: user.displayName,
            email: user.email,
        }), {
            merge: true,
        })
})
```

<!-- more -->
## 更新文档的信息 Update

如果要更改单个文档内容可以用`update`

```js
db.collection("user").doc(user.uid).update({
    "Profile": profile_url,
    "Name": "Yang"
})
```

## 写入一个文档到用户 .add()

以下代码会写入一个文档(随机生成`uid`)到`Expense`的集合中，
```js
let docData = {
    Category: category
    Value: parseFloat(amount).toFixed(2),
    Date: date,
    Description: note
}

db.collection("user").doc(user.uid).collection("Expense").add(docData)
```

> 写入的时候要注意number会自动转化为string, 所以要先改格式`parseInt`再写入到对象里

## 实时读取 onSnapShot

### 单个文档侦查
`onSnapShot`可以实时侦查并返回数据库文档的内容

```js
db.collection("user").doc(user.uid).onSnapShot(snap => {
    if(snap.data().count > 5) {
        alert('超过5啦！')
    }
})
```

### 集合实时侦查 change.type
如果要实时侦查一个集合，需要添加判断条件`change.type`来判断是否文档是新添加的或者修改的。不然会一直循环（雾)

```js
db.collection("chatRoom").orderBy("Date", "desc").onSnapShot(snap => {
    snap.docChanges()
        .forEach(change => {
            if(change.type == "added") {
                console.log("对新添加的文档操作")   
            } else if (change.type == "modified") {
                console.log("对被修改过的文档操作")
            }
        })
})
```

## 读取一个集合中的所有文档 .get()

```js
db.collection("user").doc(user.uid).collection("Expenses")
    .orderBy("Date", "desc")
    .get()
    .then(query => {
        query.forEach(doc => {
            console.log(doc.data().Category)
        })
    })
```

## 删除一个集合中的所有文档

一般用来reset用户数据之类的

```js
db.collection("user").doc(user.uid).collection("Expense")
    .get()
    .then(querySnapShot => {
        querySnapShot.forEach(doc => {
            doc.ref.delete().then(() => {
                console.log("删除成功")
            }).catch(error => {
                console.log("错误", error)
            })
        })
    })
```

# Cloud Storage

Cloud storage可以用于用户上传头像，然后存储在firebase storage分区。

## 上传图片
```js
   const db = firebase.firestore()
    const storageRef = firebase.storage().ref()
    let file = $("#profile-input").prop("files")[0]
    if (file) {
      let metadata = {
        contentType: file.type,
      }

      let task = storageRef.child(file.name).put(file, metadata)
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log("用户头像上传成功 链接为: " + url)
          firebase.auth().onAuthStateChanged((user) => {
            db.collection("user").doc(user.uid).update({
              Profile: url,
            })
          })
          setLoading(false)
          setShow(true)
        })
    } else {
      setLoading(false)
      setError(true)
    }
  }
```