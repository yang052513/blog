---
title: 57. Insert Interval
date: 2021-01-14 23:53:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 57. Insert Interval

Given a set of **non-overlapping** intervals, insert a new interval into the intervals **(merge if necessary)**.

You may assume that the intervals were initially sorted according to their start times.

## Examples

### Example 1:

```code
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

### Example 2:

```code
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
```

### Example 3:

```code
Input: intervals = [], newInterval = [5,7]
Output: [[5,7]]
```

### Example 4:

```code
Input: intervals = [[1,5]], newInterval = [2,3]
Output: [[1,5]]
```

### Example 5:

```code
Input: intervals = [[1,5]], newInterval = [2,7]
Output: [[1,7]]
```

## Constraints:

- 0 <= intervals.length <= 10<sup>4</sup>
- intervals[i].length == 2
- 0 <= intervals[i][0] <= intervals[i][1] <= 10<sup>5</sup>
- intervals is **sorted** by intervals[i][0] in **ascending** order.
- newInterval.length == 2
- 0 <= newInterval[0] <= newInterval[1] <= 10<sup>5</sup>

## Solutions

### 1. Find insert position then Merge

The first approach is to first find the **position** to insert the `newInterval`, then merge the array if necessary.

```c++
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        // Find insertion
        int pos = 0;
        for (int i = 0; i < intervals.size(); i++)
            if (newInterval[0] > intervals[i][0])
                pos++;

        intervals.insert(intervals.begin()+pos, newInterval);

        // Merge
        vector<vector<int>> res;
        res.push_back(intervals[0]);
        for (int i = 1; i < intervals.size(); i++) {
            if (res.back()[1] >= intervals[i][0])
                res.back()[1] = max(res.back()[1], intervals[i][1]);
            else
                res.push_back(intervals[i]);
        }
        return res;
    }
};
```

### 2. One Pass: Merge while iterating

The second approach is similar to [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/). We iterate `intervals`, and if the `newInterval` can be merged with `intervals[i]`, we merge it and reset `newInterval` to the merged intervals.

However, there might have cases that `newInterval` can not be merged with any elements, so the problem will just become **insert to correct spot**. Therefore, this approach may check more conditions and longer than approach 1.

```c++
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        if (intervals.empty()) return {newInterval};

        vector<vector<int>> res(intervals.size()+1, {-1, -1});
        int pos = res.size()-1;

        for (int i = intervals.size()-1; i >= 0; i--) {
            int start1 = intervals[i][0], end1 = intervals[i][1],
                start2 = newInterval[0], end2 = newInterval[1];

            // able to merge -> reset newInterval
            if (end2 >= start1 && start2 <= end1) {
                res[pos] = {min(start1, start2), max(end1, end2)};
                newInterval = res[pos];
            } else {
                // -1 means no elements filled
                if (res[pos][0] == -1) {
                    // can not be merged
                    if (end2 > end1 && start2 > start1) {
                        res[pos--] = newInterval;
                        newInterval = intervals[i];
                    } else
                        res[pos--] = intervals[i];
                }
                else res[--pos] = intervals[i];
            }
        }

        // some cases [0,0] that need to push to front
        vector<vector<int>> temp;
        for (int i = pos; i < res.size(); i++) temp.push_back(res[i]);
        if (temp[0][0] == -1) temp[0] = newInterval;

        return temp;
    }
};
```
