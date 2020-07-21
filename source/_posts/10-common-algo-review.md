---
title: 算法导论概览
date: 2020-06-15 00:55:19
tags: ['algorithim', 'notes']
categories: 笔记
cover: 'https://3.bp.blogspot.com/-bsAe5iHfUvw/XMm2l8YCMtI/AAAAAAAAA28/9-Uj-v3GHhIE06c1_HdSEOeXML1byHInACLcBGAs/s1600/what-is-an-algorithm.png'
---

> 总结暑假算法课 COMP3761 中学习到的知识点，代码实现语言以 python 来展示。课程内容参考 Introduction to The Design and Analysis of Algorithm. 前半部分主要分析各种排序算法的原理以及代码实现。后半部分主要为图算法和最短路径的应用。

1. Brute Force 暴力求解
2. Decrease and Conquer 减治法
3. Divide and Conquer 分治法
4. Transform and Conquer 变治法
5. Time Space Tradeoff 时空权衡
6. Data Structure 数据结构
7. Graph Algorithim 图
8. Greedy Approach 贪心算法

# Brute Force 暴力求解

从字面意思理解，brute force 就是用最直接的方法来解决相应的问题。比如我们设计一个猜数字的游戏。数字范围为 0-10，根据用户的输入返回是否大还是小。那暴力求解的算法就是从 0 开始然后递增，最好的情况是 1 次猜中，但最坏的情况`Worst case`就是 10 次。

然而，暴力求解的算法并不是最有效的。其他的方法比如我们可以把问题规模缩小。先猜 0，然后递增到 5。根据给出的结果再进行猜测会大大提高效率。

## Bubble Sort 冒泡排序

> 假设我们有一个可排序的数组, 冒泡排序即从第一个元素开始，每个元素进行两两比较。如果左边的大于右边的,就进行位置替换。完成第一个 iteration 之后继续从第二个元素开始进行相同的步骤。

冒泡排序伪代码如下:

```
for i = 0 to A.length - 1
    for j = 0 to A.length - 1 -i
        if left > right:
            swap(left, right)
```

### 举例

比如我们有一个数组`[3, 0, 6, 1]`。那我们先从第一位`3`开始， 先是`3`和`0`比较，`3`大于`0`于是我们进行调换。比较完成后我们递增到下一位继续进行两两比较

现在数组为`[0, 3, 6, 1]`。于是我们继续进行比较`3`和`6`。很明显`3`小于`6`，我们不需要进行调换。我们来到最后一组比较`6`和`1`。左边大于右边我们进行调换。

此时我们第一个 iteration 的排序完成了, `[0, 3, 1, 6]`。

同理我们现在从`index=1`的位置开始进行以上相同的步骤直到结束。

### 代码实现

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

### 复杂度分析

冒泡排序有两个`for`循环，所以冒泡排序的复杂度 n<sup>2</sup>

## Selection Sort 选择排序

选择排序首先设定数组第一个字符的元素为最小值，然后遍历整个数组。如果在遍历过程中发现有元素小于当前设定的最小值，就将该元素设置为新的最小值。

重复步骤结束 iteration 并把此循环中最小值起始的值替换完成排序。伪代码实现如下:

```
for i = 0 to Array.length -1:
    min = i
    for j = i+1 to Array.length:
        if(j < min):
            min = j
    swap(i, j)
```

### 举例

假设我们用选择排序算法来排序`[3, 0, 2]`数组。

首先把最小值`min`设置为`array[0]`也就是`3`, 然后`i+1`开始进行判断，`0`小于`3`。于是我们现在把`min`设置为`0`。

现在`2`大于`0`，不需要更改最小值。于是第一个循环完成了。将`i`和更新后的最小值`min`调换，即调换`3`和`0`的位置得到

`[0, 3, 2]`。

同理我们从`i = 1`开始第二个 iteration，`min`现在设置为`array[1]`也就是`3`。比较`3`和`2`条件成立进行调换位置。

最后我们得到`[0, 2, 3]`

### 代码实现

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

### 复杂度分析

选择排序的复杂度 n<sup>2</sup>

## String Match 字符串匹配

在浏览器查找一个字符串时，我们可以用`Ctrl+F`来进行文本内容的匹配搜索。如果暴力求解的方法来实现字符串匹配，我们就要对字符串内每个字符开始进行比较。一旦有一个字符不匹配我们位移一个单位继续进行判断。

比如我们要在`I love python`中搜索`python`。首先从`I`开始，`p`并不匹配`I`，移动索引一个单位。`p`依旧不匹配``。同理移动一个索引继续匹配，直到`index = 7`的位置才匹配成功并返回`index = 7`。

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

### 复杂度分析

给定字符串长度为`n`, 字符串匹配的长度为`m`。`Worst Case`，最坏的情况下我们要进行`(n-m+1)m`次对比。

## Knapsack Problem 背包问题

背包问题即给定一些特定物品并有对应的价格和重量。然后有一个限重 W 的背包，每个物品只能选择一次。在不超重的情况下如何做到**价值最大化**选择？

比如我们有一个最重承受 10kg 的背包。并有以下物品可以选择: 物品一: 2kg, 10 元。 物品二: 5kg, 30 元。物品三: 4kg, 20 元....如此。

用暴力算法来解决这个问题即将所有可能的组合先全部列出来，然后判断并筛选超重的集合，最后比较所有集合来找到价值最高的集合。

算法效率来讲，假设我们有 n 个物品，那复杂度即为 2<sup>n</sup>

<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->

# Decrease and Conquer 减治法

跟暴力求解不同，减治法是通过逐步缩小问题规模来解决一个问题。简而言之，回到我们之前猜数字的游戏。如果用暴力求解，我们要一个数字一个数字猜测。减治法可以先把数字对半分，比如猜从 0-10 的数字，我们可以先拆成 0-5 和 6-10。如果我们给出 5 系统显示太高，那我们可以继续对半拆除从 0-4 进行同样的步骤。直到最后我们找到数字也就是一直拆分问题。

## Insertation Sort 插入排序

### 举例

假设给定一个数组`[0, 1, 5, 3, 2]`。

第一部分`[0, 1]`是有序数列，后半部分为无序数列。如果我们每次把无序数列的第一个元素插入到正确的位置后，整体问题的规模就减少 1。比如`[5, 3, 2]`无序部分把`2`重新放到有序的位置，那数组的规模就减少到`[5, 3]`的对比。

如次重复`n-1`次后，数组也重新排成有序了。

> 重复 n-1 是因为只有一个元素的数组必定是有序的。

可以把插入排序想象成扑克牌卡片排序。

### 代码实现

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

### 复杂度分析

`插入排序`的复杂度为 n<sup>2</sup>

## Binary Search 二分查找

目前我们涉及到的算法都是从数组的第一个位置开始然后进行遍历判断。二分查找则从一个数组的中间开始，从左往右一次查找，直到找到该元素或循环结束。

**Python**

```python
def binary_search(array, key):
    l = 0
    r = len(array) - 1
    while l <= r:
        m = (l + r) // 2
        if key == array[m]:
            return m
        elif key < array[m]:
            r = m - 1
        else:
            l = m + 1
    return -1
```

## Binary Search Tree Traversal 二叉树的遍历

将数组(有序)分为两部分，数组的中间元素为树的根节点，左边和右边的元素再进行相同的划分，小于根节点的元素放在左边，大于的在右边。

根据二叉搜索树我们可以进行数组的插入，查询和删除节点。接下来我们引入二叉树遍历即怎样直到节点是否已经被访问过了。

### Pre-order Traversal 前序遍历

从 Root 开始，每个节点进行`Visit -> Left -> Right`

{% youtube 1WxLM2hwL-U %}

### In-order Traversal 中序遍历

从 Root 开始，每个节点进行`Left -> Visit -> Right`

{% youtube 5dySuyZf9Qg %}

### Post-order Traversal 后序遍历

从 Root 开始，每个节点进行`Left -> Right -> Visit`

{% youtube 4zVdfkpcT6U %}

<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->

# Divide and Conquer 分治法

> 分治法的理论为把一个大的问题分成若干个小问题，然后逐个解决小问题，最后将小问题的解决方案合并到原来大问题的解。比如乐高玩具，一个乐高模型分成若干个小问题即乐高零件。小问题的解就是将各个组件先拼好，比如房顶，门之类。最后再将各个小组件组合起来拼成完整的模型。

## 有序数组排序

在介绍归并排序和快速排序之前，我们先来了解以下有序数组的合并。

给定两个有序数组`a`和`b`

a: `[2, 3, 8, 9]`
b: `[1, 4, 5, 7]`

现在需要把 a 和 b 合并为一个新的有序数组到一个空的数组 `c []`

1. 首先我们用三个变量分别来记录三个数组的索引值并初始化为 0， 数组 a 为`i`， 数组 b 为`j`，数组 c 为`k`
2. 然后我们比较 `a[i]` 和 `b[i]` 并将较小的元素存入到数组`c[0]中`。初始化为 0，所以我们比较`a[0]`和`b[0]`。
3. 之后我们将较小元素的数组索引值和数组 c 的索引值加 1
4. 然后我们继续重复第二步进行比较

最好的情况下我们要比较 `n/2` 个元素，最坏的情况要比较 `n-1` 次。

由此可以得到合并有序数组的复杂度为 `n`。

## Merge Sort 归并排序

归并排序首先要将数组一直拆分直到数组内只有一个元素剩余。然后对拆分后的数组进行重新排序，排序完成后进行归并即得到有序的数组。

### 举例

给定一个数组`[2, 1, 8, 6]`。

首先拆分成`[2, 1]`和`[8, 6]`。然后继续进行拆分直到数组内只有一个元素，因为只有一个元素的数组必定是有序的。

得到`[2], [1], [8], [6]`。现在我们完成了拆分过程。

接下来我们将元素两两归并排序，`[1, 2]`和`[6, 8]`。继续将这两个数组合并得到`[1, 2, 6, 8]`。

### 复杂度分析

归并排序的复杂度 `nlogn`。这比我们之前的冒泡排序和选择排序 n<sup>2</sup>的复杂度好了很多。

### 参考

{% youtube 4VqmGXwpLqc %}

## Quick Sort 快速排序

快速排序首先我们要选择一个`中轴(pivot)`, 一般选择数组内的第一个或者最后一只值。快速排序的原理即所有比中轴值小的元素位于中轴的左侧，而大于中轴值的元素位于中轴的右侧。最终实现有序的排序。

### 举例

给定一个数组 `a = [12, 25, 33, 5, 8]`。

选择第一个值`a[0]=44`为我们的中轴，并用`p`来记录。同时我们用变量`i`记录替换索引，`j`来记录遍历的索引。

25 > 12 我们不需要进行调换。33 > 12 同样不需要调换。来到 5 < 12(中轴)。将 i **递增 1** 然后与当前的 j 替换。也就是 5 和 25 的替换。

8 同理，与 33 进行位置替换。第一个 iteration 完成后，将 i 与当前的中轴调换，即 8 和 12 的替换。现在所有比 12 小的值都在左边，大于的都在右边。同理我们对左边和右边分别进行相同的步骤即可。

### 代码实现

```python
def partition(array):
    l = 0
    r = len(array) - 1
    pivot = a[l]
    s = l
    for i in range(l+1, r+1):
        if a[i] < p:
            s += 1
            a[s], a[i] = a[i], a[s]
            a[l], a[s] = a[s], a[l]
    return s
```

### 复杂度分析

快速排序的复杂度为`nlong(n)`

### 参考

{% youtube cnzIChso3cc %}

<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->

# Transform and Conquer 变治法

## Instance Simplification Pre-sorting 预排序

### Check Elements Uniqueness 判断元素是否独特性

给出一个数组，判断是否该数组存在重复元素。

我们先用暴力求解来看下

```python
def is_unique_bf(array):
    n = len(array)
    for i in range(n - 1):
        # 存储当前索引元素变量
        index_value = array[i]
        # 循环数组 查找是否有匹配相等的
        for j in range(i+1, n):
            if(array[j] == index_value):
                return False
    return True
```

由上可以可以得出复杂度为 n 的平方。

假设我们先将数组进行排序得到一个**有序数组**，然后在进行判断是否存在重复元素。因为如果是一个有序数组，我们只要查看一个元素是否跟它的下一个元素是否相等即可。比如`[2, 3, 3, 5]`。

#### 代码实现

```python
def is_unique_presort(array):
    n = len(array)
    # 假设我们先进行排序
    array.sort()
    for i in range(n-1):
        if array[i] == array[i+1]:
            return False
    return True
```

#### 复杂度分析

由于算法由两部分构成（排序和主循环），所以该其复杂度也应该为两部分：排序的复杂度加检查的复杂度。即为 `nlogn + n`。得到复杂度 `nlogn`

### Find the Mode 寻找众数

众数是出现在一组数据中最频繁的数。

先来看下用暴力求解如何实现这个算法

```python
def find_mode_bf(array):
  n = len(array)
  # 统计每个数字的频率
  counter = {}

  for i in range(n):
    counter[array[i]] = counter.get(array[i], 0) + 1

  occurence = 0
  for key, value in counter.items():
    if value > occurence:
      occurence = value
      mode = key
  return mode
```

最坏的情况下我们的数组每个元素都只出现一次 `[1, 2, 3, 4, 5, 6]`。复杂度为 n 的平方

如果我们先将数组进行排序，那么相同的元素在有序数组里一定是相邻的。

#### 代码实现

```python
def compute_mode_presort(array):
    array.sort()  # sort array
    i = 0; freq = 0
    while i < len(array):
        temp_freq = 1; temp_mode = array[i]
        while i + temp_freq < len(array) and array[i+temp_freq] == temp_mode:
            temp_freq += 1
        if temp_freq > freq:
            freq = temp_freq; mode = temp_mode
        i += temp_freq
    return mode

```

#### 复杂度分析

算法复杂度可以得出：O(nlog n) + O(log n) = O(nlog n)

## Representation Change 改变数据的表现形式

除了预先处理数组外，我们还可以改变数据结构来提高算法效率。我们知道堆的高度为`logn`，那么插入和删除一个元素只要每层进行查找即可，也就是说算法复杂度为堆的高度`logn`。

所以我们可以先把一个数组转化为堆然后进行相关的操作会提升效率。

### Heap 堆的定义

- 堆的每个父节点都大于或者等于它的子节点
- 堆按照从左往右的顺序依次每层铺满子元素。
- 最大的元素为 Root 即根。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-20%20161423.png?alt=media&token=b043f03e-bca9-4e6e-a758-f47cd244e4c3" width="60%" height="auto" />

### Heap Implementation 堆的应用

根据下面的堆树，转换为数组即从 root`10`开始依次写入到一个数组中。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-20%20162133.png?alt=media&token=59dd7b37-81c6-4c7b-a581-8d6829b88ca1" width="30%" height="auto" />

<br />

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-20%20162142.png?alt=media&token=b6a265f0-24b1-4c66-b3f2-6453516e7b33" width="50%" height="auto" />

同理可以根据数组转化为堆树。从数组第一个元素开始，从左往右依次把每层铺满子元素。最后由上至下改变节点的位置以满足堆的性质。

### Heap Insert 堆的插入

假设我们要把一个数值插入到一个堆中,如何来实现呢?

给定一个堆的排序 `[16, 15, 10, 14, 7, 9, 3, 2, 8 ,1]`，我们想要插入`17`到这个堆中

1. 首先把 17 插入到数组的最后一个位置中。
   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-20%20162537.png?alt=media&token=d9fddb9a-d835-49de-9e45-258f7508d8b1" width="60%" height="auto" />

2. 然后将 17 与它的父节点 7 进行比较。7 小于 17 不满足父节点大于子节点的特性，于是调换 7 和 17 的位置。

   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/311.png?alt=media&token=caec7593-c628-4168-9543-7f2bf56fc7fe" width="60%" height="auto" />

3. 重复步骤 2 直到堆的性质得到满足。
   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-20%20162907.png?alt=media&token=7433c13d-ad7d-4d06-8b94-54ae543cddf7" width="60%" height="auto" />

<br />

#### 复杂度分析

由于堆的高度为`logn`，所有堆的插入算法效率为`logn`。

### Heap Delete 堆的删除

从堆中删除一个元素的实现方法为：

1. 交换根节点的元素与堆尾的位置(数组中头尾交换)
2. 删除堆尾
3. **由上至下**调整堆的结构 (与堆的插入：由下至上相反)
   - 如果不满足堆的性质就交换两个节点的值

比如我们之前的例子，`[17, 16, 10, 14, 15, 9, 3, 2, 8, 1, 7]`。我们想要删除根节点 17。按照上面的步骤来实现即

1. 替换 17 与 7 的位置
   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/1.png?alt=media&token=8c1194e1-fe88-43b5-92c4-5de991d65216" width="60%" height="auto" />

2. 删除 节点 17
   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/2.png?alt=media&token=3581853c-0385-49ee-a229-b5278362f5e4" width="60%" height="auto" />
3. 调整堆的结构，7 与 16 对比，不满足堆的性质调换位置
   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/3.png?alt=media&token=e17fc5a2-d7a9-444b-9e46-30cc78964950" width="60%" height="auto" />
4. 重复步骤 3 直到堆完全满足定义

#### 复杂度分析

由于堆的高度为`logn`，所有堆的插入算法效率为`logn`。

### Heap Sort 堆排序

#### 步骤

1. 构建堆树(heap implementation)
2. 构建顶堆，即根元素为最大值。
3. 堆顶和堆尾的值交换顺序，并删除交换后的堆尾元素。
4. 调整堆的节点位置以满足堆的性质
5. 重复 1，2，3 步骤。

#### 分析

堆排序效率为`n logn`

#### 参考

{% youtube 2DmK_H7IdTo %}

<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->

# Space and Time Trade-Offs 时空权衡

## Counting Sort 计数排序

### 举例

给定一个数组`A = [4, 1, 3, 4, 3]`

1. 找到数组内的最大值和最小值，即 4 和 1，创建一个新的数组`C = []`用来记录每个数值的频率，长度为`4-1+1=4`
   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/1.png?alt=media&token=141e933e-8bf6-4a92-82c9-90083ec50f37" width="50%" height="auto" />
2. 遍历数组`A`并将每个数值的频率记录到`C`数组中。`C`数组的索引对应`A`数组的值。
   最终结果为`C = [1, 0, 2, 2]`。
   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/2.png?alt=media&token=bbfbf382-5953-4d24-b83b-16af4c5cdd1d" width="50%" height="auto" />
3. 将`C`数组内容的元素递归两两相加。比如`1+0=2`然后`2+2=4`如此。
   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/3.png?alt=media&token=390d9075-b58b-4eca-b59f-5b099c9d841a" width="50%" height="auto" />
4. 最后，从`A`数组最后一个值开始，找到`C`数组内对应的**频率减一**后得到相对应的新的索引。然后放到新的数组`S = []`
   比如我们从`A[4] = 3`开始， 3 在 Count 中对应的频率是 3，我们减一后得到 2，于是我们把 3 放在`S[2]`的位置。
   <img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/4.png?alt=media&token=1c7f75dd-7f15-4d5f-a432-376f7c1fd1fa" width="50%" height="auto" />
   重复步骤 4 最后得到有序数组`[1, 3, 3, 4, 4]`

### 复杂度分析

整个算法过程中我们要遍历两个数组，一个是给定的数组，另一个为计算频率的数组。

所以最好的情况下算法复杂度为 n。这比我们之前的分治法快速排序和归并排序更有效。

### 参考

{% youtube 8uyB78HNR4M %}

## Horspool's Algorithm: String Matching 字符串匹配算法

在最开始的暴力求解部分中，我们介绍了如何使用暴力求解来进行字符串匹配的算法。

如果字符串不匹配，我们移动字符一个单位进行对比，重复该步骤直到遍历整个字符。我们也总结出时间复杂度为`(n-m+1)m`, n 为字符的长度，m 为我们要匹配的字符串长度。

`Horspool`算法不同的是，当我们遇到 mismatch 也就是不匹配的情况，我们可以位移 1 个或者多个单位再进行比较。位移的多少取决于我们可以用一个`shift table`来表示。

### 举例

假设我们想要匹配的字符串为`IDIGDAB`。字符串的长度为`7`。进行匹配的字符为`IBAGHJDABADAB`。

每个字符的值为字符串中出现在最右侧的索引。即`m - index in pattern -1`。

比如 I 出现了两次，但最右侧的索引为 2, 那么 I 的位移为 `7 - 2 - 1 = 4`。同理可以得出 shift table 如下

| Letters |  I  |  D  |  G  |  A  |  B  | \*  |
| :-----: | :-: | :-: | :-: | :-: | :-: | :-: |
|  Value  |  4  |  2  |  3  |  1  |  7  |  7  |

有了 Shift Table 之后我们可以进行匹配，一旦有字符不匹配，我们即可参照 shift table 进行相对应的字符移动。

### 参考

{% youtube 3Ft3HMizsCk %}

## Hash

<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->

## Summary of sorting algorithms

| 算法     | 最好的情况 | 最坏的情况 | 稳定性 |
| -------- | ---------- | ---------- | ------ |
| 选择排序 | n2         | n2         | 稳定   |
| 冒泡排序 | n          | n2         | 稳定   |
| 插入排序 | n          | n2         | 稳定   |
| 归并排序 | n logn     | n logn     | 稳定   |
| 快速排序 | n logn     | n2         | 不稳定 |
| 堆排序   | n logn     | n logn     | 不稳定 |
| 计数排序 | n          | n + u      | 不稳定 |

<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->

# Data Structure 数据结构

> 数据结构是用来管理和储存数据的一种方式

## Linear Data Structure 线性数据结构

### 1. Array 数组

一个数组通常有一系列相同类型的元素组成，每个元素都有相对应的索引值。

比如下面`arr_list`数组，`item one`对应的索引值就是 0。

```python
arr_list = ['item one', 'item two', 'item three']
```

由于数组的长度需要预先决定来分配内存。所以对于长度明确，或者插入删除不频繁的数据，数组比较适合。但如果数据需要频发插入或者删除，那我们可以用其他的数据结构。

### 2. Linked List 链表

链表由 0 或者多个叫做节点的元素组成，每个节点都有一个指针指向下一个节点。

在数组中，如果想要拿到索引为 2 的值，可以直接用 arr[2]。但是在链表中，我们要从`head`开始一直往右进行节点的查找。

**单向链表**

单向链表，即每个节点中有一个指针指向后继节点。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/linkedlist.png?alt=media&token=069ba69f-0b49-48d0-a353-5002b821f1cf" width="70%" height="auto"/>
<br>

**双向链表**

双向链表，每个节点中有两个指针并分别指向前驱和后继。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/linkedlist2.png?alt=media&token=cfaf0918-27ee-49ef-9249-c0d3f81c6c22" width="70%" height="auto" />
<br>

#### 复杂度分析

- Search: `O(n)`
- Insert: `O(1)`
- Delete: `O(1)`

### 3. Stack 栈

遵循`后进先出(LIFO)`原则, 可以想象一叠盘子，你每清理完一个碟子你往上叠。结束后你从最上面的开始一个一个回收。最后一个清洁的碟子也是第一个拿走的。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/stack.png?alt=media&token=3d248a10-e203-4e05-9783-a2b619889ab8" width="70%" height="auto"/>
<br />

插入方法为`push`，删除方法为`pop`。

#### 复杂度分析

- Search: `O(n)`
- Insert: `O(1)`
- Delete: `O(1)`

### 4. Queue 队列

跟栈相反，队列遵循先进先出原则。可以想象以下我们平常超市购物结账排队的时候。排在第一位置的人也是先结完账最先离开的。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/Introduction.png?alt=media&token=d5dc1f40-5d9a-44b2-94c9-01c0490fab75" width="50%" height="auto"/>
<br />

#### 复杂度分析

- Search: `O(n)`
- Insert: `O(1)`
- Delete: `O(1)`

## Set 集合

Set 代表一个集合，但集合内所有的元素都具有**独特性**。

比如在 Python 中，我们想要获得一个 list 内所有独一无二的元素，我们可以用`set(arry_list)`.

## Dictionary 字典

字典采用`键值对(key value pairs)`的储存方法，即每个键都有相对应的值。

```python
my_dict = {
    "A0": "David",
    "A1": "Nathan",
    "A2": "Ryan"
}

print(my_dict["A0"]) # "David"
```

<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->

# Graph 图

## Types 图的分类

图又可分为有向图和无向图

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-20%20122800.png?alt=media&token=a82cd4fb-63c0-4927-88c9-f3e7ffe13c64" width="70%" height="auto" />

## Representing Graphs 图的表达方式

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-20%20123400.png?alt=media&token=45ef871a-d7a2-465d-aa06-558c07a4acb8"  width="50%" height="auto"/>

### 1. Adjacency Matrix 邻接矩阵

用一个 2D 数组来储存图中顶点间的关系数据。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-20%20123411.png?alt=media&token=4d49cadd-470a-4144-9eb9-75a662fa8de7"  width="50%" height="auto"/>

### 2. Adjacency Lists 邻接表

用来记录每一个节点所连接的所有其他节点。

<img src="https://firebasestorage.googleapis.com/v0/b/yangliweb.appspot.com/o/%E6%89%B9%E6%B3%A8%202020-07-20%20123423.png?alt=media&token=e060e48e-5d26-4938-bacd-b6140111f128"  width="50%" height="auto"/>

## Graph Traversal 图的遍历

### 1. Depth-First Search 深度优先搜索

### 2. Breadth-First Search 广度优先搜素

<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->
<!------------------------------------ 分割线 ---------------------------------------->

# Greedy Approach 贪心算法

## Prim's Algorithm 普林姆算法

{% youtube cplfcGZmX7I %}

## Kruskal's Algorithm 克鲁斯卡尔算法

{% youtube 71UQH7Pr9kU %}

## Dijkstra's Algorithm: 迪克斯特拉算法

{% youtube _lHSawdgXpI %}
