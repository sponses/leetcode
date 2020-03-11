/**
 * 140. 单词拆分 II（暴力解）
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
  let res = [],
    len = s.length
  function dp(i, j, str) {
    if (j === len && i === len) {
      res.push(str)
      return
    }
    for (let n = j; n < len; n++) {
      let temp = s.slice(i, n + 1)
      if (wordDict.indexOf(temp) !== -1) {
        dp(n + 1, n + 1, str + (str === '' ? '' : ' ') + temp)
        dp(i, n + 1, str)
        return
      }
    }
  }
  dp(0, 0, '')
  return res
}
/**
 * 139. 单词拆分（动态规划）
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const len = s.length
  const dp = new Array(len + 1)
  dp.fill(false)
  dp[0] = true
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.indexOf(s.slice(j, i)) !== -1) dp[i] = true
    }
  }
  return dp[len]
}
/**
 * 44. 通配符匹配（暴力解）
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  function dp(i, j) {
    if (i < 0 && j < 0) return true
    if (j < 0) return false
    if (i < 0) {
      while (j >= 0) {
        if (p[j] !== '*') return false
        j--
      }
      return true
    }
    const charS = s[i],
      charP = p[j]
    if (charS === charP || charP === '?') {
      return dp(i - 1, j - 1)
    } else if (charP === '*') {
      let res = false
      for (let n = -1; n <= i; n++) {
        res = res || dp(n, j - 1)
      }
      return res
    } else {
      return false
    }
  }
  return dp(s.length - 1, p.length - 1)
}
/**
 * 98. 验证二叉搜索树（中序遍历）
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  let compare = Number.MIN_SAFE_INTEGER,
    res = true
  function mfs(node) {
    if (!node) return
    mfs(node.left)
    if (compare >= node.val) res = false
    compare = node.val
    mfs(node.right)
  }
  mfs(root)
  return res
}
/**
 * 20. 有效的括号（栈）
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const hash = { ')': '(', '}': '{', ']': '[' }
  let stack = []
  for (let i = 0, len = s.length; i < len; i++) {
    if (hash.hasOwnProperty(s[i]) && stack[stack.length - 1] === hash[s[i]]) {
      stack.pop()
    } else {
      stack.push(s[i])
    }
  }
  return stack.length === 0
}
/**
 * 125. 验证回文串
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let res = ''
  for (let i = 0, len = s.length; i < len; i++) {
    let cur = s[i]
    if (cur.charCodeAt() >= 65 && cur.charCodeAt() <= 90)
      res += cur.toLocaleLowerCase()
    if (cur.charCodeAt() >= 97 && cur.charCodeAt() <= 122) res += cur
    if (!isNaN(cur) && cur !== ' ') res += cur
  }
  for (
    let i = 0, len = Math.floor(res.length / 2), l = res.length;
    i < len;
    i++
  ) {
    if (res[i] !== res[l - i - 1]) return false
  }
  return true
}
/**
 * 242. 有效的字母异位词（hash表）
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  let hashS = {}
  for (let i = 0, len = s.length; i < len; i++) {
    if (!hashS.hasOwnProperty(s[i])) {
      hashS[s[i]] = 1
    } else {
      hashS[s[i]]++
    }
  }
  let count = 0,
    hashT = {}
  for (let i = 0, len = t.length; i < len; i++) {
    if (!hashT.hasOwnProperty(t[i])) {
      hashT[t[i]] = 1
    } else {
      hashT[t[i]]++
    }
    if (hashS[t[i]] === hashT[t[i]]) count++
  }
  return s.length === t.length && count === Object.keys(hashS).length
}
/**
 * 242. 有效的字母异位词（排序）
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  s = s
    .split('')
    .sort((a, b) => a.charCodeAt() - b.charCodeAt())
    .join('')
  t = t
    .split('')
    .sort((a, b) => a.charCodeAt() - b.charCodeAt())
    .join('')
  return s === t
}
/**
 * 1. 两数之和（hash表)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
  const hash = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (hash.hasOwnProperty(target - nums[i]))
      return [hash[target - nums[i]], i]
    hash[nums[i]] = i
  }
}
/**
 * 42. 接雨水（单调栈）
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let res = 0,
    stack = []
  for (let i = 0, len = height.length; i < len; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      let h = height[stack.pop()]
      if (stack.length !== 0) {
        let w = i - stack[stack.length - 1] - 1
        res += (Math.min(height[stack[stack.length - 1]], height[i]) - h) * w
      }
    }
    stack.push(i)
  }
  return res
}
/**
 * 84. 柱状图中最大的矩形（单调栈）
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  let stack = [],
    res = 0
  heights.push(0)
  heights.unshift(0)
  for (let i = 0, len = heights.length; i < len; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
      let temp = stack.pop()
      res = Math.max(res, (i - stack[stack.length - 1] - 1) * heights[temp])
    }
    stack.push(i)
  }
  return res
}
/**
 * 456. 132模式（单调栈）
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function(nums) {
  let sec = Number.MIN_SAFE_INTEGER
  const stack = []
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < sec) return true
    while (stack.length > 0 && nums[i] > stack[stack.length - 1]) {
      sec = stack.pop()
    }
    stack.push(nums[i])
  }
  return false
}
/**
 * 101. 对称二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root) return true
  function isSym(node1, node2) {
    if (!node1 && !node2) return true
    if (!node1 || !node2) return false
    if (node1.val !== node2.val) return false
    return isSym(node1.left, node2.right) && isSym(node1.right, node2.left)
  }
  return isSym(root.left, root.right)
}
/**
 * 130. 被围绕的区域（dfs）
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  if (!board || !board.length) return
  const h = board.length,
    w = board[0].length
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (
        (i === 0 || i === h - 1 || j === 0 || j === w - 1) &&
        board[i][j] === 'O'
      ) {
        dfs(i, j)
      }
    }
  }
  function dfs(i, j) {
    if (
      i < 0 ||
      i >= h ||
      j < 0 ||
      j >= w ||
      board[i][j] === 'X' ||
      board[i][j] === '#'
    )
      return
    board[i][j] = '#'
    dfs(i - 1, j)
    dfs(i + 1, j)
    dfs(i, j - 1)
    dfs(i, j + 1)
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (board[i][j] === 'O') board[i][j] = 'X'
      if (board[i][j] === '#') board[i][j] = 'O'
    }
  }
}
/**
 * 130. 被围绕的区域（非递归dfs）
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  if (!board || !board.length) return
  const h = board.length,
    w = board[0].length
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (
        (i === 0 || i === h - 1 || j === 0 || j === w - 1) &&
        board[i][j] === 'O'
      ) {
        dfs(i, j)
      }
    }
  }
  function dfs(i, j) {
    const stack = []
    stack.push({ i, j })
    board[i][j] = '#'
    while (stack.length) {
      let cur = stack[stack.length - 1]
      if (cur.i - 1 >= 0 && board[cur.i - 1][cur.j] === 'O') {
        board[cur.i - 1][cur.j] = '#'
        stack.push({ i: cur.i - 1, j: cur.j })
        continue
      }
      if (cur.i + 1 < h && board[cur.i + 1][cur.j] === 'O') {
        board[cur.i + 1][cur.j] = '#'
        stack.push({ i: cur.i + 1, j: cur.j })
        continue
      }
      if (cur.j - 1 >= 0 && board[cur.i][cur.j - 1] === 'O') {
        board[cur.i][cur.j - 1] = '#'
        stack.push({ i: cur.i, j: cur.j - 1 })
        continue
      }
      if (cur.j - 1 < w && board[cur.i][cur.j + 1] === 'O') {
        board[cur.i][cur.j + 1] = '#'
        stack.push({ i: cur.i, j: cur.j + 1 })
        continue
      }
      stack.pop()
    }
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (board[i][j] === 'O') board[i][j] = 'X'
      if (board[i][j] === '#') board[i][j] = 'O'
    }
  }
}
/**
 * 371. 两整数之和（位运算）
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
  while (b !== 0) {
    let temp = a ^ b
    b = (a & b) << 1
    a = temp
  }
  return a
}
