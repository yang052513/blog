---
title: 1535. Find the Winner of an Array Game
date: 2021-01-30 14:01:28
tags: ["Leetcode", "Algorithm", "Medium", "Array"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1535. Find the Winner of an Array Game

Given an integer array arr of **distinct** integers and an integer `k`.

A game will be played between the first two elements of the array (i.e. `arr[0]` and `arr[1]`). In each round of the game, we compare `arr[0]` with `arr[1]`, the larger integer wins and remains at position `0` and the smaller integer moves to the end of the array. The game ends when an integer wins `k` consecutive rounds.

Return **the integer which will win the game.**

It is **guaranteed** that there will be a winner of the game.

## 示例

### 示例 1:

```code
Input: arr = [2,1,3,5,4,6,7], k = 2
Output: 5
Explanation: Let's see the rounds of the game:
Round |       arr       | winner | win_count
  1   | [2,1,3,5,4,6,7] | 2      | 1
  2   | [2,3,5,4,6,7,1] | 3      | 1
  3   | [3,5,4,6,7,1,2] | 5      | 1
  4   | [5,4,6,7,1,2,3] | 5      | 2
So we can see that 4 rounds will be played and 5 is the winner because it wins 2 consecutive games.
```

### 示例 2:

```code
Input: arr = [3,2,1], k = 10
Output: 3
Explanation: 3 will win the first 10 rounds consecutively.,68]]
```

### 示例 3:

```code
Input: arr = [1,9,8,2,3,7,6,4,5], k = 7
Output: 9
```

### 示例 4:

```
Input: arr = [1,11,22,33,44,55,66,77,88,99], k = 1000000000
Output: 99
```

## 提示:

- **2 <= arr.length <= 10<sup>5</sup>**
- **1 <= arr[i] <= 10<sup>6</sup>**
- **arr contains distinct integers.**
- **1 <= k <= 10<sup>9</sup>**

## Solutions

### 模拟

题目比较直观, 每次我们比较`arr[0]`与`arr[1]`这两个元素并把小的元素移动到数组尾端, 较大的元素移动到首位 0 索引. 如果该元素连续`k`次保持在 `0` 索引处, 则该数字为返回的数字.

虽然题目描述说是移动到数组尾端, 但我们并不需要真的把这个元素移动到尾端. 首先观察题目描述, 所有的元素均为**distinct**, 也就是说没有重复元素. 而且`arr[0]`**永远保留较大的**的元素。如果`nums[i] > nums[0]`, 可以直接把`nums[0]`与`nums[i]`替换. 这样保证`nums[0]`一直为最大的. 反之递增`cnt`因为`arr[0]`没有变动.

每次遍历检查`cnt`是否等于`k`, 若等于则可以直接返回该结果.

> 我们只需要遍历一次数组, 不管`k`为多大, 之后就算再遍历`arr[0]`后面的元素也都小于`arr[0]`. 所以可以直接返回`arr[0]`.

例如示例 4, `[1,11,22,33,44,55,66,77,88,99], k = 100000000`.

遍历数组过程中肯定没有元素满足 `cnt == 10000000`, 但遍历完后得到`[99,1,11,22,33,44,55,66,77,88]`. `99`为数组内最大元素, 与任何元素比较都能一直保持在第 0 位. 则必然满足连续赢得 `10000000`回合.

```c++
class Solution {
public:
    int getWinner(vector<int>& arr, int k) {
        int cnt = 0;

        for (int i = 1; i < arr.size(); i++) {
            if (arr[0] > arr[i]) {
                cnt++;
            } else {
                swap(arr[0], arr[i]);
                cnt = 1;
            }
            if (cnt == k) return arr[0];
        }

        return arr[0];
    }
};
```
