---
title: 670. Maximum Seap
date: 2021-01-26 19:59:28
tags: ["Leetcode", "Algorithm", "Medium", "Math"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 670. Maximum Swap

Given a non-negative integer, you could swap two digits at most once to get the maximum valued number. Return the maximum valued number you could get.

## 示例

### 示例 1:

```code
Input: 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.
```

### 示例 2:

```code
Input: 9973
Output: 9973
Explanation: No swap.
```

## 提示:

- The given number is in the range **[0, 10<sup>8</sup>]**.

## Solutions

### 1. 暴力求解

根据题目描述, 我们需要通过调换两个数字的位置来使这个数字变为最大值, 且只能更换一次。

第一个思路为尽可能的替换**高位**的数字, 因为这有可能使得数字变得更大。

所以可以先把`num`转化为`string`从最高位开始遍历, 与当前索引后面的数字进行调换并对比. 如果能得到一个比原来输入数字更大的结果，我们可以更新`res`.

由于需要遍历每一位的可能性, 所以需要两个循环遍历所有可能替换的结果。

时间复杂度 **O(n<sup>2</sup>)**, 空间复杂度 **O(1)**

```c++
class Solution {
public:
    int maximumSwap(int num) {
        string s = to_string(num), res = s, temp;

        for (int i = 0; i < res.size()-1; i++) {
            for (int j = i+1; j < res.size(); j++) {
                temp = s;
                swap(temp[i], temp[j]);
                res = temp > res ? temp : res;
            }
        }
        return stoi(res);
    }
};
```
