---
title: 287. Find the Duplicate Number
date: 2021-01-23 22:13:26
tags: ["Leetcode", "Algorithm", "Medium", "Binary Search", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 287. Find the Duplicate Number

Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.

There is **only one repeated number** in `nums`, return this repeated number.

## Examples

### Example 1:

```code
Input: nums = [1,3,4,2,2]
Output: 2
```

### Example 2:

```code
Input: nums = [3,1,3,4,2]
Output: 3
```

### Example 3:

```code
Input: nums = [1,1]
Output: 1
```

### Example 4:

```code
Input: nums = [1,1,2]
Output: 1
```

## Note:

- 2 <= n <= 3 \* 10<sup>4</sup>
- nums.length == n + 1
- 1 <= nums[i] <= n
- All the integers in nums appear only once except for precisely one integer which appears two or more times.

## Follw up:

- How can we prove that at least one duplicate number must exist in `nums`?
- Can you solve the problem without modifying the array `nums`?
- Can you solve the problem using only constant, `O(1)` extra space?
- Can you solve the problem with runtime complexity less than **O(n<sup>2</sup>)**?

## Solutions

### Binary Search

For the first follow up, we could prove that with [Pigeonhole principle](https://zh.wikipedia.org/wiki/%E9%B4%BF%E5%B7%A2%E5%8E%9F%E7%90%86), which described as if there are `n` items to put into `m` containers and `n >= m`, then there at least exist one container has more than one item. For our question, all the numbers are generated from 1 to n, if there is such duplicate exist, then it is definitly exist in the right or left range in the array, which we could use binary search method.

For the second follow up, it restricts us to not use `sort` and then check adjacent elements.

For the third follow up, we cant use `map` or `set` as well which will not meet space requirement.

For the last follow up, we are not allowed use `brute force` approach.

Basically the follow up restricts all the intuitive approach, otherwise it will be a `easy` category question.

The question give us an array of integers containing `n+1` integers, and all the elements in the array are in the range `[1, n]`. With a range specifc condition, we could also use binary search to solve this problem.

For example we have `n = 4` then the array might be `[1, 3, 4, 2, 2]`.

We do the binary search to `n`, and first find `m = 2`. Here is the important part, the integer are start from 1. If **there is a duplicate number**, then it will definitely locate in the left or the right of the `m`. Therefore, we could iterate the array and **count the number of elements smaller and equal to `m`**. If the count is greater than `m`, then the duplicate number will be in the **left of m**.

Back to our example, we have `m = 2` at first. Then we iterate `nums` find `1, 2, 2` are smaller or equal to `2`, and we end up with count equal to 3. We know that the duplicate number is in left range and we change `r = 2`. Now for range `1, 2` the `m` become 1. We iterate the array again and we only get 1 number satisfy which is 1. So the duplicate number will locate in right and we end up l = 2.

> The key to use binary search for this question is instead we search in the array, we do binary search for the given range and find out the valid range that contains duplicate number.

```c++
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int l = 0, r = nums.size()-1, m, cnt;

        while (l <= r) {
            m = l + (r-l)/2;
            cnt = 0;
            for (int i : nums)
                if (i <= m)
                    cnt++;

            if (cnt > m) r = m-1;
            else l = m+1;
        }
    }
};

```
