---
title: 1352. Product of the Last K Numbers
date: 2021-02-01 20:20:28
tags: ["Leetcode", "Algorithm", "Medium", "Design"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 1352. Product of the Last K Numbers

Implement the class `ProductOfNumbers` that supports two methods:

1. `add(int num)`

   - Adds the number num to the back of the current list of numbers.

2. `getProduct(int k)`
   - Returns the product of the last `k` numbers in the current list.
   - You can assume that always the current list has **at least** `k` numbers.

At any time, the product of any contiguous sequence of numbers will fit into a single 32-bit integer without overflowing

## 示例

### 示例 1:

```code
Input
["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
[[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]

Output
[null,null,null,null,null,null,20,40,0,null,32]

Explanation
ProductOfNumbers productOfNumbers = new ProductOfNumbers();
productOfNumbers.add(3);        // [3]
productOfNumbers.add(0);        // [3,0]
productOfNumbers.add(2);        // [3,0,2]
productOfNumbers.add(5);        // [3,0,2,5]
productOfNumbers.add(4);        // [3,0,2,5,4]
productOfNumbers.getProduct(2); // return 20. The product of the last 2 numbers is 5 * 4 = 20
productOfNumbers.getProduct(3); // return 40. The product of the last 3 numbers is 2 * 5 * 4 = 40
productOfNumbers.getProduct(4); // return 0. The product of the last 4 numbers is 0 * 2 * 5 * 4 = 0
productOfNumbers.add(8);        // [3,0,2,5,4,8]
productOfNumbers.getProduct(2); // return 32. The product of the last 2 numbers is 4 * 8 = 32
```

## 提示:

- There will be at most **40000** operations considering both `add` and `getProduct`.
- 0 <= num <= 100
- 1 <= k <= 40000

## 解题思路

### 前缀乘积

我们用一个数组保留每个元素的**前缀乘积**. 若想求最后`k`个元素的乘积可以直接通过 `arr.back() / arr[n-k-1]`得到.

比如数组 `[1, 2, 3, 4]` 前缀乘积的数组为 `[1, 2, 6, 24]`.

最后 2 个元素 3, 4 的乘积可以用通过 24 / 2 得到. 因为前缀乘积数组最后一个元素是 `1 * 2 * 3 * 4`的乘积, 2 是 `1 * 2`的乘积. 所以做除法约分后也就得到了 `3 * 4`.

但是我们还需要考虑`0`的问题. 如果`add(0)`, 按照之前的逻辑, 前缀乘积数组后面的元素也全都是 0 了.

另一方面, 如果我们加入一个 0, 那数组之前的前缀乘积也应该是 0. 所以我们一旦遇到 0 就可以把原来的前缀乘积数组清空. 那如何返回 0 呢? 这个可以用`k`来判断, 由于我们遇到 0 清空了数组, 所以新的数组长度**必然小于 k**. 换句话说, 如果 `k >= arr.size()`, 那我们可以直接返回 0.

```c++
class ProductOfNumbers {
private:
    vector<long long> prod;
public:
    ProductOfNumbers() {
        prod.push_back(1);
    }

    void add(int num) {
        if (!num) {
            prod = {1};
        } else {
            prod.push_back(prod.back() * num);
        }
    }

    int getProduct(int k) {
        if (k >= prod.size())
            return 0;
        return prod.back() / prod[prod.size()-k-1];
    }
};
```
