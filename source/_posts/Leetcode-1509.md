---
title: 1509. Minimum Difference Between Largest and Smallest Value in Three Moves
date: 2021-02-01 10:39:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1509. Minimum Difference Between Largest and Smallest Value in Three Moves

Given an array `nums`, you are allowed to choose one element of `nums` and change it by any value in one move.

Return the minimum difference between the largest and smallest value of `nums` after perfoming **at most 3 moves**.

## 示例

### 示例 1:

```code
Input: nums = [5,3,2,4]
Output: 0
Explanation: Change the array [5,3,2,4] to [2,2,2,2].
The difference between the maximum and minimum is 2-2 = 0.
```

### 示例 2:

```code
Input: nums = [1,5,0,10,14]
Output: 1
Explanation: Change the array [1,5,0,10,14] to [1,1,0,1,1].
The difference between the maximum and minimum is 1-0 = 1.]]
```

### 示例 3:

```code
Input: nums = [6,6,0,1,1,4,6]
Output: 2
```

### 示例 4:

```
Input: nums = [1,5,6,14,15]
Output: 1
```

## 提示:

- **1 <= nums.length <= 10<sup>5</sup>**
- **-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup>**

## 解题思路

### 排序

如果要想让数组内最大值与最小值的**差值**变为最小, 需要尽可能的把数组内小的数变大, 或者把大的数变小使最大值与最小值趋近.

既然要找最小值, 最大值, 那首先需要先对数组进行排序.

题目要求我们移动 3 步, 我们可以先把问题进一步缩小. 如果我们只能移动**1 步** (只能更改数组内一个任意元素的值), 我们更改哪个?

很明显, 我们只能把最小的值改为它的下一个元素或者把最大值(最后一个元素)改为它的前一个值. 比如`示例3`, 排序后我们得到 `[0, 1, 1, 4, 6, 6, 6]`.

更改最小值得到`[1, 1, 1, 4, 6, 6, 6]`. 差值为 6 - 1 = 5

更改最大值得到`[0, 1, 1, 4, 6, 6, 6]`. 差值为 6 - 0 = 5 (最大值改为第二大后还是 6)

这时候只要对比哪个结果最小返回即可.

如果我们只能移动**2 步**, 我们这时候有 3 种情况:

1. 改变第一小和第二小为**第三小**
2. 改变第一大和第二大为**第三大**
3. 改变第一小为**第二小**, 改变第一大为**第二大**

同理如果我们只能移动**3 步**, 变为 4 种情况:

1. 改变第一小, 第二小, 第三小为 **第四小**
2. 改变第一大, 第二大, 第三大为 **第四大**
3. 改变第一小, 第二小为**第三小**. 以及第一大为**第二大**
4. 改变第一大, 第二大为**第三大**. 以及第一小为**第二小**

用`示例2 [1,5,0,10,14]`为例, 上述 4 中情况变为如下:

(排序后 `[0, 1, 5, 10, 14]`.)

1. `[10, 10, 10, 10, 14]` 差值为 14 - 10 = 4
2. `[0, 1, 1, 1, 1]` 差值为 1 - 0 = 1
3. `[5, 5, 5, 10, 10]` 差值为 10 - 5 = 5
4. `[1, 1, 5, 5, 5]` 差值为 5 - 1 = 4

最终第二种情况得到最小差值`1`.

一开始我们可以判断`nums`的长度是否小于等于 4, 如果小于等于 4, 我可以改变数组内任意三个元素来达到数组内元素全相等, 所以差值永远为 0

```c++
class Solution {
public:
    int minDifference(vector<int>& nums) {
        if (nums.size() <= 4) {
            return 0;
        }

        sort(nums.begin(), nums.end());
        int n = nums.size();
        int res = min({
            nums[n-1]-nums[3],
            nums[n-4]-nums[0],
            nums[n-2]-nums[2],
            nums[n-3]-nums[1]
        });

        return res;
    }
};
```
