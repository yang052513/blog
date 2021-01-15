---
title: 48. Rotate Image
date: 2021-01-15 11:14:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Matrix", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 48. Rotate Image

You are given an n x n 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT allocate another 2D matrix and do the rotation**.

## Examples

### Example 1:

<img src="https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg" />

```code
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

### Example 2:

```code
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

### Example 3:

```code
Input: matrix = [[1]]
Output: [[1]]
```

### Example 4:

```code
Input: matrix = [[1,2],[3,4]]
Output: [[3,1],[4,2]]
```

## Constraints:

- matrix.length == n
- matrix[i].length == n
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000

## Solutions

### 1. Transpose + Reverse Matrix

Since the question requires us to rotate `in-place`, we need to think about how to process the matrix to get the desired result.

The approach is to first [transpose the matrix](https://en.wikipedia.org/wiki/Transpose) and then reverse each rows for the matrix. Transpose matrix means that all the rows in the matrix become columns, and all the columns in the matrix become rows.

For our `example 1 picture`, the first row `1 2 3` will become the **first column** and the first column `1 4 7` will become the **first row**. So after the transpose the matrix will looks like below.

```code
1 4 7
2 5 8
3 6 9
```

Then we just need to reverse each row will get the rotated results.

```c++
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int len = matrix.size();

        // transpose matrix -> rows->cols, cols->rows
        for (int i = 0; i < len; i++) {
            for (int j = i+1; j < len; j++)
                swap(matrix[i][j], matrix[j][i]);
        }

        // reverse matrix
        for (int i = 0; i < len; i++) {
            int l = 0, r = len-1;
            while (l < r) {
                swap(matrix[i][l], matrix[i][r]);
                l++; r--;
            }
        }
    }
};
```
