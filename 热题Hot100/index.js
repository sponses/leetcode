/**
 * 15.三数之和（双指针）
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums.sort((a, b) => a - b)
  let res = []
  for (let i = 0, len = nums.length; i < len; i++) {
    let cur = nums[i]
    let left = i + 1,
      right = len - 1
    while (left < right) {
      if (cur + nums[left] + nums[right] === 0) {
        res.push([cur, nums[left], nums[right]])
        while (
          nums[left + 1] === nums[left] &&
          nums[right - 1] === nums[right]
        ) {
          left++
          right--
        }
        left++
        right--
      } else if (cur + nums[left] + nums[right] > 0) {
        right--
      } else {
        left++
      }
    }
    while (nums[i] === nums[i + 1]) i++
  }
  return res
}
/**
 * 2. 两数相加（链表）
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let num1 = '',
    num2 = ''
  while (l1) {
    num1 = l1.val + num1
    l1 = l1.next
  }
  while (l2) {
    num2 = l2.val + num2
    l2 = l2.next
  }
  let l = new ListNode(null),
    dummy = new ListNode(null)
  dummy.next = l
  let index1 = num1.length - 1,
    index2 = num2.length - 1,
    surplus = 0
  while (index1 >= 0 || index2 >= 0 || surplus) {
    let n1 = 0,
      n2 = 0
    if (index1 >= 0) {
      n1 = +num1[index1]
      index1--
    }
    if (index2 >= 0) {
      n2 = +num2[index2]
      index2--
    }
    let num = n1 + n2 + surplus
    if (num >= 10) {
      num = num % 10
      surplus = 1
    } else {
      surplus = 0
    }
    l.val = num
    if (index1 >= 0 || index2 >= 0 || surplus) {
      l.next = new ListNode(null)
      l = l.next
    }
  }
  return dummy.next
}
/**
 * 121. 买卖股票的最佳时机
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let min = Number.MAX_SAFE_INTEGER,
    profit = 0
  for (let i = 0, len = prices.length; i < len; i++) {
    min = Math.min(min, prices[i])
    profit = Math.max(prices[i] - min, profit)
  }
  return profit
}
/**
 * 94. 二叉树的中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  let res = []
  function mfs(node) {
    if (!node) return null
    mfs(node.left)
    res.push(node.val)
    mfs(node.right)
  }
  mfs(root)
  return res
}
/**
 * 102. 二叉树的层次遍历（dfs）
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  let res = []
  function dfs(node, i) {
    if (!node) return
    if (!Array.isArray(res[i])) res[i] = []
    res[i].push(node.val)
    dfs(node.left, i + 1)
    dfs(node.right, i + 1)
  }
  dfs(root, 0)
  return res
}
/**
 * 312. 戳气球（暴力递归）
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function(nums) {
  function dp(arr) {
    if (arr.length === 0) return 0
    if (arr.length === 1) return arr[0]
    let res = 0
    for (let i = 0, len = arr.length; i < len; i++) {
      let left = i === 0 ? 1 : arr[i - 1],
        right = i === arr.length - 1 ? 1 : arr[i + 1]
      res = Math.max(
        res,
        left * arr[i] * right + dp(arr.filter(x => x !== arr[i]))
      )
    }
    return res
  }
  return dp(nums)
}
/**
 * 70. 爬楼梯（暴力递归）
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  function dp(n) {
    if (n === 0) return 1
    if (n === 1) return 1
    if (n === 2) return 2
    return dp(n - 1) + dp(n - 2)
  }
  return dp(n)
}
/**
 * 70. 爬楼梯（动态规划）
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  let a = 1,
    b = 1
  for (let i = 2; i <= n; i++) {
    let temp = b
    b = a + b
    a = temp
  }
  return b
}
/**
 * 322. 零钱兑换（暴力递归）
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  function dp(n) {
    if (n < 0) return -1
    if (n === 0) return 0
    let res = Number.MAX_SAFE_INTEGER,
      count = 0
    for (let i = 0, len = coins.length; i < len; i++) {
      if (n - coins[i] >= 0) {
        count++
        res = Math.min(res, 1 + dp(n - coins[i]))
      }
    }
    return count === 0 ? -1 : res
  }
  return dp(amount)
}
/**
 * 322. 零钱兑换（动态规划）
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let dp = new Array(amount + 1)
  dp.fill(-1)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    let res = Number.MAX_SAFE_INTEGER
    for (let j = 0, len = coins.length; j < len; j++) {
      if (coins[j] > i) continue
      if (dp[i - coins[j]] === -1) continue
      res = Math.min(res, 1 + dp[i - coins[j]])
    }
    if (res !== Number.MAX_SAFE_INTEGER) dp[i] = res
  }
  return dp[amount]
}
/**
 * 39. 组合总和（回溯法）
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  let res = [],
    len = candidates.length
  candidates.sort((a, b) => a - b)
  function backtrack(i, sum, arr) {
    if (i >= len || sum > target) return
    if (sum === target) {
      res.push(arr)
      return
    }
    for (let j = i; j < len; j++) {
      if (candidates[j] + sum > target) break
      backtrack(j, sum + candidates[j], [...arr, candidates[j]])
    }
  }
  backtrack(0, 0, [])
  return res
}
/**
 * 11. 盛最多水的容器（暴力递归）
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  function dp(i, j) {
    if (i > j) return 0
    if (i === j) return 0
    let temp = (j - i) * Math.min(height[i], height[j])
    return Math.max(temp, dp(i + 1, j), dp(i, j - 1))
  }
  return dp(0, height.length - 1)
}
/**
 * 11. 盛最多水的容器（双指针）
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let left = 0,
    right = height.length - 1
  let res = (right - left) * Math.min(height[left], height[right])
  while (left < right) {
    if (height[left] > height[right]) {
      right--
    } else {
      left++
    }
    res = Math.max(res, (right - left) * Math.min(height[left], height[right]))
  }
  return res
}
/**
 * 538. 把二叉搜索树转换为累加树（逆中序遍历）
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function(root) {
  let count = 0
  function dfs(node) {
    if (!node) return
    dfs(node.right)
    let temp = node.val
    node.val += count
    count += temp
    dfs(node.left)
  }
  dfs(root)
  return root
}
/**
 * 739. 每日温度
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  let res = []
  for (let i = 0, len = T.length; i < len; i++) {
    let j = i
    while (j < len - 1 && T[i] >= T[j]) j++
    if (T[i] < T[j]) {
      res.push(j - i)
    } else {
      res.push(0)
    }
  }
  return res
}
/**
 * 394. 字符串解码（栈）
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
  let stack = []
  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] !== ']') {
      stack.push(s[i])
    } else {
      let j = stack.length - 1,
        n = '',
        str = '',
        reg = /[0-9]/
      while (stack[j] !== '[') {
        str = stack.pop() + str
        j--
      }
      stack.pop()
      j--
      while (j >= 0 && reg.test(stack[j])) {
        n = stack.pop() + n
        j--
      }
      let temp = ''
      for (let i = 0; i < +n; i++) {
        temp += str
      }
      stack.push(...temp)
    }
  }
  return stack.join('')
}
/**
 * 543. 二叉树的直径（dfs）
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  let res = 1
  function dfs(node) {
    if (node == null) return 0
    let L = dfs(node.left)
    let R = dfs(node.right)
    res = Math.max(res, L + R + 1)
    return Math.max(L, R) + 1
  }
  dfs(root)
  return res - 1
}
/**
 * 72. 编辑距离（暴力递归）
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  function dp(i, j) {
    if (i < 0 && j < 0) return 0
    if (i < 0 || j < 0) return Math.abs(j - i)
    if (word1[i] === word2[j]) return dp(i - 1, j - 1)
    return 1 + Math.min(dp(i, j - 1), dp(i - 1, j), dp(i - 1, j - 1))
  }
  return dp(word1.length - 1, word2.length - 1)
}
/**
 * 438. 找到字符串中所有字母异位词（滑动窗口）
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  let hash = {},
    left = 0,
    right = 0,
    res = [],
    temp = {}
  for (let i = 0, len = p.length; i < len; i++) {
    if (hash.hasOwnProperty(p[i])) {
      hash[p[i]]++
    } else {
      hash[p[i]] = 1
    }
  }
  let count = Object.keys(hash).length
  while (right < s.length) {
    let char = s[right]
    if (temp.hasOwnProperty(char)) {
      temp[char]++
    } else {
      temp[char] = 1
    }
    if (hash[char] === temp[char]) count--
    if (count === 0) res.push(left)
    if (right - left + 1 === p.length) {
      let char = s[left]
      if (temp[char] === hash[char]) count++
      if (temp[char] === 1) {
        delete temp[char]
      } else {
        temp[char]--
      }
      left++
    }
    right++
  }
  return res
}
