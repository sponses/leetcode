/**
 * 1046. 最后一块石头的重量（大顶堆）
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
  //解题思路：大顶堆
  let heap = [null]
  //初始化堆
  for (let i = 0, len = stones.length; i < len; i++) {
    insert(stones[i])
  }

  // 插入
  function insert(val) {
    heap.push(val)
    let i = heap.length - 1,
      p = Math.floor(i / 2)
    while (i > 1) {
      if (heap[i] <= heap[p]) return
      ;[heap[i], heap[p]] = [heap[p], heap[i]]
      i = p
      p = Math.floor(i / 2)
    }
  }
  //取出堆顶
  function getTop() {
    let res = heap[1]
    heap[1] = heap[heap.length - 1]
    heap.pop()

    //维持大顶堆
    let i = 1
    while (i * 2 < heap.length) {
      let cur = heap[i],
        left = heap[i * 2],
        right = heap[i * 2 + 1]

      if (cur >= left && (right === undefined || cur >= right)) return res

      if (left >= cur && (right === undefined || left >= right)) {
        ;[heap[i], heap[i * 2]] = [left, cur]
        i = i * 2
      } else if (right !== undefined && right >= left && right >= cur) {
        ;[heap[i], heap[i * 2 + 1]] = [right, cur]
        i = i * 2 + 1
      }
    }
    return res
  }
  //循环数组，直到数组长度为0或1
  while (heap.length > 2) {
    let y = getTop(),
      x = getTop()
    if (x === y) continue
    insert(y - x)
  }
  return heap.length === 1 ? 0 : heap[1]
}
/**
 * 347. 前 K 个高频元素（小顶堆）
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  //使用哈希表获取每个数字出现的频率
  //这里应该用Map，懒得改了
  let obj = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (!obj.hasOwnProperty(nums[i])) {
      obj[nums[i]] = 1
      continue
    }
    obj[nums[i]]++
  }

  //维护一个长度为k的小顶堆
  let keys = Object.keys(obj),
    heap = [null]
  for (let i = 0, len = keys.length; i < len; i++) {
    if (i < k) {
      insert(keys[i])
    } else {
      compare(keys[i])
    }

    function insert(key) {
      heap.push(key)
      let i = heap.length - 1,
        p = Math.floor(i / 2)

      while (i > 1) {
        if (obj[heap[i]] >= obj[heap[p]]) break
        ;[heap[i], heap[p]] = [heap[p], heap[i]]
        i = p
        p = Math.floor(i / 2)
      }
    }

    function compare(key) {
      if (obj[key] <= obj[heap[1]]) return

      heap[1] = key
      let i = 1
      while (i * 2 < heap.length) {
        let left = heap[i * 2],
          right = heap[i * 2 + 1]
        if (
          obj[key] <= obj[left] &&
          (right === undefined || obj[key] <= obj[right])
        )
          break
        if (
          obj[left] <= obj[key] &&
          (right === undefined || obj[left] <= obj[right])
        ) {
          ;[heap[i * 2], heap[i]] = [heap[i], heap[i * 2]]
          i = i * 2
        } else if (
          right !== undefined &&
          obj[right] <= obj[key] &&
          obj[right] <= obj[left]
        ) {
          ;[heap[i * 2 + 1], heap[i]] = [heap[i], heap[i * 2 + 1]]
          i = i * 2 + 1
        }
      }
    }
  }
  heap.shift()

  return heap.map(item => +item)
}
/**
 * 378. 有序矩阵中第K小的元素（大顶堆）
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(matrix, k) {
  let heap = [null]

  //维持一个大顶堆
  function insert(val, k) {
    if (heap.length - 1 < k) {
      //堆中元素数量小于k，继续插入
      heap.push(val)
      let i = heap.length - 1
      while (i > 1) {
        let p = Math.floor(i / 2)
        if (val <= heap[p]) return
        ;[heap[i], heap[p]] = [heap[p], heap[i]]
        i = p
      }
    } else {
      //堆中元素大于等于k，要插入的值与堆顶比较
      //如果大于不做处理，小于则替换掉堆顶
      if (heap[1] <= val) return
      heap[1] = val
      let i = 1
      while (i * 2 < heap.length) {
        let left = heap[i * 2],
          right = heap[i * 2 + 1]
        if (val >= left && (right === undefined || val >= right)) return

        if (left > val && (right === undefined || left >= right)) {
          ;[heap[i * 2], heap[i]] = [heap[i], heap[i * 2]]
          i = i * 2
        } else if (right !== undefined && right >= left && right > val) {
          ;[heap[i * 2 + 1], heap[i]] = [heap[i], heap[i * 2 + 1]]
          i = i * 2 + 1
        }
      }
    }
  }

  for (let i = 0, len = matrix.length; i < len; i++) {
    for (let j = 0; j < len; j++) {
      insert(matrix[i][j], k)
    }
  }
  return heap[1]
}
/**
 * 480. 滑动窗口中位数（排序超时）
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var medianSlidingWindow = function(nums, k) {
  let temp = [],
    res = [],
    left = 0,
    right = 0
  if (!k) return res
  while (right < nums.length) {
    temp.push(nums[right])
    if (temp.length >= k) {
      if (temp.length > k) {
        temp.shift()
      }
      let arr = [...temp]
      arr.sort((a, b) => a - b)
      if (k % 2 === 0) {
        res.push((arr[Math.floor((k - 1) / 2)] + arr[k / 2]) / 2)
      } else {
        res.push(arr[Math.floor(k / 2)])
      }
    }
    right++
  }
  return res
}
