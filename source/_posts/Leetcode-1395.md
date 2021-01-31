---
title: 1395. Count Number of Teams
date: 2021-01-15 23:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Brute Force"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1395. Count Number of Teams

There are n soldiers standing in a line. Each soldier is assigned a **unique** `rating value`.

You have to form a team of 3 soldiers amongst them under the following rules:

- Choose 3 soldiers with index `(i, j, k)` with rating `(rating[i], rating[j], rating[k])`.
- A team is valid if: `(rating[i] < rating[j] < rating[k])` or `(rating[i] > rating[j] > rating[k])` where (0 <= i < j < k < n).

Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).

## Examples

### Example 1:

```code
Input: rating = [2,5,3,4,1]
Output: 3
Explanation: We can form three teams given the conditions. (2,3,4), (5,4,1), (5,3,1).

```

### Example 2:

```code
Input: rating = [2,1,3]
Output: 0
Explanation: We can't form any team given the conditions.

```

### Example 3:

```code
Input: rating = [1,2,3,4]
Output: 4
```

## Constraints:

- n == rating.length
- 3 <= n <= 1000
- 1 <= rating[i] <= 10^5
- All the integers in `rating` are **unique**.

## Solutions

### 1. Math (Combinations)

For each element, we count how many elements in the left side of the current element are smaller, and how many elements in the right side of the current element are greater. Then using math to calculate the combinations of possible picks.

For example, `[2, 5, 3, 4, 1]`. We start with element `2`, and after count we get `L = 0` and `R = 3`.

A team can be valid if either increasing or decreasing. For increasing case (nums[i] < nums[j] < nums[k]), the number of combinations is `left * right` because **left counts number of elements smaller than 2** and **right counts number of elements greater than 2**.

For decreasing cases, it will be the oppisite of the left side calculations. Now for the left we need the get **number of elements greater than 2**, which will be `i-left`. For the right we need to get **number of elements smaller than 2**, which is `total-i-1-right`.

> total-i-1 is the count of people on the right side of current index, minus right which will be the number of elements smaller than 2.

```c++
class Solution {
public:
    int numTeams(vector<int>& rating) {
        int res = 0, total = rating.size();

        for (int i = 0; i < total; i++) {
            int left = 0, right = 0;
            // count left
            for (int j = 0; j < i; j++)
                if (rating[j] < rating[i]) left++;
            // count right
            for (int k = i+1; k < rating.size(); k++)
                if (rating[k] > rating[i]) right++;

            res += (left*right) + (i-left) * (total-i-1-right);
        }
        return res;
    }
};
```
