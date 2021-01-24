---
title: 215. Kth Largest Element in an Array
date: 2021-01-23 21:10:26
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 215. Kth Largest Element in an Array

Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

## Examples

### Example 1:

```code
Input: [3,2,1,5,6,4] and k = 2
Output: 5
```

### Example 2:

```code
Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
```

## Note:

You may assume k is always valid, 1 ≤ k ≤ array's length.

## Solutions

### STL

This question can be solved with some `STL` such as `priority_queue`, `quick sort`...etc.

```c++
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end(), [](const auto& lhs, const auto& rhs) {
            return lhs > rhs;
        });

        return nums[k-1];
    }
};
```
