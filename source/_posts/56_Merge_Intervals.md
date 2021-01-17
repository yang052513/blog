---
title: 56. Merge Intervals
date: 2021-01-14 23:51:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 56. Merge Intervals

Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return **an array of the non-overlapping intervals that cover all the intervals in the input**.

## Examples

### Example 1:

```code
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
```

### Example 2:

```code
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

## Constraints:

- **1 <= intervals.length <= 10<sup>4</sup>**
- **intervals[i].length == 2**
- **0 <= starti <= endi <= 10<sup>4</sup>**

## Solutions

We first **pre-sort** the `intervals` array in order to compare to its adjacents.

Let's first consider some cases and see how the merge process works.

Suppose `interval[i] = [1, 4]`, and `interval[i+1] = [2, 3]`. 2 is in interval `[1, 4]` so there is an overlapping. 3 is smaller than 4, so the merged result will be `[1, 4]`.

Now imagine we have `interval[i] = [1, 4]` and `interva[i+1] = [3, 8]`. `3` is inside the interval of `interval[i]`, so we know overlapping exists. However, since the `[3, 8]` end with `8` and is larger than `4`, after merge the interval will expand to `[1, 8]`.

You can see that we only merge **if the first interval end greater or equal to second interval start**.
and the merged interval end will depend on `max(end1, end2)`. Since we already sorted the array, `start1` will always smaller than `start2`.

> The condition can be equal because if we have [1,4] and [4,5], they are still consider overlapping because 4 is **included** in both intervals.

After knowing the check conditions, we can start our algorithm:

We create `res` array holding our final results., and sort the given array `intervals`.

Push the first element in `intervals` to `res`, and declare a variable `pos` for holding `res` index. We are using a `two pointer` approach that `pos` pointing to the index of `res`.

Now we iterate the `intervals`, everytime we check the intervals between `res[pos]` and `intervals[i]`. If the merge condition satisfied, we **replace `res[pos]` with the new interval**. However, we **dont increment pos** because we **dont know** if next element may or may not be able to merge with `res[pos]`

If not, we just push the current `intervals[i]` to `res` and update `pos`.

### Exmaple

Given `[[1,3],[2,6],[8,10],[15,18]]`.

```code
After sort: [1,3], [2,6], [8,10], [15,18]
res = {1,3} // push first element

i = 1   start1 = 1  end1 = 3    start2 = 2  end2 = 6    3 >= 2      res[0] = {1, 6}         pos = 0
i = 2   start1 = 1  end1 = 6    start2 = 8  end2 = 10   6 < 10      res.push_back({8,10})   pos = 1
i = 3   start1 = 8  end1 = 10   start2 = 15 end2 = 18   10 < 15     res.push_back({10,15})  pos = 2
break

res = {{1,6}, {8,10}, {10,15}}
```

### Code

```c++
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.size() == 1)
            return intervals;

        vector<vector<int>> res;
        sort(intervals.begin(), intervals.end());
        res.push_back({intervals[0][0], intervals[0][1]});

        int pos = 0;
        for (int i = 1; i < intervals.size(); i++) {
            int start1 = res[pos][0], end1 = res[pos][1],
                start2 = intervals[i][0], end2 = intervals[i][1];

            if (end1 >= start2)
                res[pos] = {start1, max(end1, end2)};
            else {
                res.push_back({start2, end2});
                pos++;
            }
        }

        return res;
    }
};
```

A cleaner way to improve above code, similar algorithm but using the last element to compare with `intervals[i]`.

```c++
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.size() == 1)
            return intervals;

        vector<vector<int>> res;
        sort(intervals.begin(), intervals.end());
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
