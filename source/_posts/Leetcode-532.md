---
title: 532. K-diff Pairs in an Array
date: 2021-02-03 14:55:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "HashMap"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 532. K-diff Pairs in an Array

Given an array of integers `nums` and an integer `k`, return the number of **unique k-diff pairs** in the array.

A **k-diff** pair is an integer pair (`nums[i], nums[j]`), where the following are true:

- `0 <= i, j < nums.length`
- `i != j`
- `|nums[i] - nums[j]| == k`

Notice that `|val|` denotes the absolute value of val.

## 示例

### 示例 1:

```code
Input: nums = [3,1,4,1,5], k = 2
Output: 2
Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).
Although we have two 1s in the input, we should only return the number of unique pairs.
```

### 示例 2:

```code
Input: nums = [1,2,3,4,5], k = 1
Output: 4
Explanation: There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).
```

### 示例 3:

```code
Input: nums = [1,3,1,5,4], k = 0
Output: 1
Explanation: There is one 0-diff pair in the array, (1, 1).
```

### 示例 4:

```code
Input: nums = [1,2,4,4,3,3,0,9,2,3], k = 3
Output: 2
```

### 示例 5:

```code
Input: nums = [-1,-2,-3], k = 1
Output: 2
```

## 提示:

- 1 <= nums.length <= 10<sup>4</sup>
- -10<sup>7</sup> <= nums[i] <= 10<sup>7</sup>
- 0 <= k <= 10<sup>7</sup>

## Solutions

### 哈希表

题目要求找到所有不重复的配对. 其实有点类似`Two Sum`.

我们可以先把数组内的元素保存到哈希表中, 键对应元素, 值对应元素的频率. 记录元素的频率是为了判断如果元素自身相减的绝对值为`k`, 若出现次数大于 1 则也满足有效的配对.

然后依次遍历数组, 遍历过程查找哈希表中是否有`nums[i]+k`的元素存在且出现次数大于`0`.

如果我们能找到目标元素, 需要**判断该元素是否为自身**. 如果是该元素自身则只需要检查哈希表中该元素的出现次数是否大于`1`即可. 因为如果大于`1`则说明这个元素出现了 2 次, 也算是有效的配对.

最后把哈希表中目标元素的值更新为`-1`避免下次**重复**的配对. 例如当前元素是`1`, `k = 2`, 我们找到目标元素`3`, 这时候把哈希表中的`3`的值更新为`-1`. 因为只有`1`能够与`3`配对, 题目要求**不重复的配对**. 所以之后再出现`1`, 也不能与`3`组合了.

```c++
class Solution {
public:
    int findPairs(vector<int>& nums, int k) {
        if (k < 0) {
            return 0;
        }

        int res = 0;
        unordered_map<int, int> mp;
        for (int i : nums) {
            mp[i]++;
        }

        for (int i = 0; i < nums.size(); i++) {
            int target = nums[i] + k;
            if (mp.find(target) != mp.end() && mp[target] > 0) {
                if (target == nums[i] && mp[target] > 1 || nums[i] != target) {
                    res++;
                    mp[target] = -1;
                }
            }
        }
        return res;
    }
};
```
