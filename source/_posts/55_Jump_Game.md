---
title: 55. Jump Game
date: 2021-01-15 15:07:24
tags: ["Leetcode", "Algorithm", "Medium", "Greedy", "Dynamic Programming"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 55. Jump Game

Given an array of non-negative integers `nums`, you are initially positioned at the **first index** of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

## Examples

### Example 1:

```code
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last inde
```

### Example 2:

```code
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.,6,7]
```

## Constraints:

- 1 <= nums.length <= 3 \* 10^4
- 0 <= nums[i] <= 10

## Solutions

### Simulation

I highly recommend [this video explanation](https://youtu.be/2HnlGToCdCc) which explains how to use Greedy approach to this problem.

Basically instead move forward, we start from the back of the array. We use an variable `pos` to keep the most **reachable** index position from that index. Everytime we check if current index number plus its index can reach to `pos`. If so, we update `pos` to that index. Otherwise we just continue the next element.

After the loop, if `pos == 0`, it means we can start from `index = 0` and reach to the end index.

For example, `[2, 3, 1, 1, 4]`.

We start from the second last element and set `pos = nums.size()-1`.

- At `i = 3`, `nums[3] = 1`, 3 + 1 >= 4(pos) so we ensure that **from index 3 we can reach to last index**. Thus index 3 is a valid index, we set `pos = 3` and decrement `i`.
- At `i = 2`, `nums[2] = 1`, 2 + 1 >= 3(pos) means **from index 2 we can reach to index 3**. Thus index 2 is also a valid index, we set `pos = 2` and also decrement `i`. As you can see here, we are trying to get optimal solution every time, if the index is not valid, we do not count it.
- At `i = 1`, `nums[1] = 3`, 1 + 3 >= 2(pos), so same process `pos = 1`
- Now `i = 0`, `nums[0] = 2`, 0 + 2 >= 1(pos), and `pos = 0`.

`pos = 0` means that from index 0 we could reach to the end index in the array/

Another example will be `[3, 2, 1, 0, 4]`. The process will be the following

- i = 3 nums[3] = 0 3 + 0 >= 4 -> false i-- we keep `pos` at 4 because we cant reach end from index 3
- i = 2 nums[2] = 1 2 + 1 >= 4 -> false i--
- i = 1 nums[1] = 2 1 + 2 >= 4 -> false i--
- i = 0 nums[0] = 3 0 + 3 >= 4 -> false i--

We end up with `pos = 4` which no index can be reached to the end.

```c++
class Solution {
public:
    bool canJump(vector<int>& nums) {
        if (nums.size() == 1)
            return true;

        int pos = nums.size()-1;
        for (int i = nums.size()-2; i >= 0; i--) {
            if (i + nums[i] >= pos)
                pos = i;
        }
        return pos == 0;
    }
};
```
