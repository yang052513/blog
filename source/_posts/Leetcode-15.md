---
title: 15. 3Sum
date: 2021-01-14 23:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Two Pointer", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 15. 3Sum

Given an array `nums` of n integers, are there elements a, b, c in `nums` such that **a + b + c = 0**? Find all **unique** triplets in the array which gives the sum of zero.

Notice that the solution set **must not contain duplicate triplets**.

## Examples

### Example 1:

```code
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

### Example 2:

```code
Input: nums = []
Output: []
```

### Example 3:

```code
Input: nums = [0]
Output: []
```

## Constraints:

- 0 <= nums.length <= 3000
- -10^5 <= nums[i] <= 10^5

## Solutions

### 1. Pre-Sort + Two Pointers

The question is asking 3 numbers that add up equal to 0, and the result has to be **unqiue**.

First, we could fix to one number at a time, for example `-4`. Then in order to get 0 result we need to find a pair that add up to `4`. Therefore, we use two loops that the outer loop iterate the arry until to the **third last element** (because we need a triplet), and the inner loop will use the two pointer that iterate the right part of the array.

If `nums[l]+nums[r] > target`, then we decrement `r` otherwise increment `l`

The most important part is to **check if element are equal** when push to array. We can do so using another loop check if the current element equal to the next;

For example if we have `[-4,1,3,1,3]`. After we push `[-4,1,3] to `res`, the rest `[1,3]` will be duplicate and should not be added. Since we **already sorted the array**, we could just compare it with its next element.

```c++
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;

        if (nums.empty() || nums.size() < 3) return {};

        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size()-2; i++) {
            // skip duplicate elements
            if (i > 0 && nums[i-1] == nums[i]) continue;

            int l = i+1, r = nums.size()-1, target = 0 - nums[i];
            while (l < r) {
                if (nums[l]+nums[r] > target) r--;
                else if (nums[l]+nums[r] < target) l++;
                } else {
                    res.push_back({nums[i], nums[l], nums[r]});
                    // skip duplicates
                    while (l < r && nums[l] == nums[l+1]) l++;
                    while (l < r && nums[r] == nums[r-1]) r--;
                    l++; r--;
                }
            }
        }
        return res;
    }
};
```
