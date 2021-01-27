---
title: 162. Find Peak Element
date: 2021-01-27 10:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Binary Search"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 162. Find Peak Element

A peak element is an element that is strictly greater than its neighbors.

Given an integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that `nums[-1] = nums[n] = -∞`.

## 示例

### 示例 1:

```code
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
```

### 示例 2:

```code
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
```

## 提示:

- **1 <= nums.length <= 1000**
- **2<sup>31</sup> <= nums[i] <= 2<sup>31</sup> - 1**
- **nums[i] != nums[i + 1] for all valid i**

## Solutions

### 1. 线性扫描

根据题目给定的条件 `nums[-1] = nums[n] = -∞`, 最直接的方法就是线性遍历原数组, 如果出现`nums[i] > nums[i+1]`我们就可以退出返回该索引.

因为`nums[-1]`假设为负无穷大, `nums[0]`自然大于`nums[-1]`. 如果`nums[0] > nums[1]`那就是 peak element.

如果遍历过程中没有找到 peak element, 则返回**数组内最后一个元素**. 因为前面如果没有峰值那**最后一个元素必然大于它前一个元素**, 根据题目提示`nums[n] = -∞`, 最后一个元素满足 peak element 要求.

时间复杂度 **O(n)**, 空间复杂度 **O(1)**.

```c++
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        for (int i = 0; i < nums.size()-1; i++) {
            if (nums[i] > nums[i+1])
                return i;
        }
        return -1;
    }
};
```

### 2. 二分法

题目中有一个很重要的提示 `nums[i] != nums[i+1] for all valid i`, 也就是说数组内相邻的元素值肯定不同. 我们可以用二分法, 如果`nums[m] < nums[m+1]`, 则`m`的右侧**必然存在峰值**. 为什么? 如果当前`nums[m] < nums[m+1]`, `m`至`m+1`为**递增**. 同时`nums[n] = -∞`也就是说右侧区间最后**必然会递减**. 这区间之内必然存在一个峰值满足 `nums[i] != nums[i+1]`.

其实用坐标点画下来会比较直观, 假设数组`[1,2, null, null, null, -∞]`. 把前两个点画在坐标轴上为上升斜率。中间 3 个点未知跳过。最后一个点为负无穷大所有第 4 个点到最后一个点为下降斜率。因为 `nums[i] != nums[i+1]`所以不存在斜率不变, 所以剩余两点不管怎么连都会使得数组内有峰值.

时间复杂度 **O(logn)**, 空间复杂度 **O(1)**.

因为 leetcode 测试数据比较少, 所以没有比线性扫描快很多.

```c++
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int l = 0, r = nums.size()-1, m;

        while (l < r) {
            m = l + (r-l)/2;
            if (nums[m] < nums[m+1])
                l = m+1;
            else r = m;
        }

        return l;
    }
};
```
