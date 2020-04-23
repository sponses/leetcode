/**
 * @param {string[]} grid
 * @return {number}
 */
var shortestPathAllKeys = function (grid) {
  const h = grid.length,
    w = grid[0].length
  const queue = []
  const visited = new Map()
  let goal = 0
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const temp = grid[i][j]
      if (temp === '@') {
        // 起点
        queue.push({ i, j, k: '' })
        visited.set(i + '-' + j + '-' + '', 1)
      } else if (temp.charCodeAt() > 96 && temp.charCodeAt() < 123) {
        // 钥匙总数
        goal++
      }
    }
  }
  const next = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  let cnt = 0
  while (queue.length) {
    let len = queue.length
    while (len) {
      len--
      const { i, j, k } = queue.shift()
      for (let n = 0; n < 4; n++) {
        const x = i + next[n][0],
          y = j + next[n][1]
        if (x >= 0 && x < h && y >= 0 && y < w) {
          const temp = grid[x][y]
          if (temp === '#') continue
          const str = x + '-' + y + '-' + k
          if (temp.charCodeAt() > 96 && temp.charCodeAt() < 123) {
            if (k.length + 1 === goal) return cnt + 1
            if (!visited.has(str + temp)) {
              queue.push({ i: x, y: j, k: k + temp })
              visited.set(str + temp, 1)
            }
          } else if (!visited.has(str)) {
            let isOk = true
            if (temp.charCodeAt() > 64 && temp.charCodeAt() < 91) {
              isOk = false
              for (let p = 0, l = k.length; p < l; p++) {
                if (k[p] === temp) {
                  isOk = true
                  break
                }
              }
            }
            if (!isOk) continue
            queue.push({ i: x, j: y, k: k })
            visited.set(str, 1)
          }
        }
      }
    }
    cnt++
  }
  return -1
}
shortestPathAllKeys(['@.a.#', '###.#', 'b.A.B'])
