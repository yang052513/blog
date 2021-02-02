---
title: 1338. Reduce Array Size to The Half
date: 2021-02-01 21:50:28
tags: ["Leetcode", "Algorithm", "Medium", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

Given an array arr. You can choose a set of integers and remove all the occurrences of these integers in the array.

Return the minimum size of the set so that at least half of the integers of the array are removed.

## 示例

### 示例 1:

```code
Input: arr = [3,3,3,3,5,5,5,2,2,7]
Output: 2
Explanation: Choosing {3,7} will make the new array [5,5,5,2,2] which has size 5 (i.e equal to half of the size of the old array).
Possible sets of size 2 are {3,5},{3,2},{5,2}.
Choosing set {2,7} is not possible as it will make the new array [3,3,3,3,5,5,5] which has size greater than half of the size of the old array.
```

### 示例 2:

```code
Input: arr = [7,7,7,7,7,7]
Output: 1
Explanation: The only possible set you can choose is {7}. This will make the new array empty.
```

### 示例 2:

```code
Input: arr = [1,9]
Output: 1
```

### 示例 3:

```code
Input: arr = [1000,1000,3,7]
Output: 1
```

### 示例 4:

```code
Input: arr = [1,2,3,4,5,6,7,8,9,10]
Output: 5
```

## 提示:

- 1 <= arr.length <= 10<sup>5</sup>
- arr.length is even.
- 1 <= arr[i] <= 10<sup>5</sup>

## 解题思路

### 哈希表 + 排序

首先找到每个元素的频率用哈希表记录, 因为题目要求最小的元素集合, 所以要依次把频率最高的元素从数组中移除. 最后判断减去当前最高次数后是否满足小于原数组长度的一半.

```c++
class Solution {
public:
    int minSetSize(vector<int>& arr) {
        unordered_map<int, int> mp;
        int target = arr.size() / 2;
        int curr_len = arr.size();

        for (int i : arr)
            mp[i]++;

        vector<pair<int, int>> v;
        for (auto& k : mp)
            v.push_back(k);

        sort(v.begin(), v.end(), [](const auto& l, const auto& r) {
            return l.second > r.second;
        });

        int res = 0;
        for (auto& k : v) {
            curr_len -= k.second;
            res++;
            if (curr_len <= target)
                return res;
        }
        return res;
    }
};
```
