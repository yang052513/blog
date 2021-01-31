---
title: 54. Spiral Matrix
date: 2021-01-15 14:14:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Matrix"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 54. Spiral Matrix

Given an `m x n` matrix, return all elements of the `matrix` in spiral order.

## Examples

### Example 1:

<img src="https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg" />

```code
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

### Example 2:

<img src="https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg" />

```code
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

## Constraints:

- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 10
- -100 <= matrix[i][j] <= 100

## Solutions

### Simulation

We could just simulate the spiral order while iterating the matrix. The key points are **checking boundaries** and **shrink rows and columns** by conditions.

We initialize four variables represents **4 sides of the matrix**: `top, right, bottom, left`. Everytime we move in one direction until we hit the boundary. Then we check if we the opposite sides overlap, more specifically `top > bottom` or `left > right`. Either case we break the loop.

For example 1, `top = 0, right = 2, bottom = 2, left = 0`. We start by **moving along** `top` side.

We push 1, 2, 3 to our result. Then we hit the `right` side. Before we move in `right` side, we need to shrink `top` and check if it is greater than `bottom`. Suppose we have a `1x3` matrix, there is only 1 row and stop after loop first row.

Doing the same process for all sides.

```c++
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        if (matrix.empty()) return {};

        vector<int> res;
        int r = matrix.size(), c = matrix[0].size();
        int top = 0, right = c-1, bottom = r-1, left = 0;

        while (true) {
            for (int i = left; i <= right; i++)
                res.push_back(matrix[top][i]);
            top++;
            if (top > bottom) break;

            for (int i = top; i <= bottom; i++)
                res.push_back(matrix[i][right]);
            right--;
            if (right < left) break;

            for (int i = right; i >= left; i--)
                res.push_back(matrix[bottom][i]);
            bottom--;
            if (bottom < top) break;

            for (int i = bottom; i <= top; i--)
                res.push_back(matrix[i][left]);
            left++;
            if (left > right) break;
        }

        return res;
    }
};
```
