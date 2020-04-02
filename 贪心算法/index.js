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
/**
 * 659. 分割数组为连续子序列
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossible = function(nums) {
  const counts = {},
    tail = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (counts.hasOwnProperty(nums[i])) {
      counts[nums[i]]++
    } else {
      counts[nums[i]] = 1
    }
    tail[nums[i]] = 0
  }
  for (let i = 0, len = nums.length; i < len; i++) {
    const cur = nums[i]
    if (counts[cur] <= 0) continue
    if (tail[cur - 1] > 0) {
      counts[cur]--
      tail[cur - 1]--
      tail[cur]++
    } else if (counts[cur + 1] > 0 && counts[cur + 2] > 0) {
      counts[cur]--
      counts[cur + 1]--
      counts[cur + 2]--
      tail[cur + 2]++
    } else {
      return false
    }
  }
  return true
}
/**
 * 646. 最长数对链
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
  if (!pairs.length) return 0
  pairs.sort((a, b) => a[1] - b[1])
  const len = pairs.length
  let end = pairs[0][1]
  let ans = 1
  for (let i = 1; i < len; i++) {
    if (pairs[i][0] > end) {
      ans++
      end = pairs[i][1]
    }
  }
  return ans
}
