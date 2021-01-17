---
title: 64. Minimum Path Sum
date: 2021-01-17 11:37:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Dynamic Programming"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 64. Minimum Path Sum

Given a `m x n grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

**Note**: You can only move either down or right at any point in time.

## Examples

### Example 1:

<img src="https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg" />

```code
Input: n = 3
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
```

### Example 2:

```code
Input: grid = [[1,2,3],[4,5,6]]
Output: 12
```

## Constraints:

- **m == grid.length**
- **n == grid[i].length**
- **1 <= m, n <= 200**
- **0 <= grid[i][j] <= 100**

## Solutions

### Dynamic Programming

The question is asking us to find a path from **top left** to **bottom right**, which has the **minimum path** compared to other paths. We can move **down** or **right** at any point. For question like that, we can use dynamic programming that we break up the problem into smaller pieces.

For example, given grid `[[1,2,3],[4,5,6]]` like image above. From point 5 at `[1,1]`, should we go right or bottom? We know that if we want reach 5 we have 2 paths

1. 1 -> 3 -> 5
2. 1 -> 1 -> 5

Obviously the second path is shorter. Thus, we could marked `5` as `7` now because **the minimum path** to reach `5` is `7`. Let's look at another example `4`. There is only one path that can reach to `4` that is `1 -> 1 -> 4` and the path sum is 6. Why? The reason is because for the **initial row**(1,3,1) and **initial column**, all the points are along the **same direction**, and the question said we **can only move right and down**. Therefore, we could just do the `prefix sum` process for **column 1** and **row 1**.

Then we could just iterate all the points in the matrix, and update it to the minimum sum to reach that point.(like we did point 5). Once we are at bottom right point, the point will be the minimum path to reach to it. Detailed process below.

```code
Initial         Initial col and row
1   3   1       1   4   5
1   5   1       2   5   1
4   2   1       6   2   1

Now we iterate all the points start from [1,1], and
compare that point with its top and left (because we can
only move down and right)

i = 1 j = 1
1   4   5
2   [8] 1
6   2   1
2 is shorter than 4, the minimum to [1,1] is 1->1->5

i = 1 j = 2
1   4   5
2   8   [6]
6   2   1
5 is shorter than 8, the minimum to [1,2] is 1->3->1->1

i = 2 j = 1
1   4   5
2   8   6
6   [8] 1
6 is shorter than 8, the minimum to [2,1] is 1->1->4->2

i = 2 j = 2
1   4   5
2   8   6
6   8   [7]
6 is shorter than 8, the minimum to bottom right is 1->3->1->1->1 with 7.
```

#### Code

```c++
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        // init row
        for (int i = 1; i < grid[0].size(); i++)
            grid[0][i] += grid[0][i-1];

        // init col
        for(int i = 1;i < grid.size(); i++)
            grid[i][0] += grid[i-1][0];

        // find min of right and down for each point
        for (int i = 1; i < grid.size(); i++) {
            for (int j = 1; j < grid[i].size(); j++) {
                grid[i][j] += min(grid[i][j-1], grid[i-1][j]);
            }
        }

        // return the end point
        return grid[grid.size()-1][grid[0].size()-1];
    }
};
```
