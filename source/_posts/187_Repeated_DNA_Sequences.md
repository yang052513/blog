---
title: 187. Repeated DNA Sequences
date: 2021-01-21 23:00:12
tags: ["Leetcode", "Algorithm", "Medium", "String", "Sliding Window"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 187. Repeated DNA Sequences

All DNA is composed of a series of nucleotides abbreviated as `A`, `C`, `G`, and `T`, for example: `ACGAATTCCG`. When studying DNA, it is sometimes useful to identify repeated sequences within the DNA.

Write a function to find all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule.

## Examples

### Example 1:

```code
Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]
```

### Example 2:

```code
Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]

```

## Constraints:

- 0 <= s.length <= 10<sup>5</sup>
- s[i] is `A`, `C`, `G`, or `T`.

## Solutions

### 1. Sliding Window

We need to find all the subsequences with length 10 and appears more than once in the original `s`. Obviously we could use `Sliding Window` which inititally find the first 10 character long subsequences. Each time iterate `s` we remove the first character and add the character at index `i+9` (the character after the current last character).

We map the subsequence into a map and finally iterate the map. If the occurrence is greater than `1` we pushed to `res` array.

```c++
class Solution {
public:
    // sliding window and hash map
    vector<string> findRepeatedDnaSequences(string s) {
        if (s.length() < 10) return {};

        vector<string> res;
        unordered_map<string, int> mp;
        string seq;

        for (int i = 0; i < 10; i++)
            seq += s[i];
        mp[seq]++;

        for (int i = 1; i <= s.length()-10; i++) {
            seq = seq.substr(1) + s[i+9];
            mp[seq]++;
        }

        for (auto& k : mp) {
            if (k.second > 1)
                res.push_back(k.first);
        }

        return res;
    }
};
```
