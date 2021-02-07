---
title: 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
date: 2021-02-06 10:54:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

Given an array of integers `nums` and an integer `limit`, return the size of the longest **non-empty subarray** such that the absolute difference between any two elements of this subarray is less than or equal to `limit`.

## 示例

### 示例 1:

```code
Input: nums = [8,2,4,7], limit = 4
Output: 2
Explanation: All subarrays are:
[8] with maximum absolute diff |8-8| = 0 <= 4.
[8,2] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 <= 4.
[2,4] with maximum absolute diff |2-4| = 2 <= 4.
[2,4,7] with maximum absolute diff |2-7| = 5 > 4.
[4] with maximum absolute diff |4-4| = 0 <= 4.
[4,7] with maximum absolute diff |4-7| = 3 <= 4.
[7] with maximum absolute diff |7-7| = 0 <= 4.
Therefore, the size of the longest subarray is 2.
```

### 示例 2:

```code
Input: nums = [10,1,2,4,7,2], limit = 5
Output: 4
Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.
```

### 示例 3:

```code
Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3
```

## 提示:

- **1 <= nums.length <= 10<sup>5</sup>**
- **1 <= nums[i] <= 10<sup>9</sup>**
- **0 <= limit <= 10<sup>9</sup>**

## Solutions

### Multiset

要使得子数组内**任意 2 个元素的绝对值差值小于等于`limit`**, 则只要子数组内的最大值和最小值差值小于等于`limit`即可.

我们可以使用`Multiset`来存储元素, 每次先将元素插入到`Multiset`.

然后计算`Multiset`的最小值和最大值的绝对值差值, 如果**大于`limit`**, 则当前的子数组不满足要求. 我们删掉`Multiset`中左指针指向的元素并递增左指针, 直到找到下一个有效的子数组.

```c++
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        multiset<int> mt;
        int l = 0;
        int res = 0;

        for (int i = 0; i < nums.size(); i++) {
            mt.insert(nums[i]);
            while (*rbegin(mt) - *begin(mt) > limit) {
                mt.erase(mt.equal_range(nums[l]).first);
                l++;
            }
            res = max(res, i-l+1);
        }
        return res;
    }
};
```
