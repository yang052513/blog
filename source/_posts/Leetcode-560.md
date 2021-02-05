---
title: 560. Subarray Sum Equals K
date: 2021-02-04 20:18:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Simulation"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 560. Subarray Sum Equals K

Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.

## 示例

### 示例 1:

```code
Input: nums = [1,1,1], k = 2
Output: 2
```

### 示例 2:

```code
Input: nums = [1,2,3], k = 3
Output: 2
```

## 提示

- **1 <= nums.length <= 2 \* 10<sup>4</sup>**
- **-1000 <= nums[i] <= 1000**
- **-10<sup>7</sup> <= k <= 10<sup>7</sup>**

## 解题思路

### 1. 暴力求解 (超时)

题目给定一个数组, 要求找到数组内**所有的子数组**满足**子数组的总和等于`k`**.

最直观的思路就是用暴力求解, 遍历找到**所有可能的子数组**, 然后判断每个子数组的总和是否等于`k`.

例如 `[1, 1, 0] k = 2`. 列出所有的子数组过程

```code
1
1 1     sum = k
1 1 0   sum = k
1
1 0
0
```

然而我们可以用前缀和来进行优化. 第一层遍历元素, 第二层循环用前缀和记录当前的总和, 如果等于`k`则递增结果.

```c++
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int res = 0;
        for (int i = 0; i < nums.size(); i++) {
            int sum = 0;
            for (int j = i; j < nums.size(); j++) {
                sum += nums[j];
                if (sum == k) res++;
            }
        }
        return res;
    }
};
```

### 2. 哈希表

用哈希表来记录之前出现过同样累计和的次数. 依次遍历数组, 如果哈希表中能够找到`sum-k`, 则说明当前索引的**前面必然有连续的子数组的和与当前元素能够组成有效子数组**.

```c++
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        int res = 0, sum = 0;

        mp[0] = 1;
        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i];
            if (mp[sum-k])
                res += mp[sum-k];
            mp[sum]++;
        }

        return res;
    }
};
```
