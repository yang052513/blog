---
title: 9 Palindrome Number
date: 2021-01-10 20:34:10
tags: ["Leetcode", "Algorithm", "Easy", "Math"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 9 Palindrome Number

## 题目描述

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

Follow up: Could you solve it without converting the integer to a string?

## 示例

### 示例 1:

```code
Input: x = 121
Output: true
```

### 示例 2:

```code
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

### 示例 3:

```code
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

### 示例 4:

```code
Input: x = -101
Output: false
```

## 条件约束:

- -2^31 <= x <= 2^31 - 1\*

## 思路

### 1. Math

这道题和`7 Reverse Integer`基本相似，只需要反转后判断是否与原数字相等即可。负数因为`-`符号，所以可直接返回`false`.

```c++
class Solution {
public:
    bool isPalindrome(int x) {
        long long n = x, res = 0;

        if (x < 0) return false;

        int rem = 0;
        while (n) {
            rem = n % 10;
            res = res * 10 + rem;
            n /= 10;
        }

        return res == x;
    }
};
```

```
Time Complexity: O(n)
Space Complexity: O(n)
Runtime: 0 ms, faster than 100.00% of C++ online submissions for Two Sum.
Memory Usage: 6.3 MB, less than 81.66% of C++ online submissions for Two Sum.
```
