---
title: 962. Maximum Width Ramp
date: 2021-02-03 11:07:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Stack"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 962. Maximum Width Ramp

Given an array `A` of integers, a ramp is a tuple `(i, j)` for which `i < j` and `A[i] <= A[j]`. The width of such a ramp is `j - i`.

Find the maximum width of a ramp in `A`. If one doesn't exist, return 0.

## 示例

### 示例 1:

```code
Input: [6,0,8,2,1,5]
Output: 4
Explanation:
The maximum width ramp is achieved at (i, j) = (1, 5): A[1] = 0 and A[5] = 5.
```

### 示例 2:

```code
Input: [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation:
The maximum width ramp is achieved at (i, j) = (2, 9): A[2] = 1 and A[9] = 1.
```

## 提示:

- 2 <= A.length <= 50000
- 0 <= A[i] <= 50000

## Solutions

### 单调栈

要找到数组中的最大`ramp`, 我们需要尽可能的保持左边的索引较小, 右边的索引越大才能使两端的**索引差值**(ramp)最大.

因此我们可以创建一个**单调递减栈**, 然后从数组右端往左依次遍历, 如果右端元素大于栈的顶部元素则对比是否为最大值.

例如示例 2 `[9,8,1,0,1,9,4,0,4,1]`, 得到一个单调递减栈 `[9, 8, 1, 0]`. 注意这里是**严格递减**, 因为往右遍历的过程中 i 越来越大, 只会使得差值越来越小, 所以我们只保留第一个较小的索引.

之后从数组右侧`1`开始对比栈的顶部元素, 如果当前元素大于**栈的顶部**则满足题目定义可以与最大值做对比看是否需要更新, 然后继续`pop`栈的顶部继续做对比. 因为单调递减栈, 我们需要尽可能地**缩小左边的索引**(尽可能的 pop 栈)并控制右边的索引直到当前元素小于栈的顶部, 我们才缩小右边的索引用下一个元素对比.

最后我们推演示例 1 `[6,0,8,2,1,5]`. 首先得到一个单调递减栈 `[6, 0]`.

然后从`5`开始对比栈的顶部`0`, `5 > 0` 满足条件我们计算 `ramp = 4`.

然后栈的顶拿掉`0`变成`6`. `5 < 6`这个时候我们只能继续往数组左边找看有没有满足元素能够大于 6. 最后来到`8`得到另一个`ramp = 2`, 但是并不是最大的`ramp`, 所以最后返回 4.

> 单调栈记录的是单调递减元素的**索引**, 因为 ramp 的计算涉及到索引的差值, 元素本身只用来对比是否满足 A[i] <= A[j].

```c++
class Solution {
public:
    int maxWidthRamp(vector<int>& A) {
        stack<int> stk;

        for (int i = 0; i < A.size(); i++) {
            if (stk.empty() || A[i] < A[stk.top()]) {
                stk.push(i);
            }
        }

        int res = 0;
        for (int i = A.size()-1; i > 0; i--) {
            while (!stk.empty() && A[i] >= A[stk.top()]) {
                res = max(res, i-stk.top());
                stk.pop();
            }
            if (stk.empty()) {
                break;
            }
        }
        return res;
    }
};
```
