---
title: 59. Spiral Matrix II
date: 2021-01-14 23:53:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Matrix", "Simulation"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 59. Spiral Matrix II

Given a positive integer **n**, generate an **n x n** matrix filled with elements from **1 to n<sup>2</sup>** in spiral order.

## Examples

### Example 1:

<img src="https://assets.leetcode.com/uploads/2020/11/13/spiraln.jpg" />

```code
Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
```

### Example 2:

```code
Input: n = 1
Output: [[1]]
```

## Constraints:

- **1 <= n <= 20**

## Solutions

### Simulation

This question is the variation of [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) and pretty much same implementation. We use `top`, `right`, `left`, and `bottom` to control 4 sides and simulate the spiral behavior.

The only difference compare to `54. Spiral Matrix` is that the matrix is `n x n` and filled with integers from 1 to n<sup>2</sup>. Thus, we can just loop until `num < n` and no need to check if sides are overlap.

```c++
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> res(n, vector<int>(n, 0));
        int num = 0;
        int top = 0, right = n-1, left = 0, bottom = n-1;

        while (num < n*n) {
            for (int i = left; i <= right; i++)
                res[top][i] = ++num;
            top++;

            for (int i = top; i <= bottom; i++)
                res[i][right] = ++num;
            right--;

            for (int i = right; i >= left; i--)
                res[bottom][i] = ++num;
            bottom--;

            for (int i = bottom; i >= top; i--)
                res[i][left] = ++num;
            left++;
        }
        return res;
    }
};
```
