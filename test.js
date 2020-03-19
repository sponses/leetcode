var movingCount = function(m, n, k) {
  const board = new Array(m)
  for (let i = 0; i < m; i++) board[i] = new Array(n)
  let ans = 0
  function dfs(i, j, temp) {
    if (i < 0 || i >= m || j < 0 || j >= n) {
      ans = Math.max(ans, temp)
      return
    }
    let cur = '' + i + j,
      sum = 0
    for (let i = 0, len = cur.length; i < len; i++) sum += +cur[i]
    if (sum > k) {
      ans = Math.max(ans, cur)
      return
    }
    if (board[i][j] === '#') {
      dfs(i - 1, j, temp)
      dfs(i + 1, j, temp)
      dfs(i, j - 1, temp)
      dfs(i, j + 1, temp)
    } else {
      board[i][j] = '#'
      temp++
      dfs(i - 1, j, temp)
      dfs(i + 1, j, temp)
      dfs(i, j - 1, temp)
      dfs(i, j + 1, temp)
      board[i][j] = undefined
    }
  }
  dfs(0, 0, 0)
  return ans
}
movingCount(1, 2, 1)
