---
title: 299. Bulls and Cows
date: 2021-01-23 22:13:26
tags: ["Leetcode", "Algorithm", "Medium", "Hash Map"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 299. Bulls and Cows

You are playing the [Bulls and Cows](https://en.wikipedia.org/wiki/Bulls_and_Cows) game with your friend.

You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:

- The number of **bulls**, which are digits in the guess that are in the correct position.
- The number of **cows**, which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.

Given the secret number `secret` and your friend's guess `guess`, return the hint for your friend's guess.

The hint should be formatted as "xAyB", where x is the number of bulls and y is the number of cows. Note that both `secret` and `guess` may contain duplicate digits.ber.

## Examples

### Example 1:

```code
Input: secret = "1807", guess = "7810"
Output: "1A3B"
Explanation: Bulls are connected with a '|' and cows are underlined:
"1807"
  |
"7810"
```

### Example 2:

```code
Input: secret = "1123", guess = "0111"
Output: "1A1B"
Explanation: Bulls are connected with a '|' and cows are underlined:
"1123"        "1123"
  |      or     |
"0111"        "0111"
Note that only one of the two unmatched 1s is counted as a cow since the non-bull digits can only be rearranged to allow one 1 to be a bul
```

### Example 3:

```code
Input: secret = "1", guess = "0"
Output: "0A0B"
```

### Example 4:

```code
Input: secret = "1", guess = "1"
Output: "1A0B"
```

## Note:

- 1 <= secret.length, guess.length <= 1000
- secret.length == guess.length
- `secret` and `guess` consist of digits only.

## Solutions

### Hash Map

The question can be described as three conditions.

1. If `secret[i] == guess[i]` then we increment `bulls`.
2. If `guess[i]` does not exist in `secret`, we do nothing
3. If `guess[i]` is in `secret` but wrong index, we increment `cows`

> Note that each digit can only be used for wrong location once. For exmaple 2.

Therefore, we could first check the digits in the **correct spot** and for digits not same we added to map.

Then we iterate the map and check if `guess[i]` is in `secret` map. If so, we take the minimum one.

```c++
class Solution {
public:
    string getHint(string secret, string guess) {
        unordered_map<int, int> mp1, mp2;
        int bulls = 0, cows = 0;

        // check correct spot digits first to avoid misuse frequency
        for (int i = 0; i < secret.size(); i++) {
            if (secret[i] == guess[i])
                bulls++;
            else {
                mp1[secret[i]]++;
                mp2[guess[i]]++;
            }
        }

        // iterate map and find cows
        for (auto& k : mp2)
            if (mp1[k.first] > 0)
                cows += min(k.second, mp1[k.first]);

        return to_string(bulls) + "A" + to_string(cows) + "B";
    }
};
```
