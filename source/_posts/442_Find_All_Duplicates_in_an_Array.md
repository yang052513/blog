---
title: 442. Find All Duplicates in an Array
date: 2021-01-27 10:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Array"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 442. Find All Duplicates in an Array

Given an array of integers, **1 ≤ a[i] ≤ n** (n = size of array), some elements appear **twice** and others appear once.

Find _all the elements_ that appear **twice** in this array.

Could you do it without extra space and in O(n) runtime?

## 示例

### 示例 1:

```code
Input:
[4,3,2,7,8,2,3,1]

Output:
[2,3]
```

## 解题思路

### 1. 标记索引

首先观察题目描述, 数组内的元素取值范围为`[1, n]`. 比如示例 1 的数组长度为**8**, 数组内的元素都在[1,8]区间. 另一点就是重复的元素**只出现 2 次**, 其他的元素则只出现一次.

我们可以把数组内的元素值看作为**目标索引值**. 比如示例 1 中, `nums[1] = 3`, 我们把**3**作为目标索引值。有这个目标索引值有什么用呢? 我们可以把这个目标索引值的元素变为**负数**来表示**我们已经访问过这个索引**. 即`nums[3] *= -1`. 2 变成了-2.

当我们遍历`i = 6`时, 我们又得到了`3`, 那我们又回到了`nums[3]`. 这个时候我们得到的是`-2`, `nums[3]`处的元素为负数说明我们已经用过`3`这个索引, 于是`3`为重复的元素之一.

需要注意的两个地方:

1. 每次需要先把当前元素转化为正值再去索引查看是否为负数. 比如 nums[1] = 3 我们把 2 标记为 -2. 当 i = 2 时，需要先把 nums[2] 转化为正数 2 再去看索
   引 2 是否为负数.
2. 数组为 0-based 下标, 但元素的范围为`[1, n]`. 所以目标索引需要减去 1. 比如上面 nums[1] = 3 我们要去索引 2 查看.

#### 代码

```c++
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> res;

        for (int i = 0; i < nums.size(); i++) {
            int index = abs(nums[i])-1;
            if (nums[index] < 0)
                res.push_back(abs(nums[i]));
            else
                nums[index] *= -1;
        }
        return res;
    }
};
```
