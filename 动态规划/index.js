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
