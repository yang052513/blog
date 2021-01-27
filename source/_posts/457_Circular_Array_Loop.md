---
title: 457. Circular Array Loop
date: 2021-01-27 15:05:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Simulation"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 457. Circular Array Loop

You are given a **circular** array `nums` of positive and negative integers. If a number k at an index is positive, then move forward k steps. Conversely, if it's negative (-k), move backward k steps. Since the array is circular, you may assume that the last element's next element is the first element, and the first element's previous element is the last element.

Determine if there is a loop (or a cycle) in `nums`. A cycle must start and end at the same index and the `cycle's length > 1`. Furthermore, movements in a cycle must all follow a single direction. In other words, a cycle must not consist of both forward and backward movements.

## 示例

### 示例 1:

```code
Input: [2,-1,1,2,2]
Output: true
Explanation: There is a cycle, from index 0 -> 2 -> 3 -> 0. The cycle's length is 3.
```

### 示例 2:

```code
Input: [-1,2]
Output: false
Explanation: The movement from index 1 -> 1 -> 1 ... is not a cycle, because the cycle's length is 1. By definition the cycle's length must be greater than 1.
```

### 示例 3:

```code
Input: [-2,1,-1,-2,-2]
Output: false
Explanation: The movement from index 1 -> 2 -> 1 -> ... is not a cycle, because movement from index 1 -> 2 is a forward movement, but movement from index 2 -> 1 is a backward movement. All movements in a cycle must follow a single direction.
```

## 提示

- **-1000 ≤ nums[i] ≤ 1000**
- **nums[i] ≠ 0**
- **1 ≤ nums.length ≤ 5000**

## 解题思路

### 1. 暴力求解 + 模拟

总结几个关键点:

1. start 起始索引可以是**任意索引**, 并非特定第一个索引
2. 移动不能更改方向. 比如示例 1, 如果从`i = 1`开始, 我们则往后退一步. 退到 `i = 0`时为 2, 这时候需要向前走. 这个就改变了方向.
3. 需要记录已经访问过的点用来退出循环
4. 移动的长度需要大于 1. 注意这个跟元素值无关. 例如示例 1, 从 index 0 移动到 index 2, 长度为 1. 跟 index 0 的 2 步数无关。

第一种比较直观的方法就是遍历所有的索引, 然后对每个索引进行模拟移动, 并初始化`set`来记录已经访问过的点.

首先计算移动的步数, 如果出现越界情况需要取余来找到目标索引位置.

然后得到目标索引我们还要确认是否为相同方向移动. 我们可以直接相乘当前位置和目标位置即可. 因为如果出现负数则必然是一正一负, 方向不同我们可以直接退出循环去下一个索引.

移动到目标索引后我们需要判断是否该索引为**起始索引**且长度大于 1, 如果是我们发现了圆形. 否则我们检查**条件 3**, 是否访问过该索引. 如果访问过索引说明我们陷入了循环, 在走也只是重复相同的路径. 如果未访问过该索引就加入到`set`.

依次类推所有索引.

```c++
class Solution {
public:
    bool circularArrayLoop(vector<int>& nums) {
        if (nums.empty()) return false;
        if (nums.size() == 1) return false;

        int len = nums.size();
        unordered_set<int> visit;
        for (int i = 0; i < nums.size(); i++) {
            int len = 0, curr = i, index = i;
            // clear last iteration visited index
            visit.clear();
            while (true) {
                // move
                index = curr + nums[curr];

                // check boundary
                if (index >= len)
                    index = index % nums.size();
                else if (index < 0)
                    index = nums.size() - (abs(index) % nums.size());

                // check if same direction
                if (nums[curr] * nums[index] < 0) break;

                // update current position to target, and increment length
                curr = index;
                len++;

                // check if it's start position -> circle
                if (curr == i)
                    break;
                // check if has been visited
                else if (visit.find(index) != visit.end())
                    break;
                else visit.insert(index);
            }
            if (curr == i && len > 1) return true;
        }

        return false;
    }
};
```
