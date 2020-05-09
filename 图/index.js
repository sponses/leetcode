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
/**
 * 133. 克隆图（bfs）
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
  if (!node) return null
  let hash = {},
    queue = [node],
    clone = new Node(node.val)
  hash[node.val] = clone
  while (queue.length) {
    let temp = queue.pop()
    for (let i = 0, len = temp.neighbors.length; i < len; i++) {
      let cur = temp.neighbors[i]
      if (!hash.hasOwnProperty(cur.val)) {
        hash[cur.val] = new Node(cur.val)
        queue.push(cur)
      }
      hash[temp.val].neighbors.push(hash[cur.val])
    }
  }
  return clone
}
/**
 * 1203. 项目管理
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
var sortItems = function(n, m, group, beforeItems) {
    let max_m = 0
    for(let i = 0; i<n; i++) max_m = Math.max(max_m,group[i])
    m = max_m + 1
    for(let i = 0; i<n; i++) if(group[i] === -1) group[i] = m++
    const ans = []
    const graph_group = new Array(m)
    const indegree_group = new Array(m)
    const graph_items = new Array(n)
    const indegree_items = new Array(n)
    indegree_group.fill(0)
    indegree_items.fill(0)
    for(let i = 0; i<m; i++){
        graph_group[i] = new Array(m)
        graph_group[i].fill(0)
    }
    for(let i = 0; i<n; i++){
        graph_items[i] = new Array(n)
        graph_items[i].fill(0)
    }
    for(let i = 0; i<n; i++){
        const g = group[i]
        const before = beforeItems[i]
        for(let j = 0, len = before.length; j<len; j++){
            const b = before[j]
            if(g === group[b]){
                graph_items[b][i] = 1
                indegree_items[i]++
            }
            if(g !== group[b] && graph_group[group[b]][g] === 0){
                graph_group[group[b]][g] = 1
                indegree_group[g]++
            }
        }
    }
    const order_group = []
    while(true){
        const list = []
        for(let i = 0; i<m; i++){
            if(indegree_group[i] === 0){
                list.push(i)
                indegree_group[i]--
                for(let j = 0; j<m; j++){
                    if(graph_group[i][j]) indegree_group[j]--
                }
            }
        }
        if(list.length === 0) break
        order_group.push(...list)
    }
    if(order_group.length !== m) return ans
    const g_items = new Array(order_group.length)
    for(let i = 0, len = order_group.length; i<len; i++) g_items[i] = []
    for(let i = 0; i<n; i++){
        const index = order_group.indexOf(group[i])
        g_items[index].push(i)
    }
    for(let i = 0, len = g_items.length; i<len; i++){
        const items = g_items[i]
        const order_items = []
        while(true){
            const list = []
            for(let j = 0, len = items.length; j<len; j++){
                if(items[j] !== -1 && indegree_items[items[j]] === 0){
                    list.push(items[j])
                    for(let k = 0; k<n; k++){
                        if(graph_items[items[j]][k]) indegree_items[k]--
                    }
                    indegree_items[items[j]]--
                    items[j] = -1
                }
            }
            if(list.length === 0) break
            order_items.push(...list)
        }
        if(order_items.length !== items.length) return []
        ans.push(...order_items)
    }
    return ans
};