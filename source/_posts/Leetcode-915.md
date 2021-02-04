---
title: 915. Partition Array into Disjoint Intervals
date: 2021-02-03 12:31:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 915. Partition Array into Disjoint Intervals

Given an array `A`, partition it into two (contiguous) subarrays `left` and `right` so that:

- Every element in `left` is less than or equal to every element in `right`.
- `left` and `right` are non-empty.
- `left` has the smallest possible size.

Return the **length** of `left` after such a partitioning. It is guaranteed that such a partitioning exists.

## 示例

### 示例 1:

```code
Input: [5,0,3,8,6]
Output: 3
Explanation: left = [5,0,3], right = [8,6]
```

### 示例 2:

```code
Input: [1,1,1,0,6,12]
Output: 4
Explanation: left = [1,1,1,0], right = [6,12].
```

## 提示:

- **2 <= A.length <= 30000**
- **0 <= A[i] <= 10<sup>6</sup>**
- It is guaranteed there is at least one way to partition A as described.

## Solutions

### 双指针

题目要求把给定的数组分成两部分, 左边数组内的每一个元素要**小于等于右边的每一个元素**, 并且左边的数组长度要**尽可能地小**.

那第一个思路我们就可以初始化一个`curr_max`, 从数组第一个元素开始遍历并与`curr_max`对比, 如果`curr_max`大于当前元素, 那么这个元素只能包括在左边, 我们移动指针指向该元素。遍历直到当前元素大于`curr_max`, 那我们就找到左侧所有的数组了.

例如示例 1 `[5,0,3,8,6]`. 初始化 `curr_max`为第一个元素`5`, 以及`l`指针控制左侧数组的长度.

然后从索引 1 开始遍历, `0`小于`5`, 我们移动`l = 1`. `5`仍然是目前最大的所以不需要更新`curr_max`.

来到`3`对比`5`, 很明显`3`也需要在左侧的数组, 同时移动`l = 2`.

现在`5` < `8`. `8`不需要在左侧, `break`返回左侧长度即可.

这个例子看起来没什么问题, 但是我们忽略一个可能性, **8 的后面可能有比 5 更小的元素**. 上面的逻辑, 我们遇到元素大于`curr_max`就`break`循环, 但如果`8`后面的元素是`3`. 按照我们的逻辑我们最后得到 `[5, 0, 3]`和`[8,3]`. 很明显不满足题目**左边数组内的每一个元素都小于等于右边数组内的每一个元素**.

所以我们需要在上面的逻辑基础上加一个绝对`max`变量来**维护数组内最大的值**.

假设示例 1 为`[5,0,3,8,3,12]`.

之前逻辑相同, 当来到索引 3 为`8`时, 这时候`max = 8`维护当前遇到的最大值.

然后来到`3`， `curr_max = 5`大于`3`, 所以`3`也应该包括在左边. 注意题目要求**子数组**(元素相邻), 当我们把`3`包括在左边时, **8**也被包括在内了。这就是为什么要用一个单独变量来维护当前数组的最大值. 因为这个时候左边数组的最大值更新为`max`了。

左边数组为 `[5,0,3,8,3]`. 很明显现在要想满足条件需要数组右侧的所有元素大于**8**. 然后继续遍历完数组即可因为题目给定一定存在一个解.

```c++
class Solution {
public:
    int partitionDisjoint(vector<int>& A) {
        int l = 0, curr_max = A[0], max = A[0];

        for (int i = 1; i < A.size(); i++) {
            max = A[i] > max ? A[i] : max;
            if (curr_max > A[i]) {
                curr_max = max;
                l = i;
            }
        }
        return l+1;
    }
};
```
