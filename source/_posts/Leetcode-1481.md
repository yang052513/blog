---
title: 1481. Least Number of Unique Integers after K Removals
date: 2021-02-06 11:15:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Lim

Given an array of integers `arr` and an integer `k`. Find the **least number of unique integers** after removing **exactly** `k` elements.

## 示例

### 示例 1:

```code
Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the single 4, only 5 is left.

```

### 示例 2:

```code
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.
```

## 提示:

- **1 <= arr.length <= 10<sup>5</sup>**
- **1 <= arr[i] <= 10<sup>9</sup>**
- **0 <= k <= arr.length**

## Solutions

### 排序

题目要求给定一个数组, 要求删除数组内`k`个元素并求**最少的独特元素的数量**.

例如示例 2 `[4,3,1,1,3,3,2] k = 3`, 删掉`4,2,1`后数组内还剩 `[1,3,3,3]`, 所以只剩**2 个独特的元素**也就是 1 和 3

我们可以理解为如何使数组内的独特的元素**越来越少**, 很明显我们需要把数组内元素**按出现次数从少到多依次删掉**直到`k = 0`.

所以我们可以用`map`先对每个元素计数并**按出现次数排序**.

然后依次遍历`map`中的元素, 如果当前元素出现次数**小于等于 k**, 则说明我们可以删掉该元素并把`k`减去该元素的出现次数.

同时我们用一个`cnt`来记录**删掉元素的个数**.

反之如果`k = 0`也就是不能删了, 或者`k`小于元素的出现次数, 也不能删掉该元素了.

这时候`map`的长度减去删掉的元素个数(`cnt`)就是最后剩余独特元素的个数.

```c++
class Solution {
public:
    int findLeastNumOfUniqueInts(vector<int>& arr, int k) {
        unordered_map<int, int> mp;

        for (int i : arr) {
            mp[i]++;
        }

        vector<pair<int, int>> v;
        for (auto& i : mp) {
            v.push_back(i);
        }

        sort(v.begin(), v.end(), [](const auto& l, const auto& r) {
           return l.second < r.second;
        });

        int cnt = 0;
        for(auto& i : v) {
            if (i.second <= k) {
                k -= i.second;
                cnt++;
            }
            if (k == 0 || k < i.second) {
                break;
            }
        }
        return v.size()-cnt;
    }
};
```
