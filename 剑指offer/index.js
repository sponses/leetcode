/**
 * 面试题29. 顺时针打印矩阵
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  if (matrix.length === 0) return []
  const ans = []
  let l = 0,
    r = matrix[0].length,
    u = 0,
    d = matrix.length
  while (true) {
    for (let i = l; i < r; i++) ans.push(matrix[u][i])
    if (++u === d) break
    for (let i = u; i < d; i++) ans.push(matrix[i][r - 1])
    if (--r === l) break
    for (let i = r - 1; i >= l; i--) ans.push(matrix[d - 1][i])
    if (--d === u) break
    for (let i = d - 1; i >= u; i--) ans.push(matrix[i][l])
    if (++l === r) break
  }
  return ans
}
