---
title: 611 Valid Triangle Number
date: 2021-01-26 16:59:28
tags:
  [
    "Leetcode",
    "Algorithm",
    "Medium",
    "Brute Force",
    "Binary Search",
    "Two Pointers",
  ]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 611. Valid Triangle Number

Given an array consists of **non-negative** integers, your task is to count the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.

## 示例

### 示例 1:

```code
Input: [2,2,3,4]
Output: 3
Explanation:
Valid combinations are:
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3
```

## 提示:

- The length of the given array won't exceed `1000`.
- The integers in the given array are in the range of `[0, 1000]`.

## Solutions

> 三角形的定义: 任意两边的和大于第三边.

### 1. 暴力求解 (超时)

第一种方法就是用暴力求解，列举数组内所有的三个元素组合 `nums[i], nums[j], nums[k]`, 并计算是否满足三角形的定义。

由于我们要寻找三数的组合(triplets)所以有 3 层循环。

因此时间复杂度**n<sup>3</sup>**, 空间复杂度**O(1)**.

```c++
class Solution {
public:
    int triangleNumber(vector<int>& nums) {
        int res = 0;

        for (int i = 0; i < nums.size()-2; i++) {
            for (int j = i+1; j < nums.size()-1; j++) {
                for (int k = j+1; k < nums.size(); k++) {
                    res += (nums[i]+nums[j] > nums[k]) && (nums[i]+nums[k] > nums[j])
                            && (nums[j]+nums[k] > nums[i]);
                }
            }
        }
        return res;
    }
};
```

### 2. 二分法

第二种方法对数组预排序然后利用三角形的定义对第三层循环做二分法。

由于三角形必须满足**任意两边和大于第三边**, 且数组已经排好序。我们只需要找到**最右侧的**索引满足 `nums[i]+nums[j] > nums[k]` (变量对应暴力求解代码).

求证如下:

**a <= b <= c** (排序后)

c 为最大元素, c 加上任意一条边必然大于剩余的那条边. 得到`c+a > b`, `c+b > a`.

这个时候已经满足了三角形定义的 2 个条件, 也就是说我们只要满足最后一个条件`a+b > c`这三条边即满足三角形.

有了目标值, 而且数组已经排序. 我们可以把暴力求解中的最后一个循环改为二分法.

例如我们有数组`[3, 5, 3, 2, 4, 4]`, 排序后得到`[2, 3, 3, 4, 4, 5]`.

在`i = 0, j = 1`时, 我们有`nums[i] = 2, nums[j] = 3`. 我们用二分法从剩余数组`[3, 4, 4, 5]`中找到满足`nums[i]+nums[j] > nums[k]`最右的值. 也就是`k = 4, nums[k] = 4`.因为数组已经为有序, `2+3 > 4`则**k 之前的元素至 j+1 必然满足** `nums[i]+nums[j] > nums[k]`. 所以共有**j+1 到 k**条边都可以构成三角形。

时间复杂度 **n<sup>2</sup>logn** , 空间复杂度 **logn**

```c++
class Solution {
public:
    int triangleNumber(vector<int>& nums) {
        int res = 0;

        if (nums.size() < 3) return 0;
        sort(nums.begin(), nums.end());

        for (int i = 0; i < nums.size()-2; i++) {
            for (int j = i+1; j < nums.size()-1; j++) {
                int l = j+1, r = nums.size()-1, m;
                while (l <= r) {
                    m = l + (r-l)/2;
                    if (nums[m] >= nums[i]+nums[j])
                        r = m-1;
                    else l = m+1;
                }
                res += l-j-1;
            }
        }
        return res;
    }
};
```

### 3. 双指针

第三种方法是基于二分法的优化。首先对数组先进行排序, 从后往前每次固定最长的一条边, 然后对剩余的数组进行双指针遍历。

如果当前`nums[l]+nums[r] > nums[i]`, 这组区间内则有`r-l`个元素可以组成三角形。因为数组已经排序, 如果`nums[l]`与`nums[r]`的和大于`nums[i]`, 则`nums[l]`**右边的元素必然也能与`nums[r]`相加大于`nums[i]`**. 然后继续缩减`r`遍历.

如果`nums[l]+nums[r] < nums[i]`, 则我们扩增`l`, 因为当前`l`左边的元素无法满足与`nums[r]`相加大于第三边`nums[i]`.

时间复杂度 **O(n<sup>2</sup>)**, 空间复杂度 **logn** (排序)

```c++
class Solution {
public:
    int triangleNumber(vector<int>& nums) {
        if (nums.size() < 3) return 0;

        int res = 0;
        sort(nums.begin(), nums.end());
        for (int i = nums.size()-1; i > 1; i--) {
            int l = 0, r = i-1;
            while (l < r) {
                if (nums[l]+nums[r] > nums[i]) {
                    res += r-l;
                    r--;
                } else l++;
            }
        }

        return res;
    }
};
```
