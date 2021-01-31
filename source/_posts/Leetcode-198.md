---
title: 198. House Robber
date: 2021-01-21 23:00:12
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Dynamic Programming"]
comments: true
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 198. House Robber

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight **without alerting the police**.

## Examples

### Example 1:

```code
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

### Example 2:

```code
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.

```

## Constraints:

- 0 <= nums.length <= 100
- 0 <= nums[i] <= 400

## Solutions

### 1. Dynamic Programming

The question asks imagine the array `nums` represents the amount of cash that each house (index i) has, what is the maximum amount that we can rob. Notice that we **can not robber two adjacent hoses** such as index at `1` and `2` as it will contact the police.

As long as we dont chose two adjacent houses, we can move whatever we want. If we could decided the maximum amount of cash we could get for the current index, then the index after could also based on that and calculate the maximum cash. Basically we are solving each index at a time.

Let's first walk through an example. Suppose we have `[2, 7, 9, 3, 1]`.

At first house `i = 0` we have `2`. **The best we can get** at `i = 0` is `2`.

Now we are at `i = 1` with `7`. **The best we can get** at `i = 1` is `7` because we cant rob `i = 0` as they are adjacent.

Then `i = 2` with `9`. **The best we can get** at `i = 2` is `11` because we can rob `i = 0` and `i = 2`.

Until now the process is pretty obvious because we dont have too much adjacent.

However, at `i = 3` with `3`, there are many ways to rob `i = 3`. For example, we could rob `i = 0` then `i = 3`, or we could rob `i = 1` then `i = 3`. Either way doesnt alert the police. Well, what is the best way? Remember our previous index are already marked as **the best we can get** for that index. Same thing for here. At index `i = 3`, the maximum amount we could rob **depends on the max of `i = 0` and `i = 1`**. Or we could say the all the elements before `i-1`.

We already marked `i = 1` as `7` for best get, so at `i = 3` we could get `10`.

Then finally at `i = 4` with `1`, the maximum we can get will depend the max values from `i = 0` to `i = 2` which is `9`. So we get `12`.

Once we figured the `dynamic programming` part, we could implement the code. We use a `res` to hold the maximum amout of cash we have seen, and `curr_max` to hold the tempory max which is the max of elements before `i-1`. Everytime we iterate array we update `nums[i]` add with `curr_max` to get the best we can get at house index `i`. Then we update `curr_max` and `res`.

```c++
class Solution {
public:
    // use a variable to keep the max seen before
    int rob(vector<int>& nums) {
        if (nums.empty()) return 0;
        if (nums.size() == 1) return nums[0];
        if (nums.size() == 2) return nums[0] > nums[1] ? nums[0] : nums[1];

        int res = nums[1];
        int curr_max = nums[0];
        for (int i = 2; i < nums.size(); i++) {
            nums[i] = nums[i] + curr_max;
            curr_max = max(curr_max, nums[i-1]);
            res = nums[i] > res ? nums[i] : res;
        }

        return res;
    }
};
```
