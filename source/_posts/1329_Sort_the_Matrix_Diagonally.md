---
title: 1329. Sort the Matrix Diagonally
date: 2021-01-30 13:00:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1329. Sort the Matrix Diagonally

A **matrix diagonal** is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the **matrix diagonal** starting from `mat[2][0]`, where `mat` is a `6 x 3` matrix, includes cells `mat[2][0]`, `mat[3][1]`, and `mat[4][2]`.

Given an `m x n` matrix `mat` of integers, sort each **matrix diagonal** in ascending order and return the _resulting matrix_.

## 示例

### 示例 1:

<img src="https://assets.leetcode.com/uploads/2020/01/21/1482_example_1_2.png" />

```code
Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
```

### 示例 2:

```code
Input: mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]
Output: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]
```

## 提示:

- **m == mat.length**
- **n == mat[i].length**
- **1 <= m, n <= 100**
- **1 <= mat[i][j] <= 100**

## Solutions

### 排序

题目要求我们把数组中所有对角线的元素按升序排序.

很显然, 我们只需要拿到对角线的元素然后排序就可以了. 不过有 3 个问题需要解决:

1. 如何拿到对角线的元素?
2. 如何排序?
3. 如何把排序后的元素归类到正确的位置?

可以发现在同一条对角线上(从左上角开始的对角线), **下一个元素的行和列永远比上一个元素多 1**.

我们拿示例 1 图中的第一条对角线 `[3, 2, 1]`为例。

第一个点的坐标为`[0, 0]`. 若要在同一条对角线, 下一个点必然为`[1,1]`, 然后为`[2, 2]`.

再来看第二条对角线 `[3, 1, 2]`.

第一个点为`[0, 1]`, 同理推出后面的点为 `[1, 2]`, `[2, 3]`. 如果一直推, 可以得到 `[n, n+1]`.

可以发现同一条对角线上的点**行与列的差相等**, 因为每次沿着对角线移动, 坐标的行与列都同时递增 1, 所以差值不变.

运用这个规律, 我们解决了第一个问题. 我们可以用一个`map`来记录对角线差值为`键`. 每次遍历把当前坐标的元素保存到`map`中相对应的对角线.

然后遍历`map`排序每条对角线的数组. 这里我们按降序排序.

第三个问题其实和第一个问题相同, 只要再重新遍历一次矩阵, 从`map`中对角线拿最后一个元素即可(因为降序, 最后一个元素必然为最小的).

例如示例 1 `mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]`

```code
保存所有对角线的元素到map
0:  [3,2,1]
-1: [3,1,2]
-2: [1,2]
-3: [1]
1:  [2,1]
2:  [1]

排序每条对角线
0:  [3,2,1]
-1: [3,2,1]
-2: [2,1]
-3: [1]
1:  [2,1]
2:  [1]

归类到原矩阵即可
```

```c++
class Solution {
public:
    vector<vector<int>> diagonalSort(vector<vector<int>>& mat) {
        unordered_map<int, vector<int>> mp;
        int r = mat.size(), c = mat[0].size();

        for (int i = 0; i < r; i++)
            for (int j = 0; j < c; j++)
                mp[i-j].push_back(mat[i][j]);

        for (auto& k : mp)
            sort(k.second.rbegin(), k.second.rend());

        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                mat[i][j] = mp[i-j].back();
                mp[i-j].pop_back();
            }
        }
        return mat;
    }
};
```
