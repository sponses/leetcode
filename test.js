var exist = function(board, word) {
  const row = board.length,
    col = board[0].length,
    len = word.length
  function dfs(i, j, k) {
    if (i < 0 || i >= row || j < 0 || j >= col || word[k] !== board[i][j])
      return false
    if (k === len - 1) return true
    const temp = board[i][j]
    board[i][j] = '#'
    let res =
      dfs(i - 1, j, k + 1) ||
      dfs(i + 1, j, k + 1) ||
      dfs(i, j - 1, k + 1) ||
      dfs(i, j + 1, k + 1)
    board[i][j] = temp
    return res
  }
  let res = false
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === word[0]) {
        res = res || dfs(i, j, 0)
      }
      if (res) return true
    }
  }
  return res
}
exist(
  [
    ['a', 'b'],
    ['c', 'd']
  ],
  'abcd'
)
