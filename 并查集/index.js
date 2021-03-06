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
 * 547. 朋友圈（并查集秩合并）
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
/**
 * 684. 冗余连接（并查集）
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
  let ids = [],
    branch = []
  function initFindUnionSet(size) {
    for (let i = 0; i < size; i++) {
      ids[i] = i
      branch = 1
    }
    a
  }
  function find(index) {
    while (index !== ids[index]) index = ids[index]
    return index
  }
  function union(p, q) {
    let pId = find(p),
      qId = find(q)
    if (pId === qId) return false
    if (branch[pId] >= branch[qId]) {
      ids[qId] = pId
      branch[pId] += branch[qId]
    } else {
      ids[pId] = qId
      branch[qId] += branch[pId]
    }
    return true
  }
  let max = 0
  for (let i = 0, len = edges.length; i < len; i++) {
    max = Math.max(max, edges[i][1])
  }
  initFindUnionSet(max)
  for (let i = 0, len = edges.length; i < len; i++) {
    if (!union(...edges[i])) return edges[i]
  }
}
/**
 * 721. 账户合并（并查集）
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
  let ids = [],
    branch = []
  function initFindUnionSet(size) {
    for (let i = 0; i < size; i++) {
      ids[i] = i
      branch = 1
    }
  }
  function find(index) {
    while (index !== ids[index]) index = ids[index]
    return index
  }
  function union(p, q) {
    let pId = find(p),
      qId = find(q)
    if (pId === qId) return false
    if (branch[qId] > branch[pId]) {
      ids[pId] = qId
      branch[qId] += branch[pId]
    } else {
      ids[qId] = pId
      branch[pId] += branch[qId]
    }
    return true
  }
  initFindUnionSet(accounts.length)
  for (let i = 1, len = accounts.length; i < len; i++) {
    for (let j = 0; j < i; j++) {
      for (let k = 1; k < accounts[i].length; k++) {
        if (accounts[j].includes(accounts[i][k])) {
          union(i, j)
        }
      }
    }
  }

  for (let i = 0, len = ids.length; i < len; i++) {
    if (i !== ids[i]) {
      let id = find(i)
      accounts[id] = [...new Set([...accounts[id], ...accounts[i]])]
      accounts.splice(i, 1)
    }
  }

  return accounts
}
