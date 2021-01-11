---
title: 7 Reverse Integer
date: 2021-01-10 20:34:10
tags: ["Leetcode", "Algorithm", "Easy", "Math"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 7 Reverse Integer

## 题目描述

Given a **32-bit** signed integer, reverse digits of an integer.

Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: `[−2^31, 2^31 − 1]`. For this problem, assume that your function returns `0` when the reversed integer overflows.

## 示例

### 示例 1:

```code
Input: x = 123
Output: 321
```

### 示例 2:

```code
Input: x = -123
Output: -321
```

### 示例 3:

```code
Input: x = 120
Output: 21
```

### 示例 4:

```code
Input: x = 0
Output: 0
```

## 条件约束:

- 2 <= nums.length <= 103
- -109 <= nums[i] <= 109
- 109 <= target <= 109
- **Only one valid answer exists**

## 思路

### 1. Math

我们可以用求余来获得整数中的最后一个数字。每次取余的同时也乘以 10。最后得到的即为反转的整数。需要注意的溢出问题。

```c++
class Solution {
public:
    int reverse(int x) {
        long long n = abs(x), res = 0;

        int rem = 0;
        while (n) {
            rem = n % 10;
            res = res*10 + rem;
            n /= 10;
        }

        if (x < 0) res = -res;
        if (res > INT_MAX || res < INT_MIN) return 0;

        return res;
    }
};
```

```
Time Complexity: O(n)
Space Complexity: O(n)
Runtime: 0 ms, faster than 100.00% of C++ online submissions for Two Sum.
Memory Usage: 6.3 MB, less than 81.66% of C++ online submissions for Two Sum.
```
