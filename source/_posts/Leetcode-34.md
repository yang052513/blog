---
title: 34. Find First and Last Position of Element in Sorted Array
date: 2021-01-14 23:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Binary Search"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 34. Find First and Last Position of Element in Sorted Array

Given an array of integers `nums` sorted in ascending order, find the starting and ending position of a given `target` value.

If `target` is not found in the array, return `[-1, -1]`.

## Examples

### Example 1:

```code
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

### Example 2:

```code
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]Output: -1
```

### Example 3:

```code
Input: nums = [], target = 0
Output: [-1,-1]
```

## Constraints:

- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
- nums is a non-decreasing array.
- -10^9 <= target <= 10^9

## Solutions

### 1. Binary Search

Since the given array `nums` is already sorted and we need to find a target interval. We can use binary search to solve this problem. There are some cases that

1. if the target not exist, we can just return `[-1, -1]`
2. if the target only appears **once**, then the start and end index will be same
3. if the target appears **more than** once, then start will be the first occurence and end will be the last occurence.

Therefore, we could first try to find the target. If we find the target in the array, we then start from the target index to left and right until its adjacent element does not equal to target.

```c++
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        if (nums.empty()) return {-1, -1};

        vector<int> res;
        int l = 0, r = nums.size()-1, m;
        while (l <= r) {
            m = l + (r-l)/2;
            if (nums[m] > target)
                r--;
            else if (nums[m] < target)
                l++;
            else {
                int start = m, end = m;
                while (start > 0 && nums[start-1] == target)
                    start--;
                while (end < nums.size()-1 && nums[end+1] == target)
                    end++;
                return {start, end};
            }
        }
        return {-1, -1};
    }
};
```
