---
title: 151. Reverse Words in a String
date: 2021-01-20 22:30:23
tags: ["Leetcode", "Algorithm", "Medium", "String"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 151. Reverse Words in a String

Given an input string s, reverse the order of the **words**.

A \*word** is defined as a sequence of non-space characters. The **words\*\* in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

**Note** that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

## Examples

### Example 1:

```code
Input: s = "the sky is blue"
Output: "blue is sky the"
```

### Example 2:

```code
Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.

```

### Example 3:

```code
Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
```

### Example 4:

```code
Input: s = "  Bob    Loves  Alice   "
Output: "Alice Loves Bob"
```

### Example 5:

```code
Input: s = "Alice does not even like bob"
Output: "bob like even not does Alice"
```

## Constraints:

- **1 <= s.length <= 10<sup>4</sup>**
- s contains English letters (upper-case and lower-case), digits, and spaces `' '`.
- There is **at least one word** in `s`.

## Solutions

### 1. Simulation

By iterating the string `s` backwards. If the current character is valid (upper or lower case character or digit), we added it to `temp`. If the current character is space, then we reset `temp` and continue iterating.

There might have some cases like `Bob loves Alice` which we need to check if `temp` is empty before return result/

In addition, we need to pop the last character because appended with space.

```c++
class Solution {
public:
    string reverseWords(string s) {
        string res, temp;

        for (int i = s.length()-1; i >= 0; i--) {
            if (isalnum(s[i]))
                temp = s[i] + temp;
            else if (isspace(s[i]) && !temp.empty()) {
                res += temp + " ";
                temp = "";
            }
        }

        if (!temp.empty()) res += temp;
        if (isspace(res.back())) res.pop_back();
        return res;
    }
};
```
