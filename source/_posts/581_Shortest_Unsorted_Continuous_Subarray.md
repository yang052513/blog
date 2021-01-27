---
title: 581. Shortest Unsorted Continuous Subarray
date: 2021-01-27 14:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 581. Shortest Unsorted Continuous Subarray

Given an integer array `nums`, you need to find **one continuous subarray** that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order.

Return **the shortest such subarray and output its length**.

## 示例

### 示例 1:

```code
Input: nums = [2,6,4,8,10,9,15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
```

### 示例 2:

```code
Input: nums = [1,2,3,4]
Output: 0
```

### 示例 3:

```code
Input: nums = [1]
Output: 0
```

## 提示

- **1 <= nums.length <= 10<sup>4</sup>**
- **-10<sup>5</sup> <= nums[i] <= 10<sup>5</sup>**

## 解题思路

### 1. 排序对比

题目要求我们找到数组内最长的子数组, 且把子数组排序后使得整个原数组为升序.

因为子数组元素必须互相相邻，我们只要从头尾分别找**无序开始的索引**即可. 因为其中的元素无论是否有序, 整个子数组还是无序.

比如数组 `[2, 6, 3, 4, 5, 12, 10]`. 在 i = 1 元素为 6 的时候已经不满足有序 (6 > 3). 同理 i = 5 的时候 12 也不在正确的位置. 所以区间`[1, 6]`为最长的目标子数组. 虽然这个子数组内`[3, 4, 5, 12]`为有序, 但是头尾的无序使得整个子数组需要排序才能满足原数组为有序.

所以我们先拷贝原数组`v` 并排序原数组与`v`对比. 从左侧开始如果元素不匹配则可以退出循环. 同理再从尾端遍历.

如果从左侧匹配结果等于数组长度, 说明原数组已经为升序, 直接返回`0`.

```c++
class Solution {
public:
    int findUnsortedSubarray(vector<int>& nums) {
        if (nums.size() == 1) return 0;

        vector<int> v = nums;
        sort(v.begin(), v.end());

        int l = 0, r = nums.size()-1;
        for (; l < nums.size(); l++)
            if (nums[l] != v[l]) break;

        if (l == nums.size()) return 0;

        for (; r >= 0; r--)
            if (nums[r] != v[r]) break;

        return r-l+1;
    }
};
```
