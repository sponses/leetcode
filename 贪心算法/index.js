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
/**
 * 122.买卖股票的最佳时机Ⅱ
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let maxProfit = 0
  for (let i = 0, len = prices.length - 1; i < len; i++) {
    if (prices[i] < prices[i + 1]) {
      maxProfit += prices[i + 1] - prices[i]
    }
  }
  return maxProfit
}
/**
 * 392.判断子序列
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  let count = 0
  for (let i = 0, len = t.length; i < len; i++) {
    if (count === s.length) {
      break
    }
    if (t[i] === s[count]) {
      count++
    }
  }
  return count === s.length
}
