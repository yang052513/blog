---
title: 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold
date: 2021-02-01 21:20:28
tags: ["Leetcode", "Algorithm", "Medium", "Sliding Window"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

Given an array of integers `arr` and two integers `k` and `threshold`.

Return the number of sub-arrays of size `k` and average greater than or equal to `threshold`.

## 示例

### 示例 1:

```code
Input: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
Output: 3
Explanation: Sub-arrays [2,5,5],[5,5,5] and [5,5,8] have averages 4, 5 and 6 respectively. All other sub-arrays of size 3 have averages less than 4 (the threshold).
```

### 示例 2:

```code
Input: arr = [1,1,1,1,1], k = 1, threshold = 0
Output: 5
```

### 示例 2:

```code
Input: arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
Output: 6
Explanation: The first 6 sub-arrays of size 3 have averages greater than 5. Note that averages are not integers.
```

### 示例 3:

```code
Input: arr = [7,7,7,7,7,7,7], k = 7, threshold = 7
Output: 1
```

### 示例 4:

```code
Input: arr = [4,4,4,4], k = 4, threshold = 1
Output: 1
```

## 提示:

- There will be at most **40000** operations considering both `add` and `getProduct`.
- 0 <= num <= 100
- 1 <= k <= 40000

## 解题思路

### 滑动窗口

初始化前`k`个元素的总和并判断其平均值是否大于等于`threshold`. 之后则进行滑动窗口移动子数组, 每次判断是否平均值能够大于等于`threshold`。

```c++
class Solution {
public:
    int numOfSubarrays(vector<int>& arr, int k, int threshold) {
        int target = k * threshold;
        int j = 0;
        int res = 0;

        int sum = accumulate(arr.begin(), arr.begin()+k, 0);
        if (sum >= target) {
            res++;
        }

        for (int i = k; i <= arr.size()-k; i++, j++) {
            sum += arr[i] - arr[j];
            if (sum >= target) {
                res++;
            }
        }
        return res;
    }
};
```
