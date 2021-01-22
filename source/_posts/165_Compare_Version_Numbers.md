---
title: 165. Compare Version Numbers
date: 2021-01-21 22:39:12
tags: ["Leetcode", "Algorithm", "Medium", "String", "Two Pointers"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 165. Compare Version Numbers

Given two version numbers, `version1` and `version2`, compare them.

Version numbers consist of **one or more revisions** joined by a dot `.`. Each revision consists of digits and may contain **leading zeros**. Every revision contains **at least one character**. Revisions are **0-indexed from left to right**, with the leftmost revision being revision 0, the next revision being revision 1, and so on. For example `2.5.33` and `0.1` are valid version numbers.

To compare version numbers, compare their revisions in **left-to-right order**. Revisions are compared using their **integer value ignoring any leading zeros**. This means that revisions `1` and `001` are considered **equal**. If a version number does not specify a revision at an index, then **treat the revision as** `0`. For example, version `1.0` is less than version `1.1` because their revision 0s are the same, but their revision 1s are 0 and 1 respectively, and 0 < 1. integer.

Return the following:

- If `version1 < version2`, return `-1`.
- If `version1 > version2`, return `1`.
- Otherwise, return `0`.

## Examples

### Example 1:

```code
Input: version1 = "1.01", version2 = "1.001"
Output: 0
Explanation: Ignoring leading zeroes, both "01" and "001" represent the same integer "1".
```

### Example 2:

```code
Input: version1 = "1.0", version2 = "1.0.0"
Output: 0
Explanation: version1 does not specify revision 2, which means it is treated as "0".

```

### Example 3:

```code
Input: version1 = "0.1", version2 = "1.1"
Output: -1
Explanation: version1's revision 0 is "0", while version2's revision 0 is "1". 0 < 1, so version1 < version2.
```

### Example 4:

```code
Input: version1 = "1.0.1", version2 = "1"
Output: 1
```

### Example 5:

```code
Input: version1 = "7.5.2.4", version2 = "7.5.3"
Output: -1
```

## Constraints:

- 1 <= version1.length, version2.length <= 500
- **version1** and **version2** only contain digits and `.`.
- **version1** and **version2** are valid version numbers.
- All the given revisions in **version1** and **version2** can be stored in a 32-bit integer.

## Solutions

### 1. String Split and Two Pointers

The question description is pretty long, but basically we are just compare two versions and decide which one is larger. Only one special case is that **leading 0s are ignored**. For example, `1.01` and `1.001` in our example 1 will return 0 because these two versions are same under this condition.

Let's first think about how should we compare two versions. If we have `5.3` and `4.0` which one is larger? We know for sure `5.3` because `5 > 1`. So the idea is to separate the versions with `.` and compare them separately.

Therefore, we could split the `version` by `.` and compare each subparts by converting them to integers. 0 will not affect the result so can be ignored. For each sub parts we can compare than and return result.

```c++
class Solution {
public:
    int compareVersion(string version1, string version2) {
        int i = 0, j = 0;

        while (i < version1.length() || j < version2.length()) {
            int v1 = 0, v2 = 0;
            while (i < version1.length() && version1[i] != '.') {
                v1 = v1*10 + version1[i]-'0';
                i++;
            }
            while (j < version2.length() && version2[j] != '.') {
                v2 = v2*10 + version2[j]-'0';
                j++;
            }
            if (v1 > v2) return 1;
            else if (v2 > v1) return -1;

            i++; j++;
        }
        return 0;
    }
};
```
