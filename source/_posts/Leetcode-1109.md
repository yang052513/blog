---
title: 1109. Corporate Flight Bookings
date: 2021-02-02 23:58:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Math"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1109. Corporate Flight Bookings

There are `n` flights, and they are labeled from `1` to `n`.

We have a list of flight bookings. The `i-th` booking `bookings[i] = [i, j, k]` means that we booked `k` seats from flights labeled `i` to `j` inclusive.

Return an array `answer` of length `n`, representing the number of seats booked on each flight in order of their label.

## 示例

### 示例 1:

```code
Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
Output: [10,55,45,25,25]
```

## 提示:

- 1 <= bookings.length <= 20000
- 1 <= bookings[i][0] <= bookings[i][1] <= n <= 20000
- 1 <= bookings[i][2] <= 10000

## Solutions

### 差分

```code
[1, 2, 10], [2, 3, 20], [2, 5, 25]  n = 5

0       1       2       3       4
10     45      -10     -20      0
10     55      45      25       25

```

```c++
class Solution {
public:
    vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {
        vector<int> res(n, 0);

        for (int i = 0; i < bookings.size(); i++) {
            res[bookings[i][0]-1] += bookings[i][2];

            if (bookings[i][1] < res.size())
                res[bookings[i][1]] -= bookings[i][2];
        }

        for (int i = 1; i < res.size(); i++)
            res[i] += res[i-1];

        return res;
    }
};
```
