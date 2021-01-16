---
title: 189. Rotate Array
date: 2021-01-15 22:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Reminder"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 189. Rotate Array

Given an array, rotate the array to the right by k steps, where k is non-negative.

Follow up:

Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
Could you do it in-place with O(1) extra space?

## Examples

### Example 1:

```code
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```

### Example 2:

```code
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation:
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]

```

### Example 3:

```code
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
```

## Constraints:

- 1 <= nums.length <= 2 \* 10^4
- -2^31 <= nums[i] <= 23^1 - 1
- 0 <= k <= 10^5

## Solutions

### 1. Reminder

This question is similar to Array Cycle which we could use the reminder to get the element index after shifting.

For example we have array `[1,2,3,4]`, and we want to shift `3` times.

Start at index 0, `1` will at index 3 after shift 3 times.

For index 1, we noticed that if we plus 3 for index 1, the index will **out of range**. What we need to do is think the array as a circle, and once it hits the end it will restart from index 0. The way we do it is using the `index` plus the number of `shift` and reminder **array size**.

We could also check if `k` reminder array size equal to 0. If so, they shift is cyclic and still same to original array.

```c++
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        vector<int> res(nums.size(), 0);
        for (int i = 0; i < nums.size(); i++) {
            int pos = (i+k) % nums.size();
            res[pos] = nums[i];
        }

        nums = res;
    }
};
```
