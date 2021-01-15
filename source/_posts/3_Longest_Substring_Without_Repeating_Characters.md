---
title: 3 Longest Substring Without Repeating Characters
date: 2021-01-10 19:42:24
tags: ["Leetcode", "Algorithm", "Medium", "Array"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 3 Longest Substring Without Repeating Characters

Given a string `s`, find the length of the **longest substring** without repeating characters.

## Examples

### Example 1:

```code
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

### Example 2:

```code
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

### Example 3:

```code
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

### Example 4:

```code
Input: s = ""
Output: 0
```

## Constraints:

- 0 <= s.length <= 5\*10^4
- `s` consists of English letters, digits, symbols and spaces.

## Solutions

### 1. Sliding Window

The question is asking the **longest substring** without **repeating characters**, so the characters have to be unique and connect to each other (different with subsequence).

The first approach we could use a temp string variable `str`, and `len` to store the longest substring length.

When we iterate the string `s`. Check two conditions

1. if the current character can not find in our `str`, then the character can be added to our `str` to keep unique
2. else if the current character is already exist in `str`, then we reset `str` to the character after the duplicate one. (example below). We also need to check if the length of `str` is exceed `len`. If so, we replace it.

There is a case that all the characters are unique in `s`. so the result we need compare `res` and `len` to return the max one.

#### Examples

Input: s = "pwwkew"

```code
i = 0   str = "p"   len = 1     res = 0
i = 1   str = "pw"  len = 2     res = 0
```

for i = 2, `w` is already exist in `str`, so we compare `len` and `res`, reset `res` = 2.

Then we need to slice the string start **after the first duplicate character** in order to new `str` unique.

```code
i = 2   str = "w"   len = 1     res = 2
```

Doing the same process until to the end of `s`.

```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int res = 0, len = 0;
        string str;

        for (int i = 0; i < s.length(); i++) {
            if (str.find(s[i]) == string::npos) {
                len++;
                str += s[i];
            // 出现重复的字符 重置str至重复字符之后的substr
            } else {
                str += s[i];
                res = len > res ? len : res;
                str = str.substr(str.find(s[i])+1);
                len = str.length();
            }
        }
        return max(len, res);
    }
};
```
