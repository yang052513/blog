---
title: 213. House Robber II
date: 2021-01-23 21:10:26
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Dynamic Programming"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 213. House Robber II

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight **without alerting the police**.

## Examples

### Example 1:

```code
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
```

### Example 2:

```code
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

### Example 3:

```code
Input: nums = [0]
Output: 0
```

## Constraints

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 1000

## Solutions

### Dynamic Programming and Two Pass

This question is the variation of `198 House Robber`, the conditions are still same that rob **two adjacent houses** will alert the police. However, for this questions the street are arranged in a circle which the **first house** and **last house** in the array are **neighbor**. Thus, if you robbed first house then you **can not rob the last house** and vice versa.

In `House Robber`, we used dynamic programming to figure out the maximum amount to rob at each index. However, in this question that method does not work because if we start at index 1 and doing same thing we did in `House Robber`, we might miss the last index because we cant choose the first and last element together. Especially the index after also depend on the starting point.

Thus, we can do a forward pass and backward pass for the array using the previous apparoach. When we do the forward pass, we will start from first house and ignore last house to find the max amount to steal. Then for the backward pass we start from the last house and ignore the first house to find the maximum possible amount of cash. Finally we compare which pass has the largest index to get the result.

```c++
class Solution {
public:
    int rob(vector<int>& nums) {
        if (nums.empty()) return 0;
        if (nums.size() == 1) return nums[0];
        if (nums.size() == 2) return nums[0] > nums[1] ? nums[0] : nums[1];
        if (nums.size() == 3) return *max_element(nums.begin(), nums.end());

        vector<int> v = nums;
        int max1 = nums[1], curr_max = nums[0];
        for (int i = 2; i < nums.size()-1; i++) {
            nums[i] += curr_max;
            curr_max = nums[i-1] > curr_max ? nums[i-1] : curr_max;
            max1 = nums[i] > max1 ? nums[i] : max1;
        }

        int max2 = v[v.size()-2];
        curr_max = v.back();
        for (int i = v.size()-3; i > 0; i--) {
            v[i] += curr_max;
            curr_max = v[i+1] > curr_max ? v[i+1] : curr_max;
            max2 = v[i] > max2 ? v[i] : max2;
        }

        return max(max1, max2);
    }
};
```
