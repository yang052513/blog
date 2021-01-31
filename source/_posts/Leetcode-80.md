---
title: 80. Remove Duplicates from Sorted Array II
date: 2021-01-30 11:10:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 80. Remove Duplicates from Sorted Array II

Given a sorted array `nums`, remove the duplicates `in-place` such that duplicates appeared **at most twice** and return the new length.

Do not allocate extra space for another array; you must do this by **modifying the input array `in-place` with O(1) extra memory**.

## 示例

### 示例 1:

```code
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3]
Explanation: Your function should return length = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively. It doesn't matter what you leave beyond the returned length.
```

### 示例 2:

```code
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3]
Explanation: Your function should return length = 7, with the first seven elements of nums being modified to 0, 0, 1, 1, 2, 3 and 3 respectively. It doesn't matter what values are set beyond the returned length.
```

## 提示:

- **1 <= nums.length <= 3 \* 10<sup>4</sup>**
- **-10<sup>4</sup> <= nums[i] <= 10<sup>4</sup>**
- **nums is sorted in ascending order.**

## Solutions

### 双指针

根据题目要求不能利用额外的空间, 那我们只能 `in-place swap`. 虽然说题目名称为删除数组内的重复元素, 但通过示例的解释, 其实我们只是把重复的元素挪到数组最后面只返回不重复的长度.

由于我们需要保留重复的元素最多只出现 2 次, 因此可以用一个`cnt`变量来记录当前元素出现的次数.

要判断当前元素和前一个元素是否相同, 同理可以用一个`temp`变量来记录上一个元素值. 如果与当前元素相同我们递增`cnt`并检查`cnt`是否超过 2 次, 反之重新给`temp`赋值为当前值.

最后一个问题就是什么时候`swap`, 谁和谁`swap`? 这也就是用到双指针的地方. 我们用一个指针`j`来记录**有效的索引**。有效是指索引之前的元素都只出现过一次或最多 2 次, 也是我们最终返回的长度. 只有当**当前元素与`temp`相等且`cnt`已经大于 2 的时候**我们不移动`j`指针不`swap`. 因为这时候`j`索引的元素出现超过 2 次, 我们需要找到**下一个有效的元素**与`j`互换. 其余的情况我们都要互换`nums[i], nums[j]`.

例如 `[0,0,1,1,1,1,2,3,3]`. 在 `i = 0`时, `swap(nums[0], nums[0])`, 此时互换`i, j`就是互换元素自身. `i = 1`还是 0 但是满足出现次数小于 2 次, 我们依旧`swap(nums[1], nums[1])`.

但在 `i = 4`的时候, 1 已经出现过了 2 次, 这个时候索引 4 需要另外的元素来满足题目条件. 所以我们**不移动`j`**, 直到能够找到下一个不为 1 的元素.

在`i = 6`, 我们得到 2, 这个时候可以与`j`互换. `swap(nums[6], nums[4])`, 然后移动`j`到下一个索引. 数组为如下:

`[0, 0, 1, 1, 2, 1, 2, 3, 3]`.

因为我们最终返回`j`, 所以`j`之后的元素都不需要担心. 遍历完数组后, **`j`之前的元素必然都满足题目要求，出现一次或最多 2 次**.

详细的迭代过程如下, 数组以`[1,1,1,2,2,3]`为例.

```code
i = 0   j = 0   temp = INT_MIN (初始化为INT_MIN第一个元素必然为有效)
1   1   1   2   2   3
^
1 != INT_MIN    temp = 1    swap(nums[0], nums[0])  cnt = 1    j = 1


i = 1   j = 1   temp = 1
1   1   1   2   2   3
    ^
1 == temp       cnt < 2     swap(nums[1], nums[1])  cnt = 2    j = 2


i = 2   j = 2   temp = 1
1   1   1   2   2   3
        ^
1 == temp       cnt > 2     这个时候需要保留j的位置不移动, 直到找到下一个元素不为1


i = 3   j = 2   temp = 1
1   1   1   2   2   3
        _   ^
2 != temp       temp = 2    swap(nums[3], nums[2])  cnt = 1     j = 3


i = 4   j = 3   temp = 2
1   1   2   1   2   3
            _   ^
2 == temp       cnt < 2     swap(nums[4], nums[3])  cnt = 2     j = 4


i = 5   j = 4   temp = 2
1   1   2   2   1   3
                _   ^
3 != temp       temp = 3    swap(nums[5], nums[4])  cnt = 1     j = 5


最后得到
1   1   2   2   3   1
                    _

最终返回j = 5, 因为0-based index, 所以j的索引就是新数组的长度
```

```c++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int j = 0, cnt = 0, temp = INT_MIN;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] != temp) {
                temp = nums[i];
                swap(nums[i], nums[j++]);
                cnt = 1;
            } else {
                if (cnt < 2) {
                    swap(nums[i], nums[j++]);
                    cnt++;
                }
            }
        }
        return j;
    }
};
```
