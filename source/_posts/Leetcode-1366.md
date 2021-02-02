---
title: 1366. Rank Teams by Votes
date: 2021-02-01 20:02:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1366. Rank Teams by Votes

In a special ranking system, each voter gives a rank from **highest to lowest** to all teams participated in the competition.

The ordering of teams is decided by who received the most position-one votes. If **two or more teams tie** in the first position, we consider the second position to resolve the conflict, if they tie again, we continue this process until the ties are resolved. If two or more teams are still tied after considering all positions, we rank them alphabetically based on their team letter.

Given an array of strings `votes` which is the votes of all voters in the ranking systems. Sort all teams according to the ranking system described above.

Return **a string of all teams** `sorted` by the ranking system.

## 示例

### 示例 1:

```code
Input: votes = ["ABC","ACB","ABC","ACB","ACB"]
Output: "ACB"
Explanation: Team A was ranked first place by 5 voters. No other team was voted as first place so team A is the first team.
Team B was ranked second by 2 voters and was ranked third by 3 voters.
Team C was ranked second by 3 voters and was ranked third by 2 voters.
As most of the voters ranked C second, team C is the second team and team B is the third.
```

### 示例 2:

```code
Input: votes = ["WXYZ","XYZW"]
Output: "XWYZ"
Explanation: X is the winner due to tie-breaking rule. X has same votes as W for the first position but X has one vote as second position while W doesn't have any votes as second position.
```

### 示例 3:

```code
Input: votes = ["ZMNAGUEDSJYLBOPHRQICWFXTVK"]
Output: "ZMNAGUEDSJYLBOPHRQICWFXTVK"
Explanation: Only one voter so his votes are used for the ranking.
```

### 示例 4:

```code
Input: votes = ["BCA","CAB","CBA","ABC","ACB","BAC"]
Output: "ABC"
Explanation:
Team A was ranked first by 2 voters, second by 2 voters and third by 2 voters.
Team B was ranked first by 2 voters, second by 2 voters and third by 2 voters.
Team C was ranked first by 2 voters, second by 2 voters and third by 2 voters.
There is a tie and we rank teams ascending by their IDs.
```

### 示例 5:

```code
Input: votes = ["M","M","M","M"]
Output: "M"
Explanation: Only team M in the competition so it has the first rank.
```

## 提示:

- 1 <= votes.length <= 1000
- 1 <= votes[i].length <= 26
- votes[i].length == votes[j].length for 0 <= i, j < votes.length.
- votes[i][j] is an English upper-case letter.
- All characters of votes[i] are unique.
- All the characters that occur in votes[0] also occur in votes[j] where 1 <= j < votes.length.

## 解题思路

### 排序

简单来说 `votes`数组内字符的顺序为投票者对**参赛队伍**个人意愿的排序. 比如 "ABC" 一共有 3 个队伍, 我认为 A 最好, C 其次, 最后是 B. 那我的投票就是 `ACB`.

再来看如何对比赛结果排序. 得第一名票数最多的队伍为优胜. 如果出现第一名票数相同比如`示例2`, 就比较他们第二名的票谁多。如果每个名次票数都相同例如`示例4`, 则按照字母顺序返回名次.

所以我们的思路就是对依次遍历`votes`, 把每一个队伍相应排名的票数记录在哈希表中. 比如示例 1 中我们可以得到如下哈希表

```code
A: [5, 0, 0]
B: [0, 2, 3]
C: [0, 3, 2]
```

最后我们选`votes`内任意一个元素按哈希表中排名的票数排序即可.

```c++
class Solution {
public:
    string rankTeams(vector<string>& votes) {
        unordered_map<char, vector<int>> mp;

        for (auto& s : votes) {
            for (int i = 0; i < s.size(); i++) {
                mp[s[i]].resize(s.size());
                mp[s[i]][i]++;
            }
        }

        string res = votes[0];
        sort(res.begin(), res.end(), [&](char l, char r) {
            return mp[l] > mp[r] || mp[l] == mp[r] && l < r;
        });

        return res;
    }
};
```
