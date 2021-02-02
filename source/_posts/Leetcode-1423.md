---
title: 1423. Maximum Points You Can Obtain from Cards
date: 2021-02-01 19:23:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sliding Window"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1423. Maximum Points You Can Obtain from Cards

There are several cards **arranged in a row**, and each card has an associated number of points The points are given in the integer array `cardPoints`.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly `k` cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array `cardPoints` and the integer `k`, return the **maximum score** you can obtain.

## 示例

### 示例 1:

```code
Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.
```

### 示例 2:

```code
Input: cardPoints = [2,2,2], k = 2
Output: 4
Explanation: Regardless of which two cards you take, your score will always be 4.
```

### 示例 3:

```code
Input: cardPoints = [9,7,7,9,7,7,9], k = 7
Output: 55
Explanation: You have to take all the cards. Your score is the sum of points of all cards.
```

### 示例 4:

```code
Input: cardPoints = [1,1000,1], k = 1
Output: 1
Explanation: You cannot take the card in the middle. Your best score is 1.
```

### 示例 5:

```code
Input: cardPoints = [1,79,80,1,1,1,200,1], k = 3
Output: 202
```

## 提示:

- **1 <= cardPoints.length <= 10<sup>5</sup>**
- **1 <= cardPoints[i] <= 10<sup>4</sup>**
- **1 <= k <= cardPoints.length**

## 解题思路

### 滑动窗口

题目要求每次**只能**从数组的尾端或者起始拿一张卡, 且直到拿到`k`张牌时停止. 要想最大化卡牌的点数, 很明显每次选择卡片时需要选择较的一张.

一开始我用的双指针分别指向左端和右端依次比较, 每次取最大的直到`k = 0`. 但是很明显这个方法行不通因为较小元素后面的元素可能有更大的值.

再观察下其实这个题可以用滑动窗口的思路来解决. 想象一下如果`k = 1`我们只能拿一张牌, 那可以直接比较头尾元素选择大的即可.

那如果 `k = 2` 我们要拿 2 张牌呢? 现在我们有三种情况: 只拿左边 2 张, 左右各拿一张, 或者只拿右边 2 张.

如果 `k = 3`

1. 左边 3 张
2. 左边 2 张, 右边 1 张
3. 左边 1 张, 右边 2 张
4. 右边 3 张

因此我们起始只拿左边`k`张牌得到初始点数总和 `sum`. 然后从右边开始拿牌, 我们每拿**右边一张牌**就要弃掉左边之前拿的一张牌. 更具体来说是**对左边的牌从右往左依次弃掉**. (相像窗口向左滑动)

例如示例 1 `[1,2,3,4,5,6,1]`. 我们一开始选择 `1,2,3`这 3 张牌, 然后我们拿右边`1`这张牌. 这个时候需要减去左边最后一张牌的点数来替换我们右边新的牌的点数. 因为**牌的数量已经固定 (k)**, 所以我们每拿一张就要放弃掉左边的一张. 所以我们用滑动窗口不断用右边的牌换左边的牌, 每次判断是否能得到新的最大点数.

> 一开始也可以只拿右边 k 张牌然后依次替换左边的, 只是滑动的窗口不一样.

```c++
class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int n = cardPoints.size();
        int sum = accumulate(cardPoints.begin(), cardPoints.begin()+k, 0);
        int res = sum;

        for (int i = n-1; k > 0; i--, k--) {
            sum += cardPoints[i] - cardPoints[k-1];
            res = max(res, sum);
        }

        return res;
    }
};
```
