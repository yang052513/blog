---
title: 945. Minimum Increment to Make Array Unique
date: 2021-02-03 11:53:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 945. Minimum Increment to Make Array Unique

Given an array of integers A, a move consists of choosing any `A[i]`, and incrementing it by `1`.

Return the least number of moves to make every value in `A` unique.

## 示例

### 示例 1:

```code
Input: [1,2,2]
Output: 1
Explanation:  After 1 move, the array could be [1, 2, 3].
```

### 示例 2:

```code
Input: [3,2,1,2,1,7]
Output: 6
Explanation:  After 6 moves, the array could be [3, 4, 1, 2, 5, 7].
It can be shown with 5 or less moves that it is impossible for the array to have all unique values.
```

## 提示:

- 0 <= A.length <= 40000
- 0 <= A[i] < 40000

## Solutions

### 1. 暴力求解 (超时)

先来看下如果用暴力枚举来找到最小移动次数.

例如示例 1, `[1,2,2]`. 我们首先对数组排序得到 `[1,2,3]`.

然后依次从第一个元素开始对比前一个元素, 如果当前元素**小于等于**前一个元素, 我们递增当前元素并记录`move`直到当前元素大于前一个元素.

`2`递增 1 后得到 3 与前一个元素不同, 得到最小移动`1`.

```c++
class Solution {
public:
    int minIncrementForUnique(vector<int>& A) {
        if (A.size() <= 1) return 0;

        sort(A.begin(), A.end());
        int res = 0;
        for (int i = 1; i < A.size(); i++) {
            while (A[i] <= A[i-1]) {
                A[i]++;
                res++;
            }
        }

        return res;
    }
};
```

### 2. 优化暴力求解

从上面暴力求解中, 我们可以对`while`循环做优化. 在之前的`while`循环中, 我们是模拟递增的过程并一步一步记录`move`, 有没有可能直接计算所需要移动的步数呢?

其实移动的步数可以直接用**当前元素减去前一个元素的绝对值 + 1**就是当前元素所需要移动的步数. 为什么是绝对值? 因为在遍历过程中, 前一个元素移动步数变为其他数字后有可能大于当前元素.

例如 `[2, 2, 2, 2]`.索引 2 的`2`与前一个`2`相差 0, 所以只需要**递增 1 步**变为`3`即可, 这时候数组为 `[2, 3, 2, 2]`.

索引 3 的`2`需要**递增与上一个元素的绝对值差值 + 1**, 所以需要递增**2 步**. 这时候数组为 `[2, 3, 4, 2]`.

最后一个 2, 与上一个元素相差了`2`, 因此最后一个 2 需要递增**3 步**变为 5 最终使得数组全为独特元素.

最后得到 `[2,3,4,5]`. 共移动 `1+2+3` 6 步.

不难看出, 我们上面用差值计算需要移动的步数就是**模拟了暴力求解中的 while 循环**, 在`while`循环中, `A[i] <= A[i-1]`的过程就是在求**两元素的差值**. 例如我们上面的例子 `[2, 3, 4, 2]`. 暴力求解就相当于在 `2 <= 4`的过程中不断递增 2 为 `3, 4, 5`. 2 到 5 就是 2 与 4 的差值加 1 (加 1 因为要大于前一个元素).

因此, 我们只需要把暴力求解中的 while 循环部分简化即可. 代码如下

```c++
class Solution {
public:
    int minIncrementForUnique(vector<int>& A) {
        if (A.size() <= 1) return 0;

        sort(A.begin(), A.end());
        int res = 0, move;
        for (int i = 1; i < A.size(); i++) {
            if(A[i] <= A[i-1]) {
                move = abs(A[i]-A[i-1])+1;
                res += move;
                A[i] += move;
            }
        }

        return res;
    }
};
```
