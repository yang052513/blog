---
title: Algorithim 概览
date: 2020-06-15 00:55:19
tags: ['algorithim', 'bcit', 'notes']
categories: 笔记
comments: false
---

> 总结下暑假算法课中学习到的知识点，代码主要以 python 和 typescript 来展示。

## Brute Force 暴力求解

> 从字面意思理解，brute force 就是用最直接的方法来解决相应的问题。比如我们设计一个猜数字的游戏。数字范围为 0-10，根据用户的输入返回是否大还是小。那暴力求解的算法就是从 0 开始然后递增，最好的情况是 1 次猜中，但最坏的情况`Worst case`就是 10 次。

然而，暴力求解的算法并不是最有效的，在之后的算法`Divide and conquer`中，我们可以猜 0，然后递增到 5。根据给出的结果再进行猜测会大大提高效率。

<!-- more -->

### Sorting

暴力求解排序方法主要讲解冒泡排序和选择排序

#### Bubble Sort 冒泡排序

> 假设我们有一个可排序的数组, 冒泡排序即从第一个元素开始，每个元素进行两两比较。如果左边的大于右边的,就进行位置替换。完成第一个 iteration 之后继续从第二个元素开始进行相同的步骤。

根据定义，我们的伪代码如下:

```cmd
for i = 0 to A.length - 1
    for j = 0 to A.length - 1 -i
        if left > right:
            swap(left, right)
```

比如我们有一个数组`[3, 0, 6, 1]`。那我们先从第一位`3`开始， 先是`3`和`0`比较，`3`大于`0`于是我们进行调换。比较完成后我们递增到下一位继续进行两两比较

现在数组为`[0, 3, 6, 1]`。于是我们继续进行比较`3`和`6`。很明显`3`小于`6`，我们不需要进行调换。我们来到最后一组比较`6`和`1`。左边大于右边我们进行调换。

此时我们第一个 iteration 的排序完成了, `[0, 3, 1, 6]`。

同理我们现在从`index=1`的位置开始进行以上相同的步骤直到结束。

如此我们可以写出冒泡排序的代码

**Python**

```python
def bubble_sort(array):
    n = len(array)
    for i in range(n - 1):
        for j in range(n - 1 -i):
            if(array[j] > array[j+1]):
                array[j], array[j+1] = array[j+1], array[j]
    return array
```

**Typescrtipt**

```ts
const bubbleSort = list => {
  let n: number = list.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (list[j] > list[j + 1]) {
        ;[list[j], list[j + 1]] = [list[j + 1], list[j]]
      }
    }
  }
  return list
}
```

我们可以看出，冒泡排序有两个 for 循环，我们可得出复杂度 Big Oh 为 n 的平方

#### Selection Sort 选择排序

选择排序的方法是我们首先设定第一个字符的元素为最小值，然后我们进行数组的循环。如果我们在 iteration 中发现有元素比当前设定的元素小，我们将该元素设置为新的最小值。重复步骤结束 iteration 并把此循环中最小值起始的值替换完成排序。伪代码如下:

```cmd
for i = 0 to Array.length -1:
    min = i
    for j = i+1 to Array.length:
        if(j < min):
            min = j
    swap(i, j)
```

因为暴力求解每个元素进行比较，所以我们用一个简单的数组举例...

假设我们用选择排序算法来排序`[3, 0, 2]`数组。

首先把最小值`min`设置为`array[0]`也就是`3`, 然后`i+1`开始进行判断，`0`小于`3`。好我们现在把`min`设置为`0`然后继续前进。

`2`大于`0`，我们跳过。于是第一个循环完成了。我们进行`i`和更新后的最小值`min`调换得到

`[0, 3, 2]`。

OK, 同理我们从`i = 1`开始，`min`现在设置为`array[1]`也就是`3`。比较`3`和`2`条件成立进行 swap。

最后我们得到`[0, 2, 3]`

选择排序代码如下

**Python**

```python
def selection_sort(array):
    n = len(array)
    for i in range(n):
        min = i
        for j in range(i+1, n):
            if(array[j] < array[min]):
                min = j
        array[i], array[min] = array[min], array[i]
    return array
```

**Typescript**

```ts
const selectionSort = array => {
  let n = array.length
  for (let i = 0; i < n; i++) {
    let min = i
    for (j = i + 1; j < n; j++) {
      if (array[j] < array[min]) {
        min = j
      }
    }
    ;[array[i], array[min]] = [array[min], array[i]]
  }
  return array
}
```

### String Match 字符串匹配

回到最开始的搜索内容查询位置问题。用暴力求解的方法也写的话，我们就要每个字符开始进行比较。一旦有一个字符不匹配我们位移一个单位继续进行判断。

比如我们要在`I love python`中搜索`python`。首先从`I`开始进行匹配，直到`index = 7`的位置才匹配成功并返回`index = 7`。

伪代码如下:

```cmd
for i = 0 to n - m:
    j = 0
    while j < m and pattern[j] = text[i + j] do
        j = j + 1
    if(j = m):
        return i
return -1
```

### Knapsack Problem 背包问题

背包问题即给定一些特定物品并有对应的价格和重量。然后有一个限重 W 的背包，每个物品只能选择一次。在不超重的情况下如何做到价值最大化选择？

举个简单的例子。我们有一个最重承受 10kg 的背包。并有以下物品可以选择: 物品一: 2kg, 10 元。 物品二: 5kg, 30 元。物品三: 4kg, 20 元....如此。

暴力算法来解决这个问题就是将所有可能的组合先全部列出来，然后判断并筛选超重的集合，最后比较所有集合来找到价值最高的集合。

算法效率来讲，假设我们有 n 个物品，那复杂度即为 2 的 n 次方

## Decrease and Conquer 减治法

这个 section 我们引入减治法。跟暴力求解不同，减治法通过逐步缩小问题规模来解决一个问题。简而言之，回到我们之前猜数字的游戏。如果用暴力求解，我们要一个数字一个数字猜测。减治法可以先把数字对半分，比如猜从 0-10 的数字，我们可以先拆成 0-5 和 6-10。如果我们给出 5 系统显示太高，那我们可以继续对半拆除从 0-4 进行同样的步骤。直到最后我们找到数字也就是一直拆分问题。

### Insertation Sort 插入排序

假设我们一个数组`[0, 1, 5, 3, 2]`。第一部分`[0, 1]`是有序数列，后半部分为无序数列。也就是说我们每次只要把无序数列的第一个元素插入到正确的位置后，整体问题的规模就减少 1。如果我们重复`n-1`此后，数组也重新排成有序了。

> 重复 n-1 是因为只有一个元素的数组必定是有序的。

可以把插入排序想象成扑克牌卡片排序。

**Python**

```python
def insertion_sort(array):
    n = len(array)
    for i in range(1, n):
        index = array[i]
        # the index in the left of i
        j = i - 1

        # 如果左边还有数字 并且 当前元素小于它左边的元素：
        while j >= 0 and index < array[j]:
            # 调换当前元素和左边的元素
            array[j + 1] = array[j]
            # 继续向左移动
            j = j - 1
        # 循环结束 插入到对应的位置
        array[j + 1] = index
    return array
```

**Typescript**

```ts
const insertionSort = array => {
  let n: number = array.length
  //起始为1 因为第一个是有序的
  for (let i = 1; i < n; i++) {
    let index = array[i]
    let j = i - 1
    while (j >= 0 && index < array[j]) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = index
  }
  return array
}
```

由上可以看出我们有 2 个循环，所以插入排序的复杂度为 n 的平方

### Binary Search and Binary Tree 二分查找与二叉树

目前我们涉及到的算法都是从数组的第一个位置开始然后进行查找。二分查找则从一个数组的中间开始，从左往右一次查找，直到找到该元素或循环结束
