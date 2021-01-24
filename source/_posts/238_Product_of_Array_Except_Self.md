---
title: 238. Product of Array Except
date: 2021-01-23 22:13:26
tags: ["Leetcode", "Algorithm", "Medium", "Array"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 238. Product of Array Except Self

Given an array `nums` of n integers where **n > 1**, return an array `output` such that `output[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

## Examples

### Example 1:

```code
Input:  [1,2,3,4]
Output: [24,12,8,6]
```

## Constraint:

It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

## Note:

Please solve it without division and in O(n).

## Solutions

### Left and Right Product Approach

The most obvious approach would be multiply all the numbers in the array and then divide each of them to get the result. However, the problems mentioned we cannot do it with division.

The Leetcode Solution mentions the `Left and Right Product` approach, basically we use the product of all the numbers to the left and all the numbers to the right of the index. Then multiplying these two individual products will give us desired result.

For example `[1, 2, 3, 4]`.

For our first pass we end up with `[1, 1, 2, 6]` and the backward pass we have `[24,12,4,1]`. After multiply these two array we get `[24, 12, 8, 6]`.

To be honest, in order to come up with this kind of solution, draw some pictures of some iterations to visiualize the pattern might help.

```c++
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        vector<int> l(nums.size(), 1), r(nums.size(),1);

        for (int i = 1; i < nums.size(); i++)
            l[i] = nums[i-1] * l[i-1];
        for (int i = r.size()-2; i >= 0; i--)
            r[i] = nums[i+1] * r[i+1];

        for (int i = 0; i < l.size(); i++)
            l[i] *= r[i];

        return l;
    }
};
```
