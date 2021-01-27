---
title: 713. Subarray Product Less Than K
date: 2021-01-26 22:14:28
tags: ["Leetcode", "Algorithm", "Medium", "Sliding Window", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 713. Subarray Product Less Than K

Your are given an array of positive integers `nums`.

Count and print the number of (contiguous) subarrays where the product of all the elements in the subarray is less than `k`.

## 示例

### 示例 1:

```code
Input: nums = [10, 5, 2, 6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are: [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6].
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
```

## 提示:

- **0 < nums.length <= 50000**.
- **0 < nums[i] < 1000**.
- **0 <= k < 10<sup>6</sup>**.

## Solutions

### 1. 滑动窗口 + 双指针

题目要求我们找到给定数组`num`内所有的`subarray`, 其`subarray`的累计乘积**小于** `k`.

一般数组子数组的问题我们都可以考虑是否能用滑动窗口或者双指针解决。根据题目提示, `nums[i]`为非 0 正整数, 这个条件就把难度降低了很多因为不用考虑负数和 0 的情况。

因此我们可以用`prod`来记录至当前元素的累计乘积, 每次遍历`prod *= nums[i]`. 如果`prod >= k`, 我们继续往后遍历`prod`也只会越来越大 (因为数组内的元素 > 0). 所以这个时候我们需要除去元素, 也就是指针指向的索引。

其实这道题的难点在于理解 `i-j+1`, 也就是如何计算有多少个子数组? 我们可以看下面这个例子:

假设`nums = [4, 5, 2, 2, 9], k = 100`.

```code
i       prod        condition       j       number of subarr        generated subarray
0       4           4 < 100         0       0-0+1 = 1               [4]
1       20          20 < 100        0       1-0+1 = 2               [5], [5, 4]
2       40          40 < 100        0       2-0+1 = 3               [2], [2,5], [2,5,4]
3       80          80 < 100        0       3-0+1 = 4               [2], [2,2], [2,2,5], [2,2,5,4]
4       720         720 > 100       0
        180         180 > 100       1
        90          90 < 100        2       4-2+1 = 3               [9], [9,2], [9,2,2]

res = 1+2+3+4+3 = 13
```

`i-j+1`为从`j`到`i`生成的**新的子数组**的个数。可以想象一下, 假设一个数组只有一个元素, 我们只能生成一个子数组即这个元素本身。如果这时候再加一个元素, 那又增加了 2 个子数组, 为该元素本身以及该元素和前一个元素的子数组。

#### 代码

```c++
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        int res = 0, prod = 1, j = 0;

        if (k <= 1) return 0;
        for (int i = 0; i < nums.size(); i++) {
            prod *= nums[i];
            while (prod >= k)
                prod /= nums[j++];

            res += i-j+1;
        }
        return res;
    }
};
```
