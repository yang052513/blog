---
title: 49. Group Anagrams
date: 2021-01-14 23:50:24
tags: ["Leetcode", "Algorithm", "Medium", "String", "HashMap"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 49. Group Anagrams

Given an array of strings strs, group the **anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Examples

### Example 1:

```code
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

### Example 2:

```code
Input: strs = [""]
Output: [[""]]
```

### Example 3:

```code
Input: strs = ["a"]
Output: [["a"]]
```

## Constraints:

- 1 <= strs.length <= 10^4
- 0 <= strs[i].length <= 100
- strs[i] consists of lower-case English letters.

## Solutions

### 1. HashMap

`eat`, `tea` and `aet` are examples of an anagram because they all have same characters with **same occurrence**.

If we sort those three words above by order, they all become `aet`. Therefore, we could sort the word and map in an `unordered_map`. They we could iterate the map and retur the result.

```c++
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        vector<vector<string>> res;

        for (auto& s : strs) {
            string temp = s;
            sort(temp.begin(), temp.end());
            mp[temp].push_back(s);
        }

        for (auto& k : mp)
            res.push_back(k.second);

        return res;
    }
};
```
