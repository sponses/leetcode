/**
 * 997. 找到小镇的法官（图）
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(N, trust) {
  let deGeree = new Array(N)
  deGeree.fill(0)
  for (let i = 0, len = trust.length; i < len; i++) {
    deGeree[trust[i][0] - 1]++
  }
  for (let i = 0; i < N; i++) {
    if (deGeree[i] === 0) {
      let count = N - 1,
        cur = i + 1
      for (let j = 0, len = trust.length; j < len; j++) {
        if (trust[j][1] == cur) count--
      }
      if (count === 0) return cur
    }
  }
  return -1
}
/**
 * 133. 克隆图（dfs）
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
  let hash = {}
  function dfs(node) {
    if (!node) return null
    if (hash.hasOwnProperty(node.val)) return hash[node.val]
    let clone = new Node(node.val)
    hash[node.val] = clone
    for (let i = 0, len = node.neighbors.length; i < len; i++) {
      clone.neighbors.push(dfs(node.neighbors[i]))
    }
    return clone
  }
  return dfs(node)
}
