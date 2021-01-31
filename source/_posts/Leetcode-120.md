---
title: 120. Triangle
date: 2021-01-30 12:30:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Dynamic Programming"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 120. Triangle

Given a `triangle` array, return the _minimum path sum from top to bottom_.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index `i` on the current row, you may move to either index `i` or index `i + 1` **on the next row**.

Follow up: Could you do this using only `O(n)` extra space, where n is the total number of rows in the triangle?

## 示例

### 示例 1:

```code
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
```

### 示例 2:

```code
Input: triangle = [[-10]]
Output: -10
```

## 提示:

- **1 <= triangle.length <= 200**
- **triangle[0].length == 1**
- **triangle[i].length == triangle[i - 1].length + 1**
- **-10<sup>4</sup> <= triangle[i][j] <= 10<sup>4</sup>**

## Solutions

### 动态规划 自下而上

但凡题目涉及到求最小, 求最大..等求最优解, 一般我们考虑用动态规划的思路, 尝试如何把这个问题分解成若干个小问题并逐步解决.

题目要求我们找到**从上到下最短的路径总和**. 我们每一步可以移动到**下一行**的`i`或者`i+1`索引处. 比如示例 1 当我们在第 2 行, i = 0 的位置. 这个时候我们只能移动到第三行的 0 或者 1 的索引位置. 所以每一步可选的索引取决于当前行的索引.

一开始我是用了 2 Pass 正反走一次每次都走选最小的点, 然而这个方法忽略了其他点的可能性. 比如示例 1 第二行我们选择 3,那下一次就只能从第三行的 6 或 5 中选择, 但是 4 的下一行当前索引可能是`-30`. 所以我们错过了最优解. 因此我们需要判断每个点的最优解.

如何判断每个点的最优解呢? 我们可以从下往上走. 因为下层点的最优解**取决于上一层同索引和上一层下一个索引**的最小值. 比如示例 1 第 3 行在索引 0 的位置 6, 6 下一次只能选择`4`或者`1`. 我们每次都取最小的并更新为其和得到`7`. 最后到终点必然为最小路径.

> 我们从倒数第二行开始遍历, 因为最后一行已经为最优 (所有最短路径即自身)

```code
   2
  3 4
 6 5 7
4 1 8 3     6取决于4和1的最小值 -> 6+1 = 7
^ ^

   2
  3 4
 7 5 7
4 1 8 3     5取决于1和8的最小值 -> 5+1 = 6
  ^ ^

   2
  3 4
 7 6 7
4 1 8 3     7取决于8和3的最小值 -> 7+3 = 10
    ^ ^

....同理最终得到

   11 ------> 最短路径
  9 10
 7 6 10
4 1 8 3
```

```c++
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        for (int i = triangle.size()-2; i >=0; i--) {
            for (int j = 0; j < triangle[i].size(); j++) {
                triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1]);
            }
        }
    }
    return triangle[0][0];
};
```
