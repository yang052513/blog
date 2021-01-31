---
title: 229. Majority Element II
date: 2021-01-19 20:37:24
tags: ["Leetcode", "Algorithm", "Medium", "Array", "Boyer–Moore Voting"]
comments: false
categories: "Leetcode"
cover: "https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/0_zuhXdNAIUoxEem4-.jpeg?alt=media&token=f1f7a5cb-3eea-46ee-b450-7e75d9c28447"
---

# 229. Majority Element II

Given an integer array of size `n`, find all elements that appear more than `n/3` times.

**Follow-up**: Could you solve the problem in linear time and in O(1) space?

## Examples

### Example 1:

```code
Input: nums = [3,2,3]
Output: [3]
```

### Example 2:

```code
Input: nums = [1]
Output: [1]
```

### Example 3:

```code
Input: nums = [1,2]
Output: [1,2]
```

## Constraints:

- **1 <= nums.length <= 5\*10<sup>4</sup>**
- **-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup>**

## Solutions

### Boyer–Moore Voting Algorithm

#### Finding Elements More Than n/2 Times

At first I solved this problem using a `HashMap` which is pretty easy, and I couldnt came up the `O(1)` space solution. After checked out the discussion on Leetcode, I learned that the [Boyer-Moore Voting Algorithm](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm) is used to find the element appear greater than `n/2` times with **O(1)** space. Before explain how to use Boyer-moore Voting algorithm to solve this problem, let's take a look at how does this algorithm find elements appear more than `n/2` times. Then it will be easier to understand `n/3` one.

So basically, the algorithm works by watching two variables `candidate` and `vote`. We initialize the `candidate` for the **first element in the array** and with `vote = 0`. Then iterate the array, if the **current element == candidate**, we increment `vote`. However, if the current element does not equal to `candidate`, then we decrement `vote`. What if `vote == 0`? Well, for that case we **re-assign candidate** to that current element. After the loop, we end up with `candidate`. Then we do a second pass to check if that number is actually the majority element.

#### Example for Finding Elements More Than n/2 Times

Let's walk through an example. `nums = [1,2,3,2,1,1,1]`.

```code
candidate = nums[0], vote = 0

index
i = 0   (1)nums[i] == candidate       vote++     vote = 1
i = 1   (2)nums[i] != candidate(1)    vote--     vote = 0

Now for i = 2, the vote is already 0 so we cant decrement.
We re-assign candidate to 3 with init vote = 1
i = 2   (3)nums[i] != candidate(1)    vote is 0  vote = 1   candidate = 3
i = 3   (2)nums[i] != candidate(3)    vote--
i = 4   (1)nums[i] != candidate(3)    vote is 0  vote = 1   candidate = 1
i = 5   (1)nums[i] == candidate(1)    vote++     vote = 2
i = 6   (1)nums[i] == candidate(1)    vote++     vote = 3
```

Notice that for some cases the last element might not be the majority element. For example [1,2,3] we end up with 3 however 3 is not the majority element. Therefore, we need to another loop to check if `candidate's votes > n/2`.

#### Finding Elements More than n/3 Times

Alright, that's using Boyer-Moore algorithm to find elements appear than `n/2` times. But how to do it with `n/3` times?
Well, we just do some modifications as the process are still same.

The number of majority element for appear more than `n/2` can either be **none** or **1**. Why? Suppose the array length is `8`. In order to satisfy **majority element**, the element has to appear **more than 4 times**. NOT **greater or equal to**. The element has to have the frequency of `5`. Then `8 - 5 = 3`. There are no ways more than one elements appears more than `n-2` times.

Same thing we can concluded the number of elements appears more than `n/3` times will either be `none`, `1`, or `2`.

Thus, the max possible candidates now becomes `2`. We could do the same things in the normal Boyer-Moore Voting algorithm but now tracking `candidate1, candidate2, vote1, and vote2`. The steps are as following

First initialize `candidate1 = nums[0]`, `candidate2 = nums[0]`, `vote1 = 0`, and `vote2 = 0`, where `vote1` represents `candidate1`'s votes, and `vote2` for `candidate2`.

The we iterate `i` the array `nums`.

1. If the `nums[i] == candidate1`, we increment `vote1`
2. If the `nums[i] == candidate2`, we increment `vote2`
3. If `vote1 == 0`, assign `candidate1` with `nums[i]`. reset `vote1` to 1
4. If `vote2 == 0`, assign `candidate2` with `nums[i]`. reset `vote2` to 2
5. else `vote1--`, `vote2--` (since none of the cases satisfy)

After we have `candidate1` and `candidate2`, we could do the seoncd pass and check if `vote1` and `vote2` greater than `n/3`. If so, they are seen as **majority elements** in this question.

Cool. Let's do the final example then implement the code!

#### Example

Let's say we are given array `nums = [1,2,3,3,2,2,1]`

```code
candidate1 = nums[0]    candidate2 = nums[0]    vote1 = 0   vote2 = 0
index   condition                 procedure                     vote1       vote2   candidate1     candidate2
i = 0   nums[i] == candidate1     vote1++                       1           0       1               1
i = 1   vote2 == 0                candidate2 = 2  vote2 = 1     1           1       1               2
i = 2   else condition            vote1--   vote2--             0           0       1               2
i = 3   vote1 == 0                candidate1 = 3  vote1 = 1     1           1       3               2
i = 4   vote2 == 0                candidate2 = 2  vote2 = 1     1           1       3               2
i = 5   nums[i] == candidate2     vote2++                       1           2       3               2
i = 6   elsecondition             vote1--   vote2--             0           1       3               2
```

Now we have two candidates `2` and `3`. Keep in mind that the `vote1` and `vote2` **DOES NOT means their frequency**.

We need to iterate `nums` and re-calculate `2` and `3` frequency, then check if appear more than `n/3` times.

Finally only `2` is our result.

#### Code

```c++
class Solution {
public:
  vector<int> majorityElement(vector<int>& nums) {
      int can1 = nums[0], can2 = nums[0], vote1 = 0, vote2 = 0;
      int freq = nums.size()/3;
      vector<int> res;

      // vote
      for (int i : nums) {
          if (i == can1)
              vote1++;
          else if (i == can2)
              vote2++;
          else if (vote1 == 0) {
              can1 = i; vote1 = 1;
          } else if (vote2 == 0) {
              can2 = i; vote2 = 1;
          } else {
              vote1--; vote2--;
          }
      }

      // count
      vote1 = 0; vote2 = 0;
      for (int i: nums) {
          if (i == can1) vote1++;
          else if (i == can2) vote2++;
      }

      // check if is greater than n/3
      if (vote1 > freq) res.push_back(can1);
      if (vote2 > freq) res.push_back(can2);
      return res;
  }
};

```
