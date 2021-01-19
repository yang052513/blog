---
title: 73. Set Matrix Zeroes
date: 2021-01-17 11:37:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Matrix"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 73. Set Matrix Zeroes

Given an `m x n` matrix. If an element is `0`, set its entire row and column to `0`. Do it `in-place`.

**Follow up:**

- A straight forward solution using `O(mn)` space is probably a bad idea.
- A simple improvement uses `O(m + n)` space, but still not the best solution.
- Could you devise a constant space solution?

## Examples

### Example 1:

<img src="https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg" />

```code
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
```

### Example 2:

<img src="https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg" />

```code
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

## Constraints:

- **m == grid.length**
- **n == grid[i].length**
- **1 <= m, n <= 200**
- **-2<sup>31</sup> <= matrix[i][j] <= 2<sup>31</sup>-1**

## Solutions

### Mark 0's Position

We will do 2 pass for iterating the matrix. The first pass we marked all the `rows` and `columns` if the element equals 0. Then the second pass we can just check if the element in our `rows` or `columns` list. If so, we marked to 0 else we keep it.

#### Code

```c++
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        unordered_set<int> row, col;

        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < matrix[0].size(); j++) {
                if (matrix[i][j] == 0) {
                    row.insert(i);
                    col.insert(j);
                }
            }
        }

        for (int i = 0; i < matrix.size(); i++) {
            for (int j = 0; j < matrix[0].size(); j++) {
                if (row.count(i) || col.count(j))
                    matrix[i][j] = 0;
            }
        }
    }
};
```
