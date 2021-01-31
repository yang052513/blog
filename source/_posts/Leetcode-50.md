---
title: 50. Pow(x,n)
date: 2021-01-14 23:51:24
tags: ["Leetcode", "Algorithm", "Medium", "Math"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 50. Pow(x, n)

Implement pow(x, n), which calculates x raised to the power n (i.e. x^n).

## Examples

### Example 1:

```code
Input: x = 2.00000, n = 10
Output: 1024.00000
```

### Example 2:

```code
Input: x = 2.10000, n = 3
Output: 9.26100
```

### Example 3:

```code
Input: x = 2.00000, n = -2
Output: 0.25000
```

## Constraints:

- **-100.0 < x < 100.0**
- **-2<sup>31</sup> <= n <= 2<sup>31</sup>-1**
- **-10<sup>4</sup> <= x<sup>n</sup> <= 10<sup>4</sup>**

## Solutions

The most straight forward approach is that we start from 1 to n, and every time we multiply `res` to `x`. However, the constraints indicates that **n <= -2<sup>31</sup>**, and if `n = INT_MIN` then we might exceed time limit.

A better approach is to use [exponentiation operation](https://en.wikipedia.org/wiki/Exponentiation). For example 1, we have `x = 3` and `n = 10`. We can take `n` as a binary digits which equals to `1010`. From left to right:

**x<sup>10</sup> = x<sup>8</sup> \* x<sup>2</sup>**

Thus, we can iterate `n`, and we mulitply `x` to `res` if the current bit is 1. We also need to multiply `x` to it self to move on to next position.

### 1. Math

```c++
class Solution {
public:
    double myPow(double x, int n) {
        double res = 1.0;

        while (n) {
            if (n % 2 != 0)
                res = n > 0 ? res*x : res/x;
            x *= x;
            n /= 2;
        }

        return res;
    }
}
```
