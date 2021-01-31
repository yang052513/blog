---
title: 81. Search in Rotated Sorted Array II
date: 2021-01-18 11:37:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Binary Search"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 81. Search in Rotated Sorted Array II

You are given an integer array `nums` sorted in ascending order (not necessarily **distinct** values), and an integer `target`.

Suppose that `nums` is rotated at some pivot unknown to you beforehand (i.e., `[0,1,2,4,4,4,5,6,6,7]` might become `[4,5,6,6,7,0,1,2,4,4]`).

If `target` is found in the array return its index, otherwise, return `-1`.

## Examples

### Example 1:

```code
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
```

### Example 2:

```code
Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
```

## Constraints:

- **1 <= nums.length <= 5000**
- **-10<sup>4</sup> <= nums[i] <= 10<sup>4</sup>**
- **nums is guaranteed to be rotated at some pivot.**
- **-10<sup>4</sup> <= target <= 10<sup>4</sup>**

## Solutions

### Binary Search

This question is an variation of `Search in Rotaed Array`. However, now we may have **duplicate values** in our array. In the prevous question we use the approach to first find the `pivot` point and then figure if the target is in left or right and do another binary search. However, suppose we array looks like this: `[1,1,1,1,2,1,1]` and given `target = 2`. If we use the old approach we will end up with `pivot` at index 0, but then the question is which range should we check?

Thus, to solve this problem, we do a **one pass binary search**. Everytime we compare `nums[m]` with `nums[r]`.

If the middle element smaller than `nums[r]`, it means **all the element on the right side of m are sorted**.

Why that matters? If we know the right side are all sorted elements, we can compare `target` with `nums[m]` and `nums[r]`. If target does not in that range, then we know we can shrink our array to `r = m - 1`.

On the other hand if the `target` do locate in that range, we can move `l` all the way to `m+1`.

Basically, the idea is to find the right interval while narrowing down the range.

For example `[2,5,6,0,0,1,2]`. `target = 3`.

We start with `nums[m] = 0` at `i = 3`, and we found `nums[m] < nums[r](2)`. Then we know from index 3 to index `r` are all sorted. From there we check `target` is not in that range. Therefore, we can move `r` to 2.

```c++
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int l = 0, r = nums.size()-1, m;

        while (l <= r) {
            while (l < r && nums[l] == nums[l+1]) l++;
            while (l < r && nums[r] == nums[r-1]) r--;

            m = l + (r-l)/2;
            if (nums[m] == target) return true;
            // right sorted
            else if (nums[m] < nums[r]) {
                if (target > nums[m] && target <= nums[r]) l = m+1;
                else r = m-1;
            // left sorted
            } else {
                if (target >= nums[l] && target < nums[m]) r = m-1;
                else l = m+1;
            }
        }

        return false;
    }
};

```
