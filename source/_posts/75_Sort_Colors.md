---
title: 75. Sort Colors
date: 2021-01-18 11:37:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 75. Sort Colors

Given an array `nums` with `n` objects colored red, white, or blue, sort them `in-place` so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers `0, 1, and 2` to represent the color red, white, and blue, respectively.

## Examples

### Example 1:

```code
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

### Example 2:

```code
Input: nums = [2,0,1]
Output: [0,1,2]
```

### Example 3:

```code
Input: nums = [0]
Output: [0]
```

### Example 4:

```code
Input: nums = [1]
Output: [1]
```

## Constraints:

- **n == nums.length**
- **1 <= n <= 300**
- **nums[i] is 0, 1, or 2.**

## Solutions

### Two Pointers

Although the questions named sort colors, this question is basically a sort question. However, we notice that there are only **3** numbers which are `0`, `1`, and `2`. Instead of using `Counting sort` or `Quick sort`, we could use `Two pointers` approch to achieve one pass and `O(1)` space.

We use three variables holding `l`, `m`, `r` positions. We start `m` with 0. If `nums[m]` is 0, then we need to swap this element with our `l` position since 0 is the smallest. All index `l` has been marked will be 0.

If `nums[m]` is 1, then we dont swap since 1 is the middle we just increment m.

However, if `nums[m]` is 2, then we need to swap with `r` right boundary elements because 2 is the largest. We then decrement `r` but keep `m` same.

> The reason we didnt increment m is because if the current element is 2, and nums[r] is 2. After swap, the current element is still 2.

For example `2, 0, 1, 2, 1, 2`

```code
2   0   1   2   1   2
m                   r
l
nums[m] == 2 -> swap(nums[m], nums[r])  r--

2   0   1   2   1   2
m               r
l
nums[m] == 2 -> swap(nums[m], nums[r]) r--

1   0   1   2   2   2
    m       r
l
nums[m] == 0 -> swap(nums[l], nums[m]) l++ m++

0   1   1   2   2   2
        m   r

    l
```

#### Code

```c++
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int l = 0, r = nums.size()-1, m = 0;

        while (m <= r) {
            if (nums[m] == 0) {
                swap(nums[l], nums[m]);
                l++;
                m++;
            } else if (nums[m] == 1) {
                m++;
            } else if (nums[m] == 2) {
                swap(nums[m], nums[r]);
                r--;
            }
        }
    }
};
```
