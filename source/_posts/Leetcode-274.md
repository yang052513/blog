---
title: 274. H-Index
date: 2021-02-04 19:02:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 274. H-Index

Given an array of citations (each citation is a non-negative integer) of a researcher, write a function to compute the researcher's h-index.

According to the `definition of h-index on Wikipedia`: "A scientist has index h if h of his/her N papers have **at least** h citations each, and the other N − h papers have **no more than** h citations each."

## 示例

### 示例 1:

```code
Input: citations = [3,0,6,1,5]
Output: 3
Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had
             received 3, 0, 6, 1, 5 citations respectively.
             Since the researcher has 3 papers with at least 3 citations each and the remaining
             two with no more than 3 citations each, her h-index is 3.
```

## 解题思路

### 排序

这个题目的关键应该是理解`H`指数的定义. 例如示例 1 `[3, 0, 6, 1, 5]` 的`H`指数为`3`, 也就是说这个人**发表的所有论文中至少有`3`篇论文被引用了`3`次以上**.

我们可以按论文的**引用量排序**, 用一个变量`index`来记录论文的数量, 然后从引用量最高的论文遍历.

如果当前论文的引用次数大于`index`, 则说明至少有`index`篇文章被引用了`index`次, 这里举个例子比较值观.

例如示例 1 `[3, 0, 6, 1, 5]`.

排序后得到 `[0, 1, 3, 5, 6]`. 初始化 `index = 0`.

从后往前遍历 `6 > 0`. 则至少有 1 篇文章被引用了 1 次, `index = 1`.

`5 > 1`. 当前的论文被引用了**5 次**. `5`和`6`这两篇论文都被**引用超过了 2 次以上**. `index = 2`.

`3 > 2`. 同理现在`index = 3`因为`5, 6, 3`这 3 篇论文都被引用了`3`次以上.

`1 < 3`. 当前的论文**只被引用了 1 次**. 前面也不需要遍历了因为前面的元素越来越小. 所以不会出现引用超过 3 次的论文. 该数组的`H`指数为 3.

```c++
class Solution {
public:
    int hIndex(vector<int>& citations) {
        int res = 0;

        sort(citations.rbegin(), citations.rend());
        for (int i = 0; i < citations.size(); i++) {
            if (citations[i] > res) {
                res++;
            } else {
                break;
            }
        }
        return res;
    }
};
```
