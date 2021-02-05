---
title: 300. Longest Increasing Subsequence
date: 2021-02-04 19:12:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Dynamic Programming"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 300. Longest Increasing Subsequence

Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

A **subsequence** is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, `[3,6,2,7]` is a subsequence of the array `[0,3,1,6,2,2,7]`.

## 示例

### 示例 1:

```code
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
```

### 示例 2:

```code
Input: nums = [0,1,0,3,2,3]
Output: 4
```

### 示例 3:

```code
Input: nums = [7,7,7,7,7,7,7]
Output: 1
```

## 解题思路

### 动态规划

**子序列**并不要求元素互相相邻, 一般子序列求最优解的题目首先考虑动态规划. 动态规划就要试着把问题缩小化对每个小问题做最优处理.

假设我们现在数组有 3 个元素 `[1, 5, 3]`. 在索引 0 之前没有元素。

在索引 1 之前小于`5`的元素有 1 个也就是`1`. 所以在索引 1 能构成的最长递增子序列长度为 2.

在索引 3 之前小于`3`的元素只有`1`, 所以 索引 3 的最优解也是 2

所以我们的思路如下:

依次遍历给定数组中的所有元素`nums[i]`, 然后依次遍历该元素之前的元素`nums[j]`看是否有 `nums[j] < nums[i]`.

如果有`nums[j] < nums[i]`, 则对比`nums[j]+1` 与 `nums[i]`取较大的.

下面我们再推演示例 1 的数组 `[10, 9, 2, 5, 3, 7, 101, 18]`.

首先初始化`dp`数组且数组内的元素都为`1` (因为最坏情况元素自身也是子序列).

`i = 0, nums[0] = 10`, 索引 0 的最长子序列也只能是自身, `dp[0] = 1`.

`i = 1, nums[1] = 9`, 现在我们再从头遍历数组, 但是`9`之前没有元素小于`9`, 所有`dp[1] = 1`

`i = 2, nums[2] = 2`, `dp[2] = 2`.

`i = 3, nums[3] = 5`, 遍历中`2 < 5`, 此时 5 的最优解为`1`也就是自身, 但是`2`与`5`可以构成递增子序列, 所以`5`的最优解 **`2`的最优解加 1**.

同理一直遍历完数组即可

```c++
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> dp(nums.size(), 1);
        int res = 0;

        for (int i = 0; i < nums.size(); i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = max(dp[i], dp[j]+1);
                    res = max(res, dp[i]);
                }
            }
        }
        return res;
    }
};
```
