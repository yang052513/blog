---
title: 62. Unique Paths
date: 2021-01-17 11:37:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Dynamic Programming"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 62. Unique Paths

A robot is located at the top-left corner of a `m x n grid` (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

## Examples

### Example 1:

<img src="https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png" />

```code
Input: m = 3, n = 7
Output: 28
```

### Example 2:

```code
Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

### Example 3:

```code
Input: m = 7, n = 3
Output: 28
```

### Example 4:

```code
Input: m = 3, n = 3
Output: 6
```

## Constraints:

- **1 <= m, n <= 100**
- **It's guaranteed that the answer will be less than or equal to 2\*10<sup>9</sup>**.

## Solutions

### Dynamic Programming

This question is similar to [64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/). The difference is that we are looking for number of paths to reach **bottom right** position.

The algorithm is still same with `64. Minimum Path Sum`. We first create a matrix with size `m x n` and initialize all values to 0.

Then we initialize the **first column** and **first row** valus to 1. This is because any point on the first column and first row, there is only one way to reach to that point since we can only move **right** or **down**. For example, At row 0 column 4, we can only move along row 0 in order to get there.

Next we iterate all the points in the matrix and find all the possible paths to reach to current point. How to find number of paths? Well, the number of ways to reach that point equals its **previous column on same row** and **previous row on same column**. Every time we update that point and that point means all possible ways to reach to it. We are breaking the problem into smaller pieces(figure out number of paths to reach that point) and then build up.

Let's look at an example. Suppose we have `m = 3, n = 7`

```code
Initial
1   0   0   0   0   0   0
1   0   0   0   0   0   0
1   0   0   0   0   0   0
Now we have all possible paths for points on first column and row.

Now we iterate all points start from [1,1]

i = 1   j = 1
1   1   1   1   1   1   1
1   2   0   0   0   0   0
1   0   0   0   0   0   0
There is 1 way by moving right and 1 way by moving down to [1,1]. So 2 ways to reach [1,1]

i = 1   j = 2
1   1   1   1   1   1   1
1   2   3   0   0   0   0
1   0   0   0   0   0   0
There is 1 way by moving down and 2 ways by moving right to [1,2]. So 3 ways to reach [1,2]

....Same process to all other points

i = 2   j = 6
1   1   1   1   1   1   1
1   2   3   4   5   6   7
1   3   6   10  15  21  28
There are 21 ways by moving right and 7 ways moving down to bottom right. So total 28.
```

#### Code

```c++
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> matrix(m, vector<int>(n, 0));

        if (m == 1 && n == 1) return 1;

        for (int i = 1; i < n; i++)
            matrix[0][i]++;
        for (int i = 1; i < m; i++)
            matrix[i][0]++;

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++)
                matrix[i][j] += matrix[i-1][j] + matrix[i][j-1];
        }
        return matrix[m-1][n-1];
    }
};
```
