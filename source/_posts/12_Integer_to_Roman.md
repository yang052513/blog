---
title: 12 Integer to Roman
date: 2021-01-14 23:20:24
tags: ["Leetcode", "Algorithm", "Medium", "Math"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 12 Integer to Roman

Roman numerals are represented by seven different symbols: `I, V, X, L, C, D and M`.

```code
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, `2` is written as `II` in Roman numeral, just two one's added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

- `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
- `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
- `C` can be placed before `D `(500) and `M` (1000) to make 400 and 900.

Given an integer, convert it to a roman numeral.

## Examples

### Example 1:

```code
Input: num = 3
Output: "III"
```

### Example 2:

```code
Input: num = 4
Output: "IV"
```

### Example 3:

```code
Input: num = 9
Output: "IX"
```

### Example 4:

```code
Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
```

### Example 5:

```code
Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

## Constraints:

- 1 <= num <= 3999

## Solutions

### 1. Hash Map

We could implement two arrays `symbol` and `val`, where `symboml` represent the Roman symbols, more specifically the 12 subtraction symbols. `val` will have the respected value to the same index in `symbol`.

Then we could loop through the `val[i]`, if the `num` is greater than `val[i]`, we subtract from num and until num smaller than current `val[i]`.

For example, `num = 1994`

```code
i = 0       val[i] = 1000       num >= 1000
    -> res += symbol[i] -> res = M;
    -> num -= val[i]    -> num = 994
    -> 994 < 1000 break;
i = 1       val[i] = 900        num >= 900
    -> res += "CM"
    -> num -= 900  -> 94
..... until to 90 -> XC
```

```c++
class Solution {
public:
    string intToRoman(int num) {
        vector<int> val={1000,900,500,400,100,90,50,40,10,9,5,4,1};
        vector<string> symbol={"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};
        string res;

        for (int i = 0; i < val.size(); i++) {
            while (num >= val[i]){
                num -= val[i];
                res += symbol[i];
            }
        }

        return res;
    }
};
```
