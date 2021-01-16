---
title: 153. Find Minimum in Rotated Sorted Array
date: 2021-01-15 18:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Binary Search"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 153. Find Minimum in Rotated Sorted Array

Suppose an array of length n sorted in ascending order is `rotated` between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:

- `[4,5,6,7,0,1,2]` if it was rotated `4` times.
- `[0,1,2,4,5,6,7]` if it was rotated `7` times.

Notice that **rotating** an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums`, return the minimum element of this array.

## Examples

### Example 1:

```code
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

### Example 2:

```code
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.

```

### Example 3:

```code
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
```

## Constraints:

- n == nums.length
- 1 <= n <= 5000
- -5000 <= nums[i] <= 5000
- All the integers of nums are **unique**.
- nums is sorted and rotated between 1 and n times.

## Solutions

### 1. Binary Search

The minimum in the rotated sorted array is the **pivot** point in the array, which the element is smaller than its left side and right side.

We could use binary search and if the middle point is greater than right, then we narrow left else narrow right.

```c++
class Solution {
public:
    int findMin(vector<int>& nums) {
        int l = 0, r = nums.size()-1, m;

        while (l < r) {
            m = l + (r-l)/2;
            if (nums[m] > nums[r]) {
                l = m+1;
            } else
                r = m;
        }
        return nums[l];
    }
};
```
