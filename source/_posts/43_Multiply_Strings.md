---
title: 43. Multiply Strings
date: 2021-01-14 23:50:24
tags: ["Leetcode", "Algorithm", "Medium", "Math", "String"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 43. Multiply Strings

Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string.

**Note**: You must not use any built-in BigInteger library or convert the inputs to integer directly.

## Examples

### Example 1:

```code
Input: num1 = "2", num2 = "3"
Output: "6"
```

### Example 2:

```code
Input: num1 = "123", num2 = "456"
Output: "56088"
```

## Constraints:

- `1 <= num1.length, num2.length <= 200`
- `num1` and `num2` consist of digits only.
- Both `num1` and `num2` do not contain any leading zero, except the number `0` itself.

## Solutions

Two digits multiply, the maximum number of digits will be **the sum of the two digits length**. However, it can be less depending on the two digits. For example `123 * 456 = 56088`. `999 * 999 = 998001`.

Thus, we could first create a `res` string variable with length `num1.length() + num2.length()`, and then figure out how to put product result to corresponding positions.

For example `23 * 34`. We know the maximum length will be 4 digits, so we declare a string with length of 4 and initialize with `0` for each position.

`0 0 0 0`

Start from backward for two numbers and calculate their product. `3 * 4 = 12`. We put the **reminder** into `i+j+1` position, and **divider** into the `i+j`. So our string looks like below

`0 0 1 2`

Keep doing the same process and we will get the results below

```code
0      0       1       2
0      0       8
0      6       9
```

Then we just need to sum all of them will get the products. In the code below, we are incrementing `i+j+1` position every time, so the `i+j+1` is always the latest computation.

The Last thing is to check leading `0` because our string placeholder may be too much. We can do so by itertaing the `res` and break once we found `0` or loop is done.

### 1. Math

```c++
class Solution {
public:
    string multiply(string num1, string num2) {
        int m = num1.length(), n = num2.length();
        string res(m+n, '0');

        for (int i = m-1; i >= 0; i--) {
            for (int j = n-1; j >= 0; j--) {
                int prod = (res[i+j+1]-'0') + (num1[j]-'0') * (num2[i]-'0');
                res[i+j+1] = (prod % 10) + '0';
                res[i+j] += prod / 10;
            }
        }

        for (int i = 0; i < res.length(); i++) {
            if (res[i] != '0' || i == res.length()-1)
                return res.substr(i);
        }

        return "";
    }
};
```
