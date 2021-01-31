---
title: 240. Search a 2D Matrix II
date: 2021-01-23 22:13:26
tags:
  ["Leetcode", "Algorithm", "Medium", "Array", "Divide and Conquer", "Matrix"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 240. Search a 2D Matrix II

Write an efficient algorithm that searches for a `target` value in an `m x n` integer `matrix`. The `matrix` has the following properties:

- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

## Examples

### Example 1:

<img src="https://assets.leetcode.com/uploads/2020/11/24/searchgrid2.jpg" />

```code
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
```

### Example 2:

<img src="https://assets.leetcode.com/uploads/2020/11/24/searchgrid.jpg" />

```code
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false
```

## Constraint:

- m == matrix.length
- n == matrix[i].length
- 1 <= n, m <= 300
- -10<sup>9</sup> <= matix[i][j] <= 10<sup>9</sup>
- All the integers in each row are sorted in ascending order.
- All the integers in each column are sorted in ascending order.
- -10<sup>9</sup> <= target <= 10<sup>9</sup>

## Solutions

### Divide and Conquer

The idea is to use two pointers `i, j` for changing rows and columns, start at the `top right` point and shrink the range as we iterate the matrix.

Initially this point is the **largets element** in its row and it is also the **smallest element** in its column. Given this condition, we could compare the point with target

- If `target == matrix[i][j]`, then we return `true`.
- If `target < matrix[i][j]`, then we move to the fronter column.
- If `target > matrix[i][j]`, the we move on to next row.

For example 2, given `target = 20` and we start at `15`. 20 > 15 so it's definitely not on the first row so we move to the second row. 20 > 19 and we also move on to next row. At `22`, 20 < 22 so `20` may or may not on this row, we decrement `column` to check. At `16`, 20 > 16, we dont need to check anything in front of 16 because the row is sorted. At this point, we need to increment row. Now we are at `17`, and we increment row.

Finally we are at last row, and we stop at `18` because we reach to the end. We return `false`.

```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int row = 0, col = matrix[0].size()-1;

        while (row < matrix.size() && col >= 0) {
            if (target == matrix[row][col])
                return true;
            else if (target > matrix[row][col])
                row++;
            else col--;
        }
        return false;
    }
};
```
