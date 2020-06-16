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
    swap(i, j)i
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

### Knapsack Problem 背包问题
