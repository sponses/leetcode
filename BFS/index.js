/**
 * 127. 单词接龙
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  if (beginWord === endWord) return 1
  if (wordList.indexOf(endWord) === -1) return 0
  const visited = { [beginWord]: 1, [endWord]: 1 }
  let q1 = [beginWord],
    q2 = [endWord]
  let ans = 1
  function canChange(word1, word2) {
    let ans = word1.length
    for (let i = 0, len = word1.length; i < len; i++) {
      if (word1[i] === word2[i]) ans--
    }
    return ans === 1
  }
  while (q1.length && q2.length) {
    if (q1.length > q2.length) {
      const temp = q1
      q1 = q2
      q2 = temp
    }
    const q3 = []
    for (let i = 0, len1 = q1.length; i < len1; i++) {
      for (let j = 0, len2 = wordList.length; j < len2; j++) {
        if (canChange(q1[i], wordList[j])) {
          if (q2.indexOf(wordList[j]) !== -1) return ans + 1
          if (!visited.hasOwnProperty(wordList[j])) {
            q3.push(wordList[j])
            visited[wordList[j]] = 1
          }
        }
      }
    }
    ans++
    q1 = q3
  }
  return 0
}
/**
 * 752. 打开转盘锁
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  const deadHash = {}
  for (let i = 0, len = deadends.length; i < len; i++) deadHash[deadends[i]] = 1
  if (deadHash['0000']) return -1
  if ('0000' === target) return 0
  deadHash['0000'] = 1
  function getNeighbors(str) {
    const ans = []
    for (let i = 0; i < 4; i++) {
      const a = str[i] == 0 ? 9 : +str[i] - 1
      const b = str[i] == 9 ? 0 : +str[i] + 1
      ans.push(
        str.slice(0, i) + a + str.slice(i + 1),
        str.slice(0, i) + b + str.slice(i + 1)
      )
    }
    return ans
  }
  let ans = 0
  let q1 = ['0000'],
    q2 = [target]
  while (q1.length && q2.length) {
    if (q1.length > q2.length) {
      const temp = q2
      q2 = q1
      q1 = temp
    }
    const q3 = []
    for (let i = 0, len = q1.length; i < len; i++) {
      const cur = getNeighbors(q1[i])
      for (let j = 0, len = cur.length; j < len; j++) {
        if (q2.indexOf(cur[j]) !== -1) return ans + 1
        if (!deadHash[cur[j]]) {
          deadHash[cur[j]] = 1
          q3.push(cur[j])
        }
      }
    }
    ans++
    q1 = q3
  }
  return -1
}
/**
 * 743. 网络延迟时间
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime = function (times, N, K) {
  const graph = new Array(N + 1)
  for (let i = 0; i <= N; i++) {
    graph[i] = new Array(N + 1)
    graph[i].fill(-1)
  }
  for (let i = 0, len = times.length; i < len; i++) {
    const time = times[i]
    graph[time[0]][time[1]] = time[2]
  }
  const cost = new Array(N + 1)
  for (let i = 1; i <= N; i++) {
    cost[i] = graph[K][i]
  }
  cost[K] = 0
  const visited = new Array(N + 1)
  visited.fill(false)
  visited[K] = true
  for (let c = 0; c < N - 1; c++) {
    let minVal = Number.MAX_SAFE_INTEGER
    let minIndex = -1
    for (let i = 1; i <= N; i++) {
      if (cost[i] !== -1 && !visited[i] && minVal > cost[i]) {
        minVal = cost[i]
        minIndex = i
      }
    }
    if (minIndex === -1) break
    visited[minIndex] = true
    for (let i = 1; i <= N; i++) {
      if (graph[minIndex][i] !== -1) {
        const temp = graph[minIndex][i] + cost[minIndex]
        cost[i] = cost[i] === -1 ? temp : Math.min(temp, cost[i])
      }
    }
  }
  let ans = -1
  for (let i = 1; i <= N; i++) {
    if (cost[i] === -1) return -1
    ans = Math.max(ans, cost[i])
  }
  return ans
}
/**
 * 310. 最小高度树
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function(n, edges) {
    const visited = new Array(n)
    visited.fill(false)
    const inDegree = new Array(n)
    inDegree.fill(0)
    for(let i = 0, len = edges.length; i<len; i++){
        const temp = edges[i]
        inDegree[temp[0]]++
        inDegree[temp[1]]++
    }
    while(true){
        const temp = []
        let flag = false
        for(let i = 0; i<n; i++){
            if(inDegree[i] > 1) flag = true
            if(inDegree[i] === 1) temp.push(i)
        }
        if(!flag) break
        for(let i = 0, len = temp.length; i<len;i++){
            visited[temp[i]] = true
            for(let j = 0, len2 = edges.length; j<len2; j++){
                if(temp[i] === edges[j][0] || temp[i] === edges[j][1]) {
                    const item = edges[j]
                    inDegree[item[0]]--
                    inDegree[item[1]]--
                }
            }
        }
    }
    const ans = []
    for(let i = 0; i<n; i++) if(!visited[i]) ans.push(i)
    return ans
};

/**
 * 1293. 网格中的最短路径(DFS)
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var shortestPath = function(grid, k) {
    const h = grid.length, w = grid[0].length
    function dp(i,j,k){
        if(k < 0) return Number.MAX_SAFE_INTEGER
        if(i === h - 1 && j === w - 1) return 0
        if(grid[i][j] === '#') return Number.MAX_SAFE_INTEGER
        const temp = grid[i][j]
        grid[i][j] = '#'
        let ans = Number.MAX_SAFE_INTEGER
        if(j + 1 < w) ans = Math.min(dp(i,j+1,k - (grid[i][j+1] === 1 ? 1 : 0)),ans)
        if(j - 1 >= 0) ans = Math.min(dp(i,j-1,k - (grid[i][j-1] === 1 ? 1 : 0)),ans)
        if(i + 1 < h) ans = Math.min(dp(i+1,j,k - (grid[i+1][j] === 1 ? 1 : 0)),ans)
        if(i - 1 >= 0) ans = Math.min(dp(i-1,j,k - (grid[i-1][j] === 1 ? 1 : 0)),ans)
        grid[i][j] = temp
        return 1 + ans
    }
    const ans = dp(0,0,k)
    return ans >= Number.MAX_SAFE_INTEGER ? -1 : ans
};
/**
 * 1293. 网格中的最短路径
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var shortestPath = function(grid, k) {
    const h = grid.length, w = grid[0].length
    const queue = [{x:0,y:0,rest:k}]
    const next = [[-1,0],[1,0],[0,-1],[0,1]]
    const visited = {}
    if(h == 1 && w === 1) return 0
    visited[0 + '-' + 0 + '-' +k] = true
    let ans = 0
    while(queue.length){
        let count = queue.length
        while(count){
            count--
            const {x,y,rest} = queue.shift()
            for(let i = 0; i < 4;i++){
                const nx = x + next[i][0]
                const ny = y + next[i][1]
                if(0 <= nx && nx < h && 0 <= ny && ny < w){
                    if(nx === h-1 && ny === w-1) return ans + 1
                    if(grid[nx][ny] === 1 && rest > 0 && !visited[nx+'-'+ny+'-'+(rest-1)]) {
                        queue.push({x:nx,y:ny,rest:(rest-1)}) 
                        visited[nx+'-'+ny+'-'+(rest-1)] = true
                    }
                    if(grid[nx][ny] === 0 && !visited[nx+'-'+ny+'-'+rest]) {
                        queue.push({x:nx,y:ny,rest})
                        visited[nx+'-'+ny+'-'+rest] = true
                    }
                }
            }
        }
        ans++
    }
    return -1
};