---
title: 1233. Remove Sub-Folders from the Filesystem
date: 2021-01-30 14:25:28
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Sort"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1233. Remove Sub-Folders from the Filesystem

Given a list of folders, remove all **sub-folders** in those folders and return in **any order** the folders after removing.

If a `folder[i]` is located within another `folder[j]`, it is called a sub-folder of it.

The format of a path is one or more concatenated strings of the form: `/` followed by one or more lowercase English letters. For example, `/leetcode` and `/leetcode/problems` are valid paths while an empty string and `/` are not.

## 示例

### 示例 1:

```code
Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: Folders "/a/b/" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.
```

### 示例 2:

```code
Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Folders "/a/b/c" and "/a/b/d/" will be removed because they are subfolders of "/a".
```

### 示例 3:

```code
Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
Output: ["/a/b/c","/a/b/ca","/a/b/d"]
```

## 提示:

- **1 <= folder.length <= 4 \* 10<sup>4</sup>**
- **2 <= folder[i].length <= 100**
- **folder[i] contains only lowercase letters and `/`**
- **folder[i] always starts with character `/`**
- **Each folder name is unique.**

## Solutions

### 排序

首先来观察几个示例. `/a/b` 和 `/a/c` 为 `/a` 的子文件夹.

`/c/d/e`和`/c/d/g` 为 `/c/d`/的子文件夹.

**子文件夹的长度必然大于父级文件夹, 而且父级文件夹肯定是子文件夹的子字符串**.

因此我们可以先对数组排序, 子文件夹必然出现在父文件夹后面.

遍历数组前可把排序后数组的第一个字符串加入到结果集中, 因为排序后第一个元素为最短必然为父级路径.

然后依次遍历原数组与**结果集中最后一个父级文件夹**对比, 如果当前字符串中包含**父级路径**, 则当前字符串为子文件夹, 反之为父级文件夹路径并加入到结果数组中.

```c++
class Solution {
public:
    vector<string> removeSubfolders(vector<string>& folder) {
        vector<string> res;

        sort(folder.begin(), folder.end());
        res.push_back(folder[0]);

        for (int i = 1; i < folder.size(); i++) {
            string parent = res.back() + "/";
            if (folder[i].find(parent) == string::npos)
                res.push_back(folder[i]);
        }
        return res;
    }
};

```
