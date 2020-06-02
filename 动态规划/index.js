/**
 * 322. 零钱兑换（暴力递归超时）
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  if (amount === 0) return 0

  let min = Number.MAX_SAFE_INTEGER
  for (let i = 0, len = coins.length; i < len; i++) {
    if (coins[i] > amount) continue

    let res = coinChange(coins, amount - coins[i])
    if (res === -1) continue
    min = Math.min(min, res + 1)
  }
  return min === Number.MAX_SAFE_INTEGER ? -1 : min
}

/**
 * 322. 零钱兑换（备忘录递归通过）
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let obj = {},
    len = coins.length

  function change(amount) {
    if (amount === 0) return 0

    let min = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < len; i++) {
      if (coins[i] > amount) continue

      if (!obj.hasOwnProperty(amount - coins[i])) {
        obj[amount - coins[i]] = change(amount - coins[i])
      }
      if (obj[amount - coins[i]] === -1) continue
      min = Math.min(min, 1 + obj[amount - coins[i]])
    }
    return min === Number.MAX_SAFE_INTEGER ? -1 : min
  }
  return change(amount)
}
/**
 * 322. 零钱兑换（动态规划通过）
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let arr = new Array(amount + 1)
  arr.fill(-1)

  arr[0] = 0

  for (let i = 1; i <= amount; i++) {
    let min = Number.MAX_SAFE_INTEGER
    for (let j = 0, len = coins.length; j < len; j++) {
      if (i < coins[j]) continue
      let res = arr[i - coins[j]]
      if (res === -1) continue

      min = Math.min(min, res + 1)
    }
    if (min !== Number.MAX_SAFE_INTEGER) {
      arr[i] = min
    }
  }
  return arr[amount]
}
/**
 * 53. 最大子序和（暴力循环）
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let max = Number.MIN_SAFE_INTEGER

  for (let i = 0, len = nums.length; i < len; i++) {
    let res = 0
    for (let j = i; j < len; j++) {
      res += nums[j]
      max = Math.max(max, res)
    }
  }
  return max
}
/**
 * 53. 最大子序和（动态规划）
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let res = nums[0],
    last = nums[0]
  for (let i = 1, len = nums.length; i < len; i++) {
    last = Math.max(last + nums[i], nums[i])
    res = Math.max(last, res)
  }
  return res
}

/**
 * 198. 打家劫舍（动态规划）
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 0) return 0
  if (nums.length === 1) return nums[0]
  if (nums.length === 2) return Math.max(nums[0], nums[1])

  let arr = [nums[0], nums[1]],
    pMax = arr[0],
    max = arr[1]

  for (let i = 2, len = nums.length; i < len; i++) {
    arr.push(pMax + nums[i])
    pMax = Math.max(pMax, arr[i - 1])
    max = Math.max(max, arr[i])
  }

  return max
}
/**
 * 70. 爬楼梯（动态规划）
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n === 1) return 1

  let a = 1,
    b = 2
  for (let i = 3; i <= n; i++) {
    let temp = a + b
    a = b
    b = temp
  }
  return b
}
/**
 * 5. 最长回文子串（暴力循环超时）
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let max = ''
  for (let i = 0, len = s.length; i < len; i++) {
    let temp = '',
      ans = ''
    for (let j = i; j < len; j++) {
      temp += s[j]
      if (temp === temp.split('').reverse().join('')) {
        ans = temp
      }
    }
    if (ans.length > max.length) max = ans
  }
  return max
}
/**
 * 300. 最长上升子序列
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (!nums.length) return 0

  let dp = new Array(nums.length)
  dp.fill(1)

  for (let i = 0, len = nums.length; i < len; i++) {
    let max = 1
    for (let j = 0; j < i; j++) {
      let temp = 1
      if (nums[i] > nums[j]) temp += dp[j]
      max = Math.max(max, temp)
    }
    dp[i] = max
  }
  return Math.max(...dp)
}

/**
 * 64. 最小路径和
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const dp = new Array(grid.length)
  dp.fill(new Array(grid[0].length))
  let temp1 = 0,
    temp2 = grid[0][0]
  for (let i = 0, len = grid.length; i < len; i++) {
    for (let j = 0, len = grid[0].length; j < len; j++) {
      if (i === 0) {
        temp1 += grid[i][j]
        dp[i][j] = temp1
        continue
      }
      if (j === 0) {
        temp2 += grid[i][j]
        dp[i][j] = temp2
        continue
      }
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }
  return dp[grid.length - 1][grid[0].length - 1]
}
/**
 * 509. 斐波那契数
 * @param {number} N
 * @return {number}
 */
var fib = function (N) {
  if (N === 0) return 0
  if (N === 1) return 1
  let a = 0,
    b = 1
  for (let i = 2; i <= N; i++) {
    let temp = a + b
    a = b
    b = temp
  }
  return b
}
/**
 * 416. 分割等和子集（动态规划，01背包问题）
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  if (nums.length === 0) return true
  let sum = 0,
    n = nums.length
  for (let i = 0; i < n; i++) {
    sum += nums[i]
  }
  if (sum % 2 !== 0) return false
  let c = sum / 2
  let dp = new Array(c + 1)
  dp.fill(false)
  dp[nums[0]] = true
  for (let i = 1; i < n; i++) {
    for (let j = c; j >= nums[i]; j--) {
      dp[j] = dp[j] || dp[j - nums[i]]
    }
  }
  return dp[c]
}
/**
 * 1049. 最后一块石头的重量 II（动态规划，01背包问题）
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
  let sum = 0,
    n = stones.length
  for (let i = 0; i < n; i++) {
    sum += stones[i]
  }
  let max = Math.floor(sum / 2)
  let dp = new Array(max + 1)
  dp.fill(0)
  for (let i = 0; i < n; i++) {
    let cur = stones[i]
    for (let j = max; j >= cur; j--) {
      dp[j] = Math.max(dp[j], dp[j - cur] + cur)
    }
  }
  return sum - dp[max] * 2
}
/**
 * 474. 一和零（动态规划，01背包问题）
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  let len = strs.length
  // m为0的个数， n为1的个数
  let dp = new Array(m + 1)
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1)
    dp[i].fill(0)
  }
  for (let i = 0; i < len; i++) {
    let cur = strs[i],
      zero = 0,
      one = 0
    for (let char = 0; char < cur.length; char++) {
      if (cur[char] === '0') zero++
    }
    one = cur.length - zero
    for (let j = m; j >= zero; j--) {
      for (let k = n; k >= one; k--) {
        dp[j][k] = Math.max(dp[j][k], 1 + dp[j - zero][k - one])
      }
    }
  }
  return dp[m][n]
}
/**
 * 139. 单词拆分（动态规划，01背包问题）
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  let n = s.length
  let dp = new Array(n + 1)
  dp.fill(false)
  dp[0] = true
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.indexOf(s.slice(j, i)) !== -1) {
        dp[i] = true
        break
      }
    }
  }
  return dp[n]
}
/**
 * 322. 零钱兑换（动态规划，完全背包）
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let len = coins.length
  let dp = new Array(amount + 1)
  dp.fill(-1)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    let temp = Number.MAX_SAFE_INTEGER
    for (let j = 0; j < len; j++) {
      if (i - coins[j] >= 0 && dp[i - coins[j]] !== -1)
        temp = Math.min(temp, 1 + dp[i - coins[j]])
    }
    if (temp !== Number.MAX_SAFE_INTEGER) dp[i] = temp
  }
  return dp[amount]
}
/**
 * 518. 零钱兑换 II（动态规划，完全背包）
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  let dp = new Array(amount + 1)
  dp.fill(0)
  dp[0] = 1
  for (let i = 0, len = coins.length; i < len; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]]
    }
  }
  return dp[amount]
}
/**
 * 198. 打家劫舍（动态规划，01背包问题）
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (!nums.length) return 0
  let prev1 = 0,
    prev2 = nums[0]
  for (let i = 1, len = nums.length; i < len; i++) {
    let temp = prev2
    prev2 = Math.max(nums[i] + prev1, temp)
    prev1 = temp
  }
  return prev2 > prev1 ? prev2 : prev1
}
/**
 * 213. 打家劫舍 II（动态规划，01背包问题）
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (!nums.length) return 0
  let prev1 = 0,
    prev2 = nums[0]
  for (let i = 1, len = nums.length - 1; i < len; i++) {
    let temp = prev2
    prev2 = Math.max(temp, prev1 + nums[i])
    prev1 = temp
  }
  let prev3 = 0,
    prev4 = nums[nums.length - 1]
  for (let i = nums.length - 2; i > 0; i--) {
    let temp = prev4
    prev4 = Math.max(prev3 + nums[i], temp)
    prev3 = temp
  }
  return prev4 > prev2 ? prev4 : prev2
}
/**
 * 70. 爬楼梯（动态规划，斐波那契数列）
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let i = 1,
    j = 1
  for (let k = 2; k <= n; k++) {
    let temp = j
    j = i + temp
    i = temp
  }
  return j
}
/**
 * 300. 最长上升子序列（动态规划）
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let len = nums.length,
    dp = new Array(len)
  dp.fill(1)
  for (let i = 1; i < len; i++) {
    let count = 1
    for (let j = 0; j < i; j++) {
      if (nums[i] - nums[j] > 0) count = Math.max(count, dp[j] + 1)
    }
    dp[i] = count
  }
  let res = 0
  for (let i = 0; i < len; i++) {
    res = Math.max(dp[i], res)
  }
  return res
}
/**
 * 72. 编辑距离（暴力递归）
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  function dp(i, j) {
    if (i === -1 && j === -1) return 0
    if (i === -1) return j + 1
    if (j === -1) return i + 1
    if (word1[i] === word2[j]) return dp(i - 1, j - 1)
    let res = 1 + Math.min(dp(i, j - 1), dp(i - 1, j), dp(i - 1, j - 1))
    return res
  }
  return dp(word1.length - 1, word2.length - 1)
}
/**
 * 72. 编辑距离（动态规划）
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let len1 = word1.length,
    len2 = word2.length
  let dp = new Array(len1 + 1)
  for (let i = 0; i <= len1; i++) {
    dp[i] = new Array(len2)
    dp[i][0] = i
  }
  for (let j = 0; j <= len2; j++) {
    dp[0][j] = j
  }
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (word2[j - 1] === word1[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j])
      }
    }
  }
  return dp[len1][len2]
}
/**
 * 1143. 最长公共子序列（暴力递归）
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  function dp(i, j) {
    if (i === -1 || j === -1) return 0
    if (text2[j] === text1[i]) return 1 + dp(i - 1, j - 1)
    return Math.max(dp(i, j - 1), dp(i - 1, j))
  }
  return dp(text1.length - 1, text2.length - 1)
}
/**
 * 1143. 最长公共子序列（动态规划）
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  let len1 = text1.length,
    len2 = text2.length
  let dp = new Array(len1 + 1)
  for (let i = 0; i <= len1; i++) {
    dp[i] = new Array(len2 + 1)
    dp[i][0] = 0
  }
  for (let i = 0; i <= len2; i++) {
    dp[0][i] = 0
  }
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }
  return dp[len1][len2]
}
/**
 * 516. 最长回文子序列（暴力递归）
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  function dp(n, str) {
    if (n === -1)
      return str === str.split('').reverse().join('') ? str.length : 0
    return Math.max(dp(n - 1, str + s[n]), dp(n - 1, str))
  }
  return dp(s.length - 1, '')
}
/**
 * 516. 最长回文子序列（暴力递归Ⅱ）
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
  function dp(i, j) {
    if (i === j) return 1
    if (s[i] === s[j]) return j - i > 1 ? dp(i + 1, j - 1) + 2 : 2
    return Math.max(dp(i + 1, j), dp(i, j - 1))
  }
  return dp(0, s.length)
}
/**
 * 435. 无重叠区间（贪心算法）
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
  if (intervals.length === 0) return 0
  intervals.sort((a, b) => a[1] - b[1])
  let end = intervals[0][1],
    count = 0
  for (let i = 1; i < intervals.length; i++) {
    let cur = intervals[i]
    if (end > cur[0]) {
      count++
    } else {
      end = cur[1]
    }
  }
  return count
}
/**
 * 452. 用最少数量的箭引爆气球（贪心算法）
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  if (!points.length) return 0
  points.sort((a, b) => a[1] - b[1])
  let end = points[0][1],
    count = 1
  for (let i = 0, len = points.length; i < len; i++) {
    let cur = points[i]
    if (end < cur[0]) {
      count++
      end = cur[1]
    }
  }
  return count
}
/**
 * 121. 买卖股票的最佳时机（动态规划）
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length === 0) return 0
  let len = prices.length
  let dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(2)
  }
  for (let i = 0; i < len; i++) {
    if (i === 0) {
      dp[i][0] = 0
      dp[i][1] = -prices[i]
    } else {
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
      dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
    }
  }
  return dp[len - 1][0]
}
/**
 * 122. 买卖股票的最佳时机 II（动态规划）
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length === 0) return 0
  let len = prices.length,
    dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(2)
  }
  for (let i = 0; i < len; i++) {
    if (i === 0) {
      dp[i][0] = 0
      dp[i][1] = -prices[i]
    } else {
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
      dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1])
    }
  }
  return dp[len - 1][0]
}
/**
 * 198. 打家劫舍（暴力递归）
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  function dp(i) {
    if (i < 0) return 0
    if (i === 0) return nums[i]
    return Math.max(nums[i] + dp(i - 2), dp(i - 1))
  }
  return dp(nums.length - 1)
}
/**
 * 198. 打家劫舍（动态规划）
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  let len = nums.length,
    dp = new Array(len + 1)
  ;(dp[0] = 0), (dp[1] = nums[0])
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.max(nums[i - 1] + dp[i - 2], dp[i - 1])
  }
  return dp[len]
}
/**
 * 337. 打家劫舍 III（暴力递归）
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
  function dp(node) {
    if (!node) return 0
    let left = node.left ? dp(node.left.left) + dp(node.left.right) : 0,
      right = node.right ? dp(node.right.left) + dp(node.right.right) : 0
    return Math.max(node.val + left + right, dp(node.left) + dp(node.right))
  }
  return dp(root)
}
/**
 * 338. 比特位计数
 * @param {number} num
 * @return {number[]}
 */
var countBits = function (num) {
  if (num === 0) return [0]
  let res = [0, 1],
    mul = 2
  for (let i = 2; i <= num; i++) {
    if (i % mul === 0) {
      res[i] = 1
      mul *= 2
    } else {
      res[i] = res[mul / 2] + res[i - mul / 2]
    }
  }
  return res
}
/**
 * 416. 分割等和子集
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const len = nums.length
  if (!len) return false
  let sum = 0
  for (let i = 0; i < len; i++) sum += nums[i]
  if (sum % 2 !== 0) return false
  const half = sum >> 1
  const dp = new Array(half + 1)
  dp.fill(false)
  dp[0] = true
  for (let i = 0; i < len; i++) {
    for (let j = half; j >= nums[i]; j--) {
      dp[j] = dp[j] || dp[j - nums[i]]
    }
  }
  return dp[half]
}
/**
 * 115. 不同的子序列
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const lenS = s.length,
    lenT = t.length
  const dp = new Array(lenS + 1)
  for (let i = 0; i <= lenS; i++) {
    dp[i] = new Array(lenT + 1)
    dp[i].fill(0)
    dp[i][lenT] = 1
  }
  for (let i = lenS - 1; i >= 0; i--) {
    for (let j = lenT - 1; j >= 0; j--) {
      if (s[i] === t[j]) {
        dp[i][j] = dp[i + 1][j + 1] + dp[i + 1][j]
      } else {
        dp[i][j] = dp[i + 1][j]
      }
    }
  }
  return dp[0][0]
}
/**
 * 956. 最高的广告牌
 * @param {number[]} rods
 * @return {number}
 */
var tallestBillboard = function (rods) {
  const len = rods.length
  let res = 0
  let sum = 0
  for (let i = 0; i < len; i++) sum += rods[i]
  rods.sort((a, b) => b - a)
  function dp(i, l, r, remain) {
    if (Math.abs(l - r) > remain || (l + r + remain) >> 1 <= res) return
    if (l === r) res = Math.max(res, l)
    if (i >= len) return
    dp(i + 1, l + rods[i], r, remain - rods[i])
    dp(i + 1, l, r + rods[i], remain - rods[i])
    dp(i + 1, l, r, remain - rods[i])
  }
  dp(0, 0, 0, sum)
  return res
}
/**
 * 1155. 掷骰子的N种方法
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (d, f, target) {
  // 暴力递归
  // function dp(d,remain){
  //     if(d === 0 && remain === 0) return 1
  //     if(remain < 0 || d === 0 || remain > d*f) return 0
  //     let res = 0
  //     for(let i = 1;i<=f;i++){
  //         res += dp(d-1,remain-i)
  //     }
  //     return res
  // }
  // return dp(d,target)

  const dp = new Array(d + 1)
  for (let i = 0; i <= d; i++) {
    dp[i] = new Array(target + 1)
    dp[i].fill(0)
  }
  dp[0][0] = 1
  for (let i = 1; i <= d; i++) {
    for (let j = 1; j <= target; j++) {
      let res = 0
      for (let k = 1; k <= f; k++) {
        res += dp[i - 1][j - k] ? dp[i - 1][j - k] : 0
      }
      dp[i][j] = res % 1000000007
    }
  }
  return dp[d][target]
}
/**
 * 553. 最优除法
 * @param {number[]} nums
 * @return {string}
 */
var optimalDivision = function (nums) {
  if (nums.length === 1) return nums.toString()
  if (nums.length === 2) return nums.join('/')
  let ans = nums[0] + '/' + '('
  for (let i = 1, len = nums.length; i < len; i++) {
    ans += nums[i]
    if (i !== len - 1) ans += '/'
  }
  ans += ')'
  return ans
}
/**
 * 1217. 玩筹码
 * @param {number[]} chips
 * @return {number}
 */
var minCostToMoveChips = function (chips) {
  let ans1 = 0,
    ans2 = 0
  for (let i = 0, len = chips.length; i < len; i++) {
    if (chips[i] % 2 === 0) {
      ans1++
    } else {
      ans2++
    }
  }
  return Math.min(ans1, ans2)
}
/**
 * 115. 不同的子序列
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const lenS = s.length,
    lenT = t.length
  const dp = new Array(lenT + 1)
  dp.fill(0)
  dp[lenT] = 1
  for (let i = lenS - 1; i >= 0; i--) {
    let prev = dp[lenT]
    for (let j = lenT - 1; j >= 0; j--) {
      let temp = dp[j]
      const charS = s[i],
        charT = t[j]
      if (charS === charT) {
        dp[j] = prev + dp[j]
      } else {
        dp[j] = dp[j]
      }
      prev = temp
    }
  }
  return dp[0]
}
/**
 * 300. 最长上升子序列
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const len = nums.length
  const dp = new Array(len)
  if (!len) return 0
  dp.fill(1)
  let max = 1
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) dp[i] = Math.max(dp[j] + 1, dp[i])
    }
    max = Math.max(max, dp[i])
  }
  return max
}
/**
 * 646. 最长数对链
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
  if (!pairs.length) return 0
  pairs.sort((a, b) => a[0] - b[0])
  const len = pairs.length
  const dp = new Array(len)
  dp.fill(1)
  let max = 1
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (pairs[i][0] > pairs[j][1]) dp[i] = Math.max(dp[j] + 1, dp[i])
    }
    max = Math.max(dp[i], max)
  }
  return max
}
/**
 * 354. 俄罗斯套娃信封问题
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  envelopes.sort((a, b) => a[1] - b[1])
  const len = envelopes.length
  if (!len) return 0
  const dp = new Array(len)
  dp.fill(1)
  let max = 1
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (
        envelopes[i][0] > envelopes[j][0] &&
        envelopes[i][1] !== envelopes[j][1]
      ) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    max = Math.max(max, dp[i])
  }
  return max
}
/**
 * 877. 石子游戏
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
  const len = piles.length
  const dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len)
    for (let j = 0; j < len; j++) {
      dp[i][j] = [0, 0]
      dp[i][i] = [piles[i], 0]
    }
  }
  for (let l = 1; l < len; l++) {
    for (let i = 0; i < len - l; i++) {
      let j = i + l
      const left = piles[i] + dp[i + 1][j][1]
      const right = piles[j] + dp[i][j - 1][1]
      if (left > right) {
        dp[i][j][0] = left
        dp[i][j][1] = dp[i + 1][j][0]
      } else {
        dp[i][j][0] = right
        dp[i][j][1] = dp[i][j - 1][0]
      }
    }
  }
  return dp[len - 1][len - 1][0] > dp[len - 1][len - 1][1]
}
/**
 * 446. 等差数列划分 II - 子序列
 * @param {number[]} A
 * @return {number}
 */
var numberOfArithmeticSlices = function (A) {
  let ans = 0
  const len = A.length,
    dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Map()
    for (let j = 0; j < i; j++) {
      const diff = A[i] - A[j]
      const sum = dp[j].get(diff) || 0
      ans += sum
      dp[i].set(diff, (dp[i].get(diff) || 0) + sum + 1)
    }
  }
  return ans
}
/**
 * 940. 不同的子序列 II
 * @param {string} S
 * @return {number}
 */
var distinctSubseqII = function (S) {
  const len = S.length,
    mod = 1000000007
  const dp = new Array(len + 1)
  dp[0] = 1
  for (let i = 0; i < len; i++) {
    dp[i + 1] = 2 * dp[i]
    let j = i - 1
    while (j >= 0 && S[j] !== S[i]) j--
    if (j >= 0) dp[i + 1] -= dp[j]
    dp[i + 1] %= mod
  }
  if (dp[len] < 0) dp[len] += mod
  return dp[len] - 1
}
/**
 * 1425. 带限制的子序列和
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var constrainedSubsetSum = function (nums, k) {
  const dequeue = [],
    len = nums.length,
    dp = new Array(len)
  let ans = Number.MIN_SAFE_INTEGER
  for (let i = 0; i < len; i++) {
    const pre_max = dequeue.length ? dp[dequeue[0]] : 0
    dp[i] = Math.max(pre_max + nums[i], nums[i])
    ans = Math.max(ans, dp[i])
    while (dequeue.length && dp[dequeue[dequeue.length - 1]] < dp[i])
      dequeue.pop()
    dequeue.push(i)
    if (dequeue.length > 1 && dequeue[dequeue.length - 1] - dequeue[0] >= k)
      dequeue.shift()
  }
  return ans
}

/**
 * 123. 买卖股票的最佳时机 III
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // function dfs(i,k){
  //     if(i < 0 || k === 0) return [0,Number.MIN_SAFE_INTEGER]
  //     const status_0 = Math.max(dfs(i-1,k)[0],dfs(i-1,k)[1]+prices[i])
  //     const status_1 = Math.max(dfs(i-1,k)[1],dfs(i-1,k-1)[0]-prices[i])
  //     return [status_0,status_1]
  // }
  // return dfs(prices.length-1,2)[0]
  const len = prices.length,
    dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(3)
    dp[i][0] = [0, Number.MIN_SAFE_INTEGER]
  }
  dp[-1] = new Array(3)
  dp[-1].fill([0, Number.MIN_SAFE_INTEGER])
  for (let i = 0; i < len; i++) {
    for (let j = 1; j < 3; j++) {
      const status_0 = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
      const status_1 = Math.max(
        dp[i - 1][j][1],
        dp[i - 1][j - 1][0] - prices[i]
      )
      dp[i][j] = [status_0, status_1]
    }
  }
  return dp[len - 1][2][0]
}
/**
 * 546. 移除盒子
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function (boxes) {
  const len = boxes.length
  const dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len)
    for (let j = 0; j < len; j++) {
      dp[i][j] = new Array(len)
      dp[i][j].fill(0)
    }
  }
  function dfs(l, r, k) {
    if (l > r) return 0
    if (dp[l][r][k]) return dp[l][r][k]
    while (l < r && boxes[r] === boxes[r - 1]) {
      k++
      r--
    }
    dp[l][r][k] = dfs(l, r - 1, 0) + (k + 1) * (k + 1)
    for (let i = l; i < r; i++) {
      if (boxes[i] === boxes[r]) {
        dp[l][r][k] = Math.max(
          dp[l][r][k],
          dfs(l, i, k + 1) + dfs(i + 1, r - 1, 0)
        )
      }
    }
    return dp[l][r][k]
  }
  return dfs(0, len - 1, 0)
}
/**
 * 312. 戳气球
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  const len = nums.length
  nums.push(1)
  nums.unshift(1)
  const dp = new Array(len + 2)
  for (let i = 0; i < len + 2; i++) {
    dp[i] = new Array(len + 2)
    dp[i].fill(0)
  }
  function dfs(l, r) {
    if (r - l === 1) return 0
    if (dp[l][r]) return dp[l][r]
    for (let i = l + 1; i < r; i++) {
      dp[l][r] = Math.max(
        dp[l][r],
        nums[i] * nums[l] * nums[r] + dfs(l, i) + dfs(i, r)
      )
    }
    return dp[l][r]
  }
  return dfs(0, len + 1)
}
/**
 * 87. 扰乱字符串
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function (s1, s2) {
  if (s1.length !== s2.length) return false
  const len = s1.length
  const dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len)
    for (let j = 0; j < len; j++) {
      dp[i][j] = new Array(len)
      dp[i][j].fill(-1)
    }
  }
  function dfs(i1, j1, i2) {
    if (dp[i1][j1][i2] !== -1) return dp[i1][j1][i2]
    if (s1.slice(i1, j1 + 1) === s2.slice(i2, i2 + (j1 - i1) + 1))
      dp[i1][j1][i2] = true
    for (let i = i1; i < j1; i++) {
      if (
        (dfs(i1, i, i2) && dfs(i + 1, j1, i2 + (i - i1) + 1)) ||
        (dfs(i1, i, i2 + j1 - i) && dfs(i + 1, j1, i2))
      ) {
        dp[i1][j1][i2] = true
        break
      }
    }
    if (dp[i1][j1][i2] === -1) dp[i1][j1][i2] = false
    return dp[i1][j1][i2]
  }
  return dfs(0, len - 1, 0)
}
/**
 * 1092. 最短公共超序列
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function (str1, str2) {
  const len1 = str1.length,
    len2 = str2.length
  const dp = new Array(len1 + 1)
  for (let i = 0; i <= len1; i++) {
    dp[i] = new Array(len2 + 1)
    dp[i].fill(-1)
  }
  function dfs(i, j) {
    if (i === len1 || j === len2) return ''
    if (dp[i][j] !== -1) return dp[i][j]
    if (str1[i] === str2[j]) {
      if (dp[i + 1][j + 1] === -1) dp[i + 1][j + 1] = dfs(i + 1, j + 1)
      return str1[i] + dp[i + 1][j + 1]
    } else {
      if (dp[i + 1][j] === -1) dp[i + 1][j] = dfs(i + 1, j)
      if (dp[i][j + 1] === -1) dp[i][j + 1] = dfs(i, j + 1)
      return dp[i + 1][j].length > dp[i][j + 1].length
        ? dp[i + 1][j]
        : dp[i][j + 1]
    }
  }
  let ans = ''
  const lcs = dfs(0, 0)
  let i = 0,
    j = 0
  for (let k = 0, len = lcs.length; k < len; k++) {
    while (i < len1 && str1[i] !== lcs[k]) ans += str1[i++]
    while (j < len2 && str2[j] !== lcs[k]) ans += str2[j++]
    ans += lcs[k]
    i++
    j++
  }
  return ans + str1.slice(i) + str2.slice(j)
}
