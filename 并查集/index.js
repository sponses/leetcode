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
