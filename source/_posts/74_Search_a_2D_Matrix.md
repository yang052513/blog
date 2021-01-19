---
title: 74. Search a 2D Matrix
date: 2021-01-17 11:37:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Binary Search", "Matrix"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 74. Search a 2D Matrix

Write an efficient algorithm that searches for a value in an `m x n` matrix. This matrix has the following properties:

- Integers in each row are sorted from left to right.
- The first integer of each row is greater than the last integer of the previous row.

## Examples

### Example 1:

```code
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

### Example 2:

```code
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
```

## Constraints:

- **m == grid.length**
- **n == grid[i].length**
- **1 <= m, n <= 100**
- **-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup>**

## Solutions

### Binary Search

Rather than search in an 1D array, the difference to search in a matrix is to find the valid **rows**. Once we figure out which rows should the `target` located, we can then do another search in that row.

The algorithm is still same with normal binary search. The question said all elements in each row are **sorted** and the first element of each row is greater than last integer of previous row. This makes the question a lot of easier.

We first find the rows that the target should locate by checking condition

- matrix[m][0] <= target <= matrix[m].back()

If the condition satisfy then we just need to search in this row. If not we can just narrow the range like we normally do.

Then in this row we can do normal binary search, and if not find the target return false.

#### Code

```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int row = matrix.size();
        int col = matrix[0].size();

        int l = 0, r = row-1, m;
        while (l <= r) {
            m = l + (r-l)/2;
            if (target >= matrix[m][0] && target <= matrix[m][col-1]) {
                int _l = 0, _r = col-1, _m;
                while (_l <= _r) {
                    _m = _l + (_r-_l)/2;
                    if (target == matrix[m][_m])
                        return true;
                    else if (target > matrix[m][_m])
                        _l = _m+1;
                    else _r = _m-1;
                }
                return false;
            }
            else if (target < matrix[m][0])
                r = m-1;
            else l = m+1;
        }

        return false;
    }
};
```
