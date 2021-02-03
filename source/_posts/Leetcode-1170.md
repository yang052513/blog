---
title: 1170. Compare Strings by Frequency of the Smallest Character
date: 2021-02-02 23:54:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1170. Compare Strings by Frequency of the Smallest Character

Let the function `f(s)` be the **frequency of the lexicographically smallest character** in a non-empty string `s`. For example, if `s = "dcce"` then `f(s) = 2` because the lexicographically smallest character is `'c'`, which has a frequency of `2`.

You are given an array of strings `words` and another array of query strings `queries`. For each query `queries[i]`, count the **number of words** in `words` such that `f(queries[i]) < f(W)` for each `W` in words.

Return an integer array `answer`, where each `answer[i]` is the answer to the `ith` query.

## 示例

### 示例 1:

```code
Input: queries = ["cbd"], words = ["zaaaz"]
Output: [1]
Explanation: On the first query we have f("cbd") = 1, f("zaaaz") = 3 so f("cbd") < f("zaaaz").
```

### 示例 2:

```code
Input: queries = ["bbb","cc"], words = ["a","aa","aaa","aaaa"]
Output: [1,2]
Explanation: On the first query only f("bbb") < f("aaaa"). On the second query both f("aaa") and f("aaaa") are both > f("cc").
```

## 提示:

- 1 <= queries.length <= 2000
- 1 <= words.length <= 2000
- 1 <= queries[i].length, words[i].length <= 10
- queries[i][j], words[i][j] consist of lowercase English letters.

## Solutions

### 排序

需要找到对于`queries`中每个单词的最小字母的频率大于`words`中的数量. 例如示例 2, `queries = [bbb, cc]`, `words = [a, aa, aaa, aaaa]`.

`queries`中第一个单词`bbb`最小字母就为`b`频率为 3, 则需要在`words`中找到频率**大于 3**的单词. 只有`aaaa`满足条件所以`bbb`单词的结果为 1.

因此需要一个函数来对`query`中每个单词找到最小的字母并计数频率, 然后依次遍历`words`是否有满足的结果.

下面用的暴力解法, 有时间需要用二分法优化,

```c++
class Solution {
public:
    int freq(string s) {
        int cnt = 0;
        char min_char = s[0];

        for (char c: s) {
            if (c < min_char) {
                min_char = c;
                cnt = 1;
            } else if (c == min_char)
                cnt++;
        }
        return cnt;
    }

    vector<int> numSmallerByFrequency(vector<string>& queries, vector<string>& words) {
        vector<int> res(queries.size(), 0);

        for (int i = 0; i < queries.size(); i++) {
            int m = freq(queries[i]);
            for (string s : words) {
                if (m < freq(s))
                    res[i]++;
            }
        }

        return res;
    }
};
```
