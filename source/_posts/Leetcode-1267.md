---
title: 1267. Count Servers that Communicate
date: 2021-02-01 22:50:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Matrix"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1267. Count Servers that Communicate

You are given a map of a server center, represented as a `m * n` integer matrix `grid`, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.

Return the number of servers that communicate with any other server.

## 示例

### 示例 1:

<img src= "https://assets.leetcode.com/uploads/2019/11/14/untitled-diagram-6.jpg" />

```code
Input: grid = [[1,0],[0,1]]
Output: 0
Explanation: No servers can communicate with others.
```

### 示例 2:

<img src = "https://assets.leetcode.com/uploads/2019/11/13/untitled-diagram-4.jpg" />

```code
Input: grid = [[1,0],[1,1]]
Output: 3
Explanation: All three servers can communicate with at least one other server.
```

### 示例 3:

<img src = "https://assets.leetcode.com/uploads/2019/11/14/untitled-diagram-1-3.jpg" />

```code
Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
Output: 4
Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can't communicate with any other server.
```

## 提示:

- m == grid.length
- n == grid[i].length
- 1 <= m <= 250
- 1 <= n <= 250
- grid[i][j] == 0 or 1

## 解题思路

### 计数

首先找到矩阵中所有的`servers`并将其**行**与**列**保存在相对应的数组中. 题目指出**任意两台服务器**只要在相同的列或行就可以进行交流, 也就是说服务器不需要相邻只要在同一行或同一列就可以.

因此第二次遍历如果当前的点是服务器, 只要在判断该行或该列是否**存在别的服务器**(服务器数量是否大于 1), 如果有别的服务器则满足条件算入结果集.

```c++
class Solution {
public:
    int countServers(vector<vector<int>>& grid) {
        int r = grid.size(), c = grid[0].size();
        vector<int> row(r, 0), col(c, 0);

        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (grid[i][j] == 1) {
                    row[i]++;
                    col[j]++;
                }
            }
        }

        int res = 0;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (grid[i][j] == 1 && (row[i] > 1 || col[j] > 1)) {
                    res++;
                }
            }
        }
        return res;
    }
};
```
