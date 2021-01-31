---
title: 3. Longest Substring Without Repeating Characters
date: 2021-01-10 19:42:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 3 Longest Substring Without Repeating Characters

Given a string `s`, find the length of the **longest substring** without repeating characters.

## 示例

### 示例 1:

```code
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

### 示例 2:

```code
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

### 示例 3:

```code
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

### 示例 4:

```code
Input: s = ""
Output: 0
```

## 提示:

- **0 <= s.length <= 5\*10<sup>4</sup>**
- **`s` consists of English letters, digits, symbols and spaces.**

## 解题思路

### 滑动窗口

这个题目让我们找的一个字符串内**不重复的最长子串**, 也就是说该子串中所有的字符都为独特的。例如`示例1`中`kew`为不重复的最长子串.

要解决这个问题，我们需要先考虑 2 个问题。

1. 如何判断子串中已经有该字符
2. 如果遇到重复字符该如果移动

第一个问题我们可以`set`或者用`string`的`STL`来查找是否存在. 例如我们可以遍历字符时用一个`temp`变量来添加当前字符，每次检查`temp`中是否存在当前字符`s[i]`. 如果不存在我们可以继续往`temp`中添加字符并递增`len`. 如果出现了重复字符比如`示例1`, 在`i = 3`的时候, `temp = "abc"`. `a`已经存在在`temp`中, 这个时候就不需要往上添加字符了。这也就来到了第二个问题, 如何对`temp`处理并尽可能的保留之前的字符。

例如`abc`我们遇到的重复字符为`a`, 我们想尽可能的保留`temp`的长度但删除掉重复字符`a`. 我们发现只需要取`a`之后的**子字符**即可, 也就是说忽略重复字符之前的所有字符。假设`temp = bcae`且当前字符`s[i]`为`a`, 我们只能取`e`因为如果取`a`之前的字符则必然会包括`a`即不满足不重复的要求. 并且题目要求`substring`, 这根子序列不一样，`substring`字符必须互相相邻。

举个例子, 假设`s = pwwkew`. 我们的过程如下:

```code
i = 0   temp = "p"   len = 1     res = 0
i = 1   temp = "pw"  len = 2     res = 0
i = 2   temp = "w"   len = 1     res = 2
i = 3   temp = "wk"  len = 2     res = 2
i = 4   temp = "wke" len = 3     res = 2
i = 5   temp = "w"   len = 1     res = 3
```

解决了这两个问题，我们来看一下代码。`res`为最终最长的长度, `len`为每次所得到的不重复子字符的长度。

遍历字符串`s`, 如果`temp`中不存在该字符则添加该字符并递增长度。

如果`temp`中已经出现了当前字符`s[i]`, 我们取`temp`重复字符之后的子字符。然后判断是否需要更新`len`.

最后返回`res`即可。因为有一种情况为`s`中全部为独特的字符, 所以`else`的条件不会进入。我们最后需要对比`res`和`len`返回最大的。

```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int res = 0, len = 0;
        string temp;

        for (int i = 0; i < s.length(); i++) {
            if (temp.find(s[i]) == string::npos) {
                len++;
                str += s[i];
            } else {
                str += s[i];
                res = len > res ? len : res;
                str = temp.substr(temp.find(s[i])+1);
                len = temp.length();
            }
        }
        return max(len, res);
    }
};
```
