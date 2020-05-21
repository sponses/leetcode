/**
 * 455.分发饼干
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
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
var maxProfit = function (prices) {
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
var isSubsequence = function (s, t) {
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
var isPossible = function (nums) {
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
var findLongestChain = function (pairs) {
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
/**
 * 984. 不含 AAA 或 BBB 的字符串
 * @param {number} A
 * @param {number} B
 * @return {string}
 */
var strWithout3a3b = function (A, B) {
  let S = '',
    a = 'a',
    b = 'b'
  if (A < B) {
    const temp = A
    A = B
    B = temp
    a = 'b'
    b = 'a'
  }
  while (A) {
    if (A--) S += a
    if (A >= B && A > 0) {
      S += a
      A--
    }
    if (B--) S += b
  }
  return S
}
/**
 * 1266. 访问所有点的最小时间
 * @param {number[][]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function (points) {
  const len = points.length
  if (len <= 1) return 0
  let ans = 0
  let start = points[0]
  for (let i = 1, len = points.length; i < len; i++) {
    const cur = points[i]
    const x = Math.abs(cur[0] - start[0])
    const y = Math.abs(cur[1] - start[1])
    ans += Math.abs(x - y) + Math.min(x, y)
    start = cur
  }
  return ans
}
/**
 * 135. 分发糖果
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  let ans = 0
  const len = ratings.length
  const arr_left = new Array(len),
    arr_right = new Array(len)
  arr_left.fill(1)
  arr_right.fill(1)
  for (let i = 1; i < len; i++) {
    if (ratings[i] > ratings[i - 1]) arr_left[i] = arr_left[i - 1] + 1
    if (ratings[len - i - 1] > ratings[len - i])
      arr_right[len - i - 1] = arr_right[len - i] + 1
  }
  for (let i = 0; i < len; i++) ans += Math.max(arr_left[i], arr_right[i])
  return ans
}
