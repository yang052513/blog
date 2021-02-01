---
title: 1471. The k Strongest Values in an Array
date: 2021-02-01 11:48:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1471. The k Strongest Values in an Array

Given an array of integers arr and an integer `k`.

A value `arr[i]` is said to be stronger than a value `arr[j]` if `|arr[i] - m| > |arr[j] - m|` where `m` is the **median** of the array.

If `|arr[i] - m| == |arr[j] - m|`, then `arr[i]` is said to be stronger than `arr[j]` if `arr[i] > arr[j]`.

Return a list of the strongest `k` values in the array. return the answer `in any arbitrary order`.

**Median** is the middle value in an ordered integer list. More formally, if the length of the list is n, the median is the element in position `((n - 1) / 2)` in the sorted list **(0-indexed)**.

- For `arr = [6, -3, 7, 2, 11], n = 5` and the median is obtained by sorting the array `arr = [-3, 2, 6, 7, 11]` and the median is `arr[m]` where `m = ((5 - 1) / 2) = 2`. The median is **6**.
- For `arr = [-7, 22, 17, 3], n = 4` and the median is obtained by sorting the array `arr = [-7, 3, 17, 22]` and the median is `arr[m]` where m = ((4 - 1) / 2) = 1. The median is **3**.

## 示例

### 示例 1:

```code
Input: arr = [1,2,3,4,5], k = 2
Output: [5,1]
Explanation: Median is 3, the elements of the array sorted by the strongest are [5,1,4,2,3]. The strongest 2 elements are [5, 1]. [1, 5] is also accepted answer.
Please note that although |5 - 3| == |1 - 3| but 5 is stronger than 1 because 5 > 1.
```

### 示例 2:

```code
Input: arr = [1,1,3,5,5], k = 2
Output: [5,5]
Explanation: Median is 3, the elements of the array sorted by the strongest are [5,5,1,1,3]. The strongest 2 elements are [5, 5].
```

### 示例 3:

```code
Input: arr = [6,7,11,7,6,8], k = 5
Output: [11,8,6,6,7]
Explanation: Median is 7, the elements of the array sorted by the strongest are [11,8,6,6,7,7].
Any permutation of [11,8,6,6,7] is accepted.
```

### 示例 4:

```code
Input: arr = [6,-3,7,2,11], k = 3
Output: [-3,11,2]
```

### 示例 5:

```code
Input: arr = [-7,22,17,3], k = 2
Output: [22,17]
```

## 提示:

- **1 <= arr.length <= 10<sup>5</sup>**
- **-10<sup>5</sup> <= arr[i] <= 10<sup>5</sup>**
- **1 <= k <= arr.length**

## 解题思路

### 排序

首先求出数组的`median`需要先对数组排序, 然后按元素减去中位数的绝对值排序即可. 如果出现相同的差值, 我们再按元素本身大小排序. 最后取数组内前`k`个元素.

如果`k`等于数组的长度, 我们可以直接返回数组本身因为题目对顺序没有要求.

```c++
class Solution {
public:
    vector<int> getStrongest(vector<int>& arr, int k) {
        if (k == arr.size()) return arr;

        sort(arr.begin(), arr.end());
        int len = arr.size()-1;
        int median = arr[len / 2];

        sort(arr.begin(), arr.end(), [median](const auto& l, const auto& r) {
            return abs(l-median) > abs(r-median)
                || abs(l-median) == abs(r-median) && l > r;
        });

        vector<int> res = vector<int>(arr.begin(), arr.begin()+k);

        return res;
    }
};
```
