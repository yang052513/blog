---
title: 63. Unique Paths II
date: 2021-01-17 11:37:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Dynamic Programming"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 63. Unique Paths II

A robot is located at the top-left corner of a `m x n` grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

Now consider if some obstacles are added to the grids. How many unique paths would there be?

An obstacle and space is marked as `1` and `0` respectively in the grid.

## Examples

### Example 1:

<img src="https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg" />

```code
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right

```

### Example 2:

```code
Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
```

## Constraints:

- **m == obstacleGrid.length**
- **n == obstacleGrid[i].length**
- **1 <= m, n <= 100**
- **obstacleGrid[i][j] is 0 or 1.\*.**

## Solutions

### Dynamic Programming

This question is a variation of 62. Unique Paths. Now there might have `obstacle` on our grid, which we cant go through.

However, the algorithm is still same. We use dynamic programming and everytime find each points maximum possible paths, but with added condition

We need to check if the current coordinates has obstacle, if so we skip. If not, we could just update the point equals to **the element on same row but previous column** and **the element on same column but previous row**. Since we initialize the matrix with all 0s.

In addition, we can first check if the origin is 1. If it's 1 then we can not do any move.

#### Code

```c++
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int r = obstacleGrid.size(), c = obstacleGrid[0].size();
        vector<vector<int>> matrix(r, vector<int>(c, 0));

        if (obstacleGrid[0][0] == 1) return 0;

        matrix[0][0] = 1;
        for (int i = 1; i < c; i++)
            if (obstacleGrid[0][i] != 1 && matrix[0][i-1] != 0)
                matrix[0][i] = 1;

        for (int i = 1; i < r; i++)
            if (obstacleGrid[i][0] != 1 && matrix[i-1][0] != 0)
                matrix[i][0] = 1;

        for (int i = 1; i < r; i++) {
            for (int j = 1; j < c; j++) {
                if (obstacleGrid[i][j] != 1)
                    matrix[i][j] = matrix[i-1][j] + matrix[i][j-1];
            }
        }
        return matrix[r-1][c-1];
    }
};
```
