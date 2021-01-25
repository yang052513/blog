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

## 示例

### 示例 1:

<img src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg" />

```code
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
In this case, the max area of water (blue section) the container can contain is 49.
```

### 示例 2:

```code
Input: height = [1,1]
Output: 1
```

### 示例 3:

```code
Input: height = [4,3,2,1,4]
Output: 16
```

### 示例 4:

```code
Input: height = [1,2,1]
Output:
```

## 提示:

- **n == height.length**
- **2 <= n <= 3 \* 10<sup>4</sup>**
- **0 <= height[i] <= 3 \* 10<sup>4</sup>**

## 解题思路

### 双指针

题目给出一组**非负整数**数组, 数组内的每个元素代表**水的高度**. 让我们找到数组内的两个点为构成容器的两端且该容器可容纳最多水。

首先水的含量取决于 2 个因素:

1. 容器的高度, 与含水量成正比。
2. 容器的宽度, 与含水量成正比。

如果要找到构成含水量最大的容器，我们希望容器的**高度**尽可能的高，**宽度**也尽可能的宽。

需要注意一点的时，容器的高度取决于两端中**较短**一端的高度, 不然水则会溢出。

因此这个题目我们可以用双指针分别从数组的前后两端开始遍历。如果当前**左端**的高度小于**右边**的高度, 递增左指针。反之右指针。这是因为我们每次遍历都在**向内移动**, 也就是说**容器的宽度越来越小**。所以我们要尽可能的增加高度来找到最大的容器。

每次计算当前构成容器所能含水量(curr_area)并与**最大面积**(max)对比。

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
