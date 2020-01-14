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
