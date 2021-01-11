---
title: 1 Two Sum
date: 2021-01-10 19:42:24
tags: ["Leetcode", "Algorithm", "Easy", "Array"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1 Two Sum

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

## Examples

### Example 1:

```code
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
```

### Example 2:

```code
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Example 3:

```code
Input: nums = [3,3], target = 6
Output: [0,1]
```

## Constraints:

- 2 <= nums.length <= 103
- -109 <= nums[i] <= 109
- 109 <= target <= 109
- **Only one valid answer exists**

## Solutions

### 1. Hash Table

第一种方法可以用哈希表保存`nums`数组中的元素，key 代表`nums`数组中元素值，value 则代表该元素的下标值。

因为题目给出答案有且只有一个，那么可以直接遍历`nums`从哈希表中找到`target-curr_elem`的值。

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;

        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (mp.find(diff) != mp.end()) {
                return {i, mp[diff]};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};
```

```
Time Complexity: O(n)
Space Complexity: O(n)
Runtime: 8 ms, faster than 89.28% of C++ online submissions for Two Sum.
Memory Usage: 9.3 MB, less than 81.66% of C++ online submissions for Two Sum.
```
