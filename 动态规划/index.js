/**
 * 322. 零钱兑换（暴力递归超时）
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
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
var coinChange = function(coins, amount) {
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
var coinChange = function(coins, amount) {
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
var maxSubArray = function(nums) {
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
var maxSubArray = function(nums) {
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
var rob = function(nums) {
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
var climbStairs = function(n) {
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
var longestPalindrome = function(s) {
  let max = ''
  for (let i = 0, len = s.length; i < len; i++) {
    let temp = '',
      ans = ''
    for (let j = i; j < len; j++) {
      temp += s[j]
      if (
        temp ===
        temp
          .split('')
          .reverse()
          .join('')
      ) {
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
var lengthOfLIS = function(nums) {
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
var minPathSum = function(grid) {
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
var fib = function(N) {
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
var canPartition = function(nums) {
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
var lastStoneWeightII = function(stones) {
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
var findMaxForm = function(strs, m, n) {
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
var wordBreak = function(s, wordDict) {
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
var coinChange = function(coins, amount) {
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
var change = function(amount, coins) {
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
var rob = function(nums) {
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
var rob = function(nums) {
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
var climbStairs = function(n) {
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
var lengthOfLIS = function(nums) {
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
var minDistance = function(word1, word2) {
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
var minDistance = function(word1, word2) {
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
var longestCommonSubsequence = function(text1, text2) {
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
var longestCommonSubsequence = function(text1, text2) {
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
var longestPalindromeSubseq = function(s) {
  function dp(n, str) {
    if (n === -1)
      return str ===
        str
          .split('')
          .reverse()
          .join('')
        ? str.length
        : 0
    return Math.max(dp(n - 1, str + s[n]), dp(n - 1, str))
  }
  return dp(s.length - 1, '')
}
