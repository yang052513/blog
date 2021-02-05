---
title: 718. Maximum Length of Repeated Subarray
date: 2021-02-04 20:18:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Simulation"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 718. Maximum Length of Repeated Subarray

Given two integer arrays A and B, return the maximum length of an subarray that appears in both arrays.

## 示例

### 示例 1:

```code
Input:
A: [1,2,3,2,1]
B: [3,2,1,4,7]
Output: 3
Explanation:
The repeated subarray with maximum length is [3, 2, 1].
```

## 提示

- 1 <= len(A), len(B) <= 1000
- 0 <= A[i], B[i] < 100

## 解题思路

### 1. 滑动窗口

```code
maxLen = 0
                [1]   2   3   2   1
3   2   1   4   [7]

maxLen = 0
            [1   2]   3   2   1
3   2   1   [4   7]

maxLen = 1
        [1   2   3]   2   1
3   2   [1   4   7]

maxLen = 0
    [1   2   3   2]   1
3   [2   1   4   7]

maxLen = 1
[1   2   3   2   1]
[3   2   1   4   7]

maxLen = 0
1   [2   3   2   1]
    [3   2   1   4]   7

maxLen = 3
1   2   [3   2   1]
        [3   2   1]   4   7

maxLen = 0
1   2   3   [2   1]
            [3   2]   1   4   7

maxLen = 0
1   2   3   2   [1]
                [3]   2   1   4   7
```

```c++
class Solution {
public:
    int findLength(vector<int>& A, vector<int>& B) {
        if (A.size() > B.size()) swap(A, B);

        int res = 0;
        int a = A.size(), b = B.size();

        for (int i = 1; i <= a; i++)
            res = max(res, maxLen(A, 0, B, b-i, i));

        for (int i = b-a; i >= 0; i--)
            res = max(res, maxLen(A, 0, B, i, a));

        for (int i = 1; i < a; i++)
            res = max(res, maxLen(A, i, B, 0, a-i));

        return res;
    }

    int maxLen(vector<int> a, int i, vector<int> b, int j, int len) {
        int cnt = 0, res = 0;
        for (int k = 0; k < len; k++) {
            if (a[i+k] == b[j+k]) {
                cnt++;
            } else if (cnt > 0) {
                res = max(res, cnt);
                cnt = 0;
            }
        }
        return cnt > 0 ? max(res, cnt) : res;
    }

};
```
