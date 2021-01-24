---
title: 209. Minimum Size Subarray Sum
date: 2021-01-23 21:10:26
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 229. Majority Element II

Given an array of **n** positive integers and a positive integer **s**, find the minimal length of a **contiguous subarray** of which the `sum ≥ s`. If there isn't one, return 0 instead.

## Examples

### Example 1:

```code
Input: s = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: the subarray [4,3] has the minimal length under the problem constraint.
```

## Solutions

### Two Pointers

The idea is similar to use the `Sliding Window` technique that we keep a initial and add and remove elements based on that. To find the **minimal length**, we could add number up while iterating the array. Whenever the `current sum` exceed the target `s`, then we have base `array` and we can remove element until it doesnt meet `current sum greater than s`.

For example, `[2,3,1,2,4,3]`. We set up our initial sum as 0 and iterate the array. We add 2, 3, and 1 to `current sum`. At index `3`, our current sum become `8` which greater than target `7`. Thus, we could try to shrink the temporary array by subtracting element until it doesnt hold the condition.

```c++
class Solution {
public:
    int minSubArrayLen(int s, vector<int>& nums) {
        int res = INT_MAX, sum = 0, j = 0;

        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i];
            while (sum >= s) {
                res = i-j+1 < res ? i-j+1 : res;
                sum -= nums[j++];
            }
        }

        if (res == INT_MAX) return 0;
    }
};
```
