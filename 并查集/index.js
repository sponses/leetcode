/**
 * 547. 朋友圈（并查集）
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function(M) {
  let len = M[0].length,
    arr = new Array(len)

  for (let i = 0; i < len; i++) {
    arr[i] = i
  }

  function union(p, q) {
    let pIndex = find(p),
      qIndex = find(q)

    if (pIndex === qIndex) return
    arr[pIndex] = qIndex
  }

  function find(i) {
    if (i < 0 || i >= arr.length) return false

    while (i !== arr[i]) {
      i = arr[i]
    }
    return i
  }

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (M[i][j] === 1) {
        union(i, j)
      }
    }
  }
  let res = 0
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === i) res++
  }
  return res
}
/**
 * 547. 朋友圈（并查集压缩路径）
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function(M) {
  let ids = [],
    branch = []
  function initFindUnionSet(size) {
    for (let i = 0; i < size; i++) {
      ids[i] = i
      branch[i] = 1
    }
  }
  function find(index) {
    if (index < 0 || index >= ids.length) return -1
    while (index !== ids[index]) index = ids[index]
    return index
  }
  function union(p, q) {
    let pId = find(p),
      qId = find(q)
    if (pId === -1 || qId === -1 || pId === qId) return false
    if (branch[pId] > branch[qId]) {
      ids[qId] = pId
      branch[pId] += branch[qId]
    } else {
      ids[pId] = qId
      branch[qId] += branch[pId]
    }
    return true
  }
  initFindUnionSet(M.length)

  for (let i = 0, len = M.length; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (i !== j) {
        if (M[i][j]) {
          union(i, j)
        }
      }
    }
  }
  let count = 0
  for (let i = 0, len = ids.length; i < len; i++) {
    if (i === ids[i]) count++
  }
  return count
}
