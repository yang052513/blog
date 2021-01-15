---
title: 11. Container With Most Water
date: 2021-01-14 22:53:24
tags: ["Leetcode", "Algorithm", "Medium", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 11 Container With Most Water

Given n non-negative integers `a1, a2, ..., an`, where each represents a point at coordinate `(i, ai)`. `n` vertical lines are drawn such that the two endpoints of the line `i` is at `(i, ai)` and `(i, 0)`. Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.

**Notice** that you may not slant the container.

## Examples

### Example 1:

<img src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg" />

```code
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
In this case, the max area of water (blue section) the container can contain is 49.
```

### Example 2:

```code
Input: height = [1,1]
Output: 1
```

### Example 3:

```code
Input: height = [4,3,2,1,4]
Output: 16
```

### Example 4:

```code
Input: height = [1,2,1]
Output:
```

## Constraints:

- n == height.length
- 2 <= n <= 3 \* 10^4
- 0 <= height[i] <= 3 \* 10^4

## Solutions

### 1. Binary Search

The are of water the container can contain depends on 2 factors: the **height** of the container and the **length or how long the x-axis** of the container.

In addition to height, we need to take the relative shorter height when calculate the area, otherwise the water will **overflow**

Thus, we could use **two pointer** approach where we start from the most left element and most right element.

- We compare the left pointer element and right pointer element, and we **move inwards** for the shorter element.
- e.g. `nums[l] = 2`, `nums[r] = 8` then we increment `l` by 1.

This is because whenever we move inwards, the width will decrease, so we have to try to make the height as higher as possible.
We also use a variable to hold the maximum area if current area is greater than maximum area.

```c++
class Solution {
public:
    int maxArea(vector<int>& height) {
        int max = 0, curr_area;

        int l = 0, r = height.size()-1;
        while (l <= r) {
            curr_area = min(height[l], height[r]) * (r-l);
            max = curr_area > max ? curr_area : max;
            if (height[l] < height[r])
                l++;
            else r--;
        }

        return max;
    }
};
```
