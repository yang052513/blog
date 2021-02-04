---
title: 795. Number of Subarrays with Bounded Maximum
date: 2021-02-03 14:55:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 795. Number of Subarrays with Bounded Maximum

We are given an array `A` of positive integers, and two positive integers L and R (`L <= R`).

Return the number of (contiguous, non-empty) subarrays such that the value of the maximum array element in that subarray is at least `L` and at most `R`.

## 示例

### 示例 1:

```code
Example :
Input:
A = [2, 1, 4, 3]
L = 2
R = 3
Output: 3
Explanation: There are three subarrays that meet the requirements: [2], [2, 1], [3].
```

## 提示:

- **L, R and A[i] will be an integer in the range [0, 10<sup>9</sup>]**.
- **The length of A will be in the range of [1, 50000]**.

## Solutions

### 双指针

题目给定一个数组, 要求返回子数组的数量满足**子数组中的最大值在给定 L, R 的范围内(闭区间)**.

我们先来分析几种情况:

1. 如果当前元素在给定`L`与`R`的范围 (`L <= A[i] <= R`).

这种情况该元素左边的子数组都可以满足条件. 例如 `[1,1,1,2] L = 2, R = 3`, 2 左边的子数组`[1,1,1,2], [1,1,2], [1,2], [2]`都为有效的子数组. 子数组的数量也就是**当前元素的索引减去最左边的索引再加 1**, 也就是 2 可能的子数组数量. 所以这个情况我们只要有`l`**左指针**的位置就可以求出.

2. 如果当前元素小于`L`.

例如 `[2, 1, 1] L = 2 R = 3`. 这种情况 1 自身的子数组肯定不满足条件, 那就要看有没有满足条件的元素能够与这 2 个`1`组成子数组.

3. 如果当前元素大于`R`.

这种情况该元素左边已经没有满足题目条件的子数组. 只需要考虑该元素右边即可.

从上面 3 种情况来看, 我们可以用双指针来控制**有效子数组的范围**并用指针的**索引**来计数有效子数组的数量.

我们来推演一个示例 `[2, 1, 4, 3, 1, 1, 2] L = 2, R = 3`.

首先初始化双指针`l`, `r`起始为 0.

索引 0 为 2 时, `2 <= 2 <= 3`满足 L 和 R 的范围, 但`l = 0`左边没有其他元素, 所以有效的子数组只有`2`本身, 也就是 `i-l+1`. **同时把 r 指针移至`i+1`位置**. 因为后面的元素只要小于`R`就能与 2 构成有效子数组.

```code
0   1   2   3   4   index
2   1   1   4   3   value
    r
l
```

然后来到 1, `1 < L`. 1 自身的子数组`[1]`不满足条件, 我们只能看左边是否有`[L, R]`范围内的元素能与`1`构成子数组. 因为`l`指向的是满足`[L, R]`的元素的下一个索引. 所以`r-l`就是能够构成子数组的数量. 注意`r-l-1`计算的是**包括当前元素自身的子数组数量**. 但当前元素小于 L, 它自身是不满足的. 另外`r-l`需要与 0 对比返回最大值. 因为`r`可能在`l`的左侧.

在索引 2 仍然为`1`. 但是`[2,1,1]`满足有效子数组.

到`4`的时候, `4`已经超过了`R`的范围, 也就是说`4`左边已经没有子数组可以满足题目条件. 现在我们需要把`l`移动至`4`的下一个索引.

```code
0   1   2   3   4   index
2   1   1   4   3   value
    r
                l
```

最后一个元素`3`, `3`在 L 与 R 的范围内, 由于之前的`4`, `3`已经不能与前面的元素组成子数组, 所以有效的子数组只有`i-l+1`也就是`[3]`自身.

最后更新`r = i+1`.

```c++
class Solution {
public:
    int numSubarrayBoundedMax(vector<int>& A, int L, int R) {
        int res = 0;
        int l = 0;
        int r = 0;

        for (int i = 0; i < A.size(); i++) {
            if (A[i] >= L && A[i] <= R) {
                res += i-l+1;
                r = i+1;
            } else if (A[i] < L) {
                res += max(0, r-l);
            } else {
                l = i+1;
            }
        }
        return res;
    }
};
```
