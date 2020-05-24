---
title: Most Commonly Code I Used In Firebase
date: 2020-05-23 18:49:19
tags: [Firebase, Database, Web Development]
description: Pretty sure will not use this database anymore after graduate. However, term 3 still has one course that use firebase. I think it's better to write some problems that I encountered during the development. 
---

# Real Time Database

## Write Data

Suppose we have a user collection and a number of documents under it. To write the data to our database, we could just do the following:

```js
db.collection("user").doc(user.uid).function(() => {
    
})
```