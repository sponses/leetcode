/**
 * 455.分发饼干
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  let child = 0,
    cookie = 0
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)

  while (child < g.length && cookie < s.length) {
    if (g[child] <= s[cookie]) {
      child++
    }
    cookie++
  }
  return child
}
