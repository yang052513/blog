---
title: 1481. Least Number of Unique Integers after K Removals
date: 2021-02-06 11:43:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sliding Window"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1493. Longest Subarray of 1's After Deleting One Element

Given a binary array `nums`, you should delete one element from it.

Return the size of the longest non-empty subarray containing only 1's in the resulting array.

Return 0 if there is no such subarray.

## 示例

### 示例 1:

```code
Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.
```

### 示例 2:

```code
Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].
```

### 示例 3:

```code
Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.
```

### 示例 4:

```code
Input: nums = [1,1,0,0,1,1,1,0,1]
Output: 4
```

### 示例 5:

```code
Input: nums = [0,0,0]
Output: 0
```

## 提示:

- **1 <= nums.length <= 10<sup>5</sup>**
- **nums[i] is either 0 or 1**

## Solutions

### 滑动窗口

题目给定一个数组且数组内的元素只为`1`或`2`, 我们**必须删除数组内的一个元素**. 并找到删除元素后最长的子数组且**子数组内的元素都为 1**.

也就是说我们需要保留尽可能多的`1`.

因此我们可以固定一个滑动窗口最多只包含一个`0`, 删掉这个 0 后就全是 1 了.

更具体来说, 我们用`l`和`r`两个指针来记录**窗口内 1 的个数**.

我们遍历数组过程中, 如果遇到`1`则递增`r`.

当遇到`0`的时候, 我们用左窗口`l`来保存上次`r`记录 1 的个数. 然后重置`r = 0`.

`l+r`就是窗口中`1`的个数.

因为题目要求必须删除一个元素, 所以最后需要判断`l+r`是否为原数组长度。如果`l+r`等于原数组长度, 则需要对结果减 1.

```c++
class Solution {
public:
    int longestSubarray(vector<int>& nums) {
        int res = 0, l = 0, r = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == 1) {
                r++;
            } else {
                l = r;
                r = 0;
            }
            res = max(res, l+r);
        }

        res = res == nums.size() ? res-1 : res;
        return res;
    }
};
```
