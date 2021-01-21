---
title: 152. Maximum Product Subarray
date: 2021-01-20 22:30:23
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Dynamic Programming"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 151. Reverse Words in a String

Given an integer array `nums`, find the contiguous subarray within an array (containing at least one number) which has the largest product.

## Examples

### Example 1:

```code
Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
```

### Example 2:

```code
Input: [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.

```

## Solutions

### 1. Dynamic Programming

Let's first analysis some cases. Suppose our array are all **positive** numbers, then the maximum product subarray will the **all the elements** in the array.

However, what if the array contains `0`? Then we could use a variable to track `current max` and compare to `max`, still same process.

But now what if we have **negative numbers**? One negative number will make the continous product **smaller**. However, **two negative** number becomes positive which **may make the number become max**.

Let's say we use a variable called `max_sub` to hold our current maximum product, and we have `[2, 3, -1, 2, -4]`. We multiply `nums[i]` with `max_sub` and compare it with `nums[i]`. If greater than the current element then included in else the subarray is break. We reset `max_sub` with current element `nums[i]`.

For example, `2 * 3 > 3`, we update `max_sub` to `6`. Ok, `6 * (-1) < -1`, we break and reset `max_sub` to -1. Then continous we got `-2 * -4 > -2` and we end up with 8. However, that's not correct. You can see the problem when encounter `negatives`. Thus, we use another variable `min_sub` that holds the **minimum subarray product**. Why minimum? Because if the minimum is negative and we found another negative, they might greater than our `max_sub` after multiply.

Thus, we could add another condition that check if the current element is smaller than 0. If so, then we **swap max_sub with min_sub**. This is because once we have negative, the **previous max_sub will become negative** so we need to check if the min_sub can multiply it become a larger number. Also `max_sub` are tempory which need to check with `res` which holds the maximum product that have seen.

```c++
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        if (nums.empty()) return -1;

        int max_sub = nums[0], min_sub = nums[0],
            res = nums[0];

        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] < 0)
                swap(max_sub, min_sub);

            max_sub = max(nums[i], nums[i]*max_sub);
            min_sub = min(nums[i], nums[i]*min_sub);
            res = max(max_sub, res);
        }

        return res;
    }
};
```
