---
title: 33. Search in Rotated Sorted Array
date: 2021-01-14 23:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Binary Search", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 33. Search in Rotated Sorted Array

You are given an integer array `nums` sorted in ascending order (with **distinct values**), and an integer `target`.

Suppose that `nums` is rotated at some pivot unknown to you beforehand (i.e., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`).

If `target` is found in the array return its index, otherwise, return `-1`.

## Examples

### Example 1:

```code
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

### Example 2:

```code
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

### Example 3:

```code
Input: nums = [1], target = 0
Output: -1
```

## Constraints:

- 1 <= nums.length <= 5000
- -10^4 <= nums[i] <= 10^4
- All values of nums are unique.
- nums is guaranteed to be rotated at some pivot.
- -10^4 <= target <= 10^4

## Solutions

### 1. Two Binary Search

The only difference of this problem compared to normal array search is that the array is **rotated**.

First, we need to find the `pivot` point by using binary search. We compare the middle point to the right point in the array. If `nums[m] > nums[r]`, then the pivot point definitely located after `m+1`. Otherwise we make `r = m`.

After we have the pivot index, we could check which interval does the targert located. For example, `[4,5,6,7,0,1,2]`. Suppose `target = 5`.

- `target > nums[pivot]`
- `target <= nums[nums.size()-1]`

Then we can say `target` is in the left of pivot.

Finally just do the normal binary search find the target index, or return -1 if not exist.

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size()-1, m;

        if (nums.size() == 1 && nums[0] != target)
            return -1;

        while (l < r) {
            m = l + (r-l)/2;
            if (nums[m] > nums[r])
                l = m+1;
            else r = m;
        }

        // find interval
        int _l, _r, _m;
        if (target >= nums[l] && target <= nums.back()) {
            _l = l;
            _r = nums.size()-1;
        } else {
            _l = 0;
            _r = l-1;
        }

        while (_l <= _r) {
            _m = _l + (_r-_l)/2;
            if (nums[_m] == target) {
                return _m;
            else if (nums[_m] > target)
                _r = _m-1;
            else _l = _m+1;
        }
        return -1;
    }
};
```
