---
title: 16. 3Sum Closest
date: 2021-01-14 23:55:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Two Pointer", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 15. 3Sum Closest

Given an array `nums` of n integers and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers. You may assume that each input would have exactly one solution.

## Examples

### Example 1:

```code
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

## Constraints:

- 3 <= nums.length <= 10^3
- -10^3 <= nums[i] <= 10^3
- -10^4 <= target <= 10^4

## Solutions

### 1. Pre-Sort + Two Pointers

This question is after 3Sum, and instead we find 3 intergers add up to 0, we try to find the number that is the closet to the target.

The algorithm is still same but with some minor change. We pre-sort the original array, and then we iterate the array. For each element `nums[i]`, we declare variable `sum` that is the sum of `nums[i]`, `nums[i+1]` and `nums[nums.size()-1]`. Based on the sum compared to `target`, we move `l` and `r` pointer respectively

- if **sum < target**, increment l.
- if **sum > target**, decrement r.
- If **sum == target**, we can just return `sum`.

Then we calculate the distance with current `sum` to `target`. If it is smaller `dist`, we update `dist` to that value and also update `res` to that sum.

```c++
class Solution {
public:
    // -4 -1 1 2
    int threeSumClosest(vector<int>& nums, int target) {
        int res, dist = INT_MAX;

        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size()-2; i++) {
            int l = i+1, r = nums.size()-1, sum;
            while (l < r) {
                sum = nums[i]+nums[l]+nums[r];
                if (sum < target)
                    l++;
                else if (sum > target)
                    r--;
                else return sum;

                // compare distance
                int curr = sqrt(pow(abs(target-sum), 2));
                if (curr < dist) {
                    dist = curr;
                    res = sum;
                }
            }
        }
        return res;
    }
};
```
