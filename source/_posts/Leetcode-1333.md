---
title: 1333. Filter Restaurants by Vegan-Friendly, Price and Distance
date: 2021-02-01 22:30:28
tags: ["Leetcode", "Algorithm", "Medium", "Sort", "STL"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1333. Filter Restaurants by Vegan-Friendly, Price and Distance

Given the array `restaurants` where `restaurants[i] = [idi, ratingi, veganFriendlyi, pricei, distancei]`. You have to filter the restaurants using three filters.

The `veganFriendly` filter will be either true (meaning you should only include restaurants with `veganFriendlyi` set to true) or false (meaning you can include any restaurant). In addition, you have the filters maxPrice and `maxDistance` which are the maximum value for price and distance of restaurants you should consider respectively.

Return the array of restaurant **IDs** after filtering, ordered by **rating** from highest to lowest. For restaurants with the same rating, order them by **id** from highest to lowest. For simplicity `veganFriendlyi` and `veganFriendly` take value **1** when it is true, and **0** when it is false.

## 示例

### 示例 1:

```code
Input: restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 1, maxPrice = 50, maxDistance = 10
Output: [3,1,5]
Explanation:
The restaurants are:
Restaurant 1 [id=1, rating=4, veganFriendly=1, price=40, distance=10]
Restaurant 2 [id=2, rating=8, veganFriendly=0, price=50, distance=5]
Restaurant 3 [id=3, rating=8, veganFriendly=1, price=30, distance=4]
Restaurant 4 [id=4, rating=10, veganFriendly=0, price=10, distance=3]
Restaurant 5 [id=5, rating=1, veganFriendly=1, price=15, distance=1]
After filter restaurants with veganFriendly = 1, maxPrice = 50 and maxDistance = 10 we have restaurant 3, restaurant 1 and restaurant 5 (ordered by rating from highest to lowest).
```

### 示例 2:

```code
Input: restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 0, maxPrice = 50, maxDistance = 10
Output: [4,3,2,1,5]
Explanation: The restaurants are the same as in example 1, but in this case the filter veganFriendly = 0, therefore all restaurants are considered.
```

### 示例 2:

```code
Input: restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 0, maxPrice = 30, maxDistance = 3
Output: [4,5]
```

## 提示:

- 1 <= restaurants.length <= 10<sup>4</sup>
- restaurants[i].length == 5
- 1 <= idi, ratingi, pricei, distancei <= 10<sup>5</sup>
- 1 <= maxPrice, maxDistance <= 10<sup>5</sup>
- veganFriendlyi and veganFriendly are **0** or **1**.
- All idi are **distinct**.

## 解题思路

### 哈希表 + 排序

直接用`STL`过滤数组内不满足`maxPrice`, `maxDistance`, 以及`veganFriendly`的餐馆即可. 最后用`STL`按`rating`排序, 若排名相同对比`id`.

需要注意的就是如果`veganFriendly`为`false`, 应该包括**所有餐馆**.

```c++
class Solution {
public:
    vector<int> filterRestaurants(vector<vector<int>>& restaurants, int veganFriendly, int maxPrice, int maxDistance) {
        vector<vector<int>> filter;
        vector<int> res;

        copy_if(restaurants.begin(), restaurants.end(), back_inserter(filter), [veganFriendly, maxPrice, maxDistance](const auto& r) {
            if (veganFriendly)
                return  r[2] == 1 && r[3] <= maxPrice && r[4] <= maxDistance;
            else return r[3] <= maxPrice && r[4] <= maxDistance;
        });

        sort(filter.begin(), filter.end(), [](const auto& l, const auto& r) {
            return l[1] > r[1] || l[1] == r[1] && l[0] > r[0];
        });

        for (auto & i : filter)
            res.push_back(i[0]);

        return res;
    }
};
```
