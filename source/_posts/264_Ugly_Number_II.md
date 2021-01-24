---
title: 264. Ugly Number II
date: 2021-01-23 22:13:26
tags: ["Leetcode", "Algorithm", "Medium", "Math", "Dynamic Programming"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 264. Ugly Number II

Write a program to find the `n-th` ugly number.

Ugly numbers are **positive numbers** whose prime factors only include `2, 3, 5`.

## Examples

### Example 1:

```code
Input: n = 10
Output: 12
Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.
```

## Note:

- 1 is typically treated as an ugly number.
- n does not exceed 1690.

## Solutions

### Dynamic Programming

For question `Ugly Number`, we know that we can just divide the number with `2, 3, 5`. If the final number is 1 then it is ugly number. We could implement the same function `isUgly` and iterate from `1 to n` to generate the `n-th` ugly number. However, that approach is not efficient and fast. Instead, we could use dynamic programming and build ugly number based on ugly number.

Since the ugly number's prime factors include `2, 3, 5`, and we could get another ugly number by multiply `2, 3, or 5` to another ugly number. For example, suppose we start with 1, then we multiply with 2 will get 2. We can keep multiply get `4, 8, 16...` so on. We can even multiply any of these number to `3 or 5` since they are already 2's multiple, multiplying 3 or 5 will still be the ugly number.

The question asks the nth ugly number, so we need to consider the order as well. When should we multiply `2, 3, or 5`?
We can do so by using three pointers for `2, 3, 5` factors and everytime take the minimum one to push into the array.

```c++
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> res(n, 1);

        int p2 = 0, p3 = 0, p5 = 0;
        for (int i = 1; i < n; i++) {
            res[i] = min({res[p2]*2, res[p3]*3, res[p5]*5});

            // check which pointer got multiply and increment it
            if (res[i] == res[p2]*2) p2++;
            if (res[i] == res[p3]*3) p3++;
            if (res[i] == res[p5]*5) p5++;
        }

        return res[n-1];
    }
};
```
