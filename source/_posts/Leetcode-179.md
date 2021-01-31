---
title: 179. Largest Number
date: 2021-01-20 22:30:23
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 179. Largest Number

Given a list of non-negative integers `nums`, arrange them such that they form the largest number.

**Note**: The result may be very large, so you need to return a string instead of an integer.

## Examples

### Example 1:

```code
Input: nums = [10,2]
Output: "210"
```

### Example 2:

```code
Input: nums = [3,30,34,5,9]
Output: "9534330"

```

### Example 3:

```code
Input: nums = [1]
Output: "1"
```

### Example 4:

```code
Input: nums = [10]
Output: "10"
```

## Constraints:

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 10<sup>9</sup>

## Solutions

### 1. Simulation

Suppose we have `nums = [3, 4, 5, 2, 9]`. To find the largest number we could sort the array and then combine them to a string, which gives us `95432`. That's looks like a valid logic. However for our example 2 `nums = [3, 30, 34, 5, 9]`.
After sorting the array by the leading digit we got `[9, 5, 34, 30, 3]`. If we use our logic we got `9534303` yet we could get larger number by placing 3 before 30.

The idea to sort descending seems like we are on the right path, and we just need to conside how to sort if we encounter digits with same leading digit.

We could by checking their concatenation and compare which one is larger. For example, if we are compare `30` and `3`, which one should come first? We compare by convert them into string and added them up, which become `303` and `330`. Now it will be obviously `330` > `303` so `3` should before `30`.

Once we know how to compare two digits, then we can implement the custom comparator to sort the array.

In case the `nums [0, 0]` which we end up with `00`. We could check if first character is `0` then return `0`

```c++
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        string res;
        sort(nums.begin(), nums.end(), [](const auto& lhs, const auto& rhs) {
            string s1 = to_string(lhs), s2 = to_string(rhs);
            return s1+s2 > s2+s1;
        });

        if (nums[0] == 0) return "0";

        for (int i : nums) res += to_string(i);

        return res;
    }
};
```
