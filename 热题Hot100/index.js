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
/**
 * 448. 找到所有数组中消失的数字（抽屉原理）
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
  for (let i = 0, len = nums.length; i < len; i++) {
    let cur = nums[i]
    while (cur !== i + 1 && nums[cur - 1] !== cur) {
      ;[nums[cur - 1], nums[i]] = [nums[i], nums[cur - 1]]
      cur = nums[i]
    }
  }
  let res = []
  for (let i = 0, len = nums.length; i < len; i++) {
    if (i + 1 !== nums[i]) res.push(i + 1)
  }
  return res
}
/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置（二分法）
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      let start = mid,
        end = mid
      while (nums[start] === nums[start - 1]) start--
      while (nums[end] === nums[end + 1]) end++
      return [start, end]
    }
    if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return [-1, -1]
}
/**
 * 22. 括号生成（回溯法）
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  if (n === 0) return ['']
  let res = []
  function backtrack(str, left, right) {
    if (str.length === n * 2) {
      let stack = []
      for (let i = 0, len = str.length; i < len; i++) {
        if (stack[stack.length - 1] === '(' && str[i] === ')') {
          stack.pop()
        } else {
          stack.push(str[i])
        }
      }
      if (stack.length === 0) {
        res.push(str)
      }
      return
    }
    if (left === 0) {
      backtrack(str + ')', 0, right - 1)
    } else if (right === 0) {
      backtrack(str + '(', left - 1, 0)
    } else {
      backtrack(str + '(', left - 1, right)
      backtrack(str + ')', left, right - 1)
    }
  }
  backtrack('(', n - 1, n)
  return res
}
/**
 * 49. 字母异位词分组
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  let hash = {},
    res = [],
    count = 0
  for (let i = 0, len = strs.length; i < len; i++) {
    let cur = strs[i],
      temp = []
    for (let j = 0, len = cur.length; j < len; j++) {
      temp.push(+cur[j].charCodeAt())
    }
    temp.sort((a, b) => a - b)
    let key = temp.join('')
    if (hash.hasOwnProperty(key)) {
      res[hash[key]].push(cur)
    } else {
      hash[key] = count
      res[count] = [cur]
      count++
    }
  }
  return res
}
/**
 * 208. 实现 Trie (前缀树)
 * Initialize your data structure here.
 */
var Trie = function() {
  this.root = {}
}

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  const insert = (node, word) => {
    if (!word) return
    let char = word[0]
    if (!node.hasOwnProperty(char)) node[char] = {}
    if (word.length === 1) node[char].isEnd = true
    insert(node[char], word.slice(1))
  }
  insert(this.root, word)
}

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  const search = (node, word) => {
    if (!word) return false
    let char = word[0]
    if (!node.hasOwnProperty(char)) return false
    if (word.length === 1 && node[char].isEnd) return true
    return search(node[char], word.slice(1))
  }
  return search(this.root, word)
}

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  const startsWith = (node, prefix) => {
    if (!prefix) return false
    let char = prefix[0]
    if (!node.hasOwnProperty(char)) return false
    if (prefix.length === 1) return true
    return startsWith(node[char], prefix.slice(1))
  }
  return startsWith(this.root, prefix)
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
/**
 * 226. 翻转二叉树
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  function reverse(node) {
    if (!node) return
    let temp = node.right
    node.right = node.left
    node.left = temp
    reverse(node.left)
    reverse(node.right)
  }
  reverse(root)
  return root
}
/**
 * 55. 跳跃游戏（暴力递归）
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  if (nums.length === 0) return true
  let len = nums.length
  function dp(i) {
    if (i === len - 1) return true
    if (nums[i] === 0) return false
    let res = false
    for (let j = 1; j <= nums[i]; j++) {
      res = res || dp(i + j)
    }
    return res
  }
  return dp(0)
}
/**
 * 55. 跳跃游戏（动态规划）
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  let len = nums.length,
    dp = new Array(len)
  dp.fill(false)
  dp[len - 1] = true
  for (let i = len - 2; i >= 0; i--) {
    if (nums[i] > len - i) {
      dp[i] = true
      continue
    }
    for (let j = 1; j <= nums[i]; j++) {
      dp[i] = dp[i] || dp[i + j]
    }
  }
  return dp[0]
}
/**
 * 215. 数组中的第K个最大元素（小顶堆）
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  if (k > nums.length) return -1
  let heap = [null]
  function insert(val) {
    heap.push(val)
    let i = heap.length - 1,
      p = Math.floor(i / 2)
    while (i > 1 && heap[i] < heap[p]) {
      let temp = heap[i]
      heap[i] = heap[p]
      heap[p] = temp
      i = p
      p = Math.floor(i / 2)
    }
  }
  function replace(val) {
    heap.push(val)
    let temp = heap[1]
    heap[1] = heap[heap.length - 1]
    heap[heap.length - 1] = temp
    heap.pop()
    let i = 1,
      len = heap.length
    while (i * 2 <= len - 1) {
      let left = i * 2,
        right = i * 2 + 1
      if (heap[i] <= heap[left] && (right >= k || heap[i] <= heap[right]))
        return
      if (right >= k || heap[left] < heap[right]) {
        ;[heap[i], heap[left]] = [heap[left], heap[i]]
        i = left
      } else {
        ;[heap[i], heap[right]] = [heap[right], heap[i]]
        i = right
      }
    }
  }
  for (let i = 0, len = nums.length; i < len; i++) {
    if (heap.length <= k) {
      insert(nums[i])
    } else {
      if (heap[1] < nums[i]) replace(nums[i])
    }
  }
  return heap[1]
}
/**
 * 128. 最长连续序列（哈希表）
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  let hash = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    hash[nums[i]] = 1
  }
  let res = 0
  while (Object.keys(hash).length) {
    let keys = Object.keys(hash)
    let cur = keys[0],
      count = 1,
      left = +cur - 1 + '',
      right = +cur + 1 + ''
    delete hash[cur]
    while (hash.hasOwnProperty(left)) {
      delete hash[left]
      count++
      left--
    }
    while (hash.hasOwnProperty(right)) {
      delete hash[right]
      count++
      right++
    }
    res = Math.max(res, count)
  }
  return res
}
/**
 * 84. 柱状图中最大的矩形（暴力递归）
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  function dp(i, j) {
    if (i > j) return 0
    if (i === j) return heights[i]
    return Math.max(
      (j - i + 1) * Math.min(...heights.slice(i, j + 1)),
      dp(i + 1, j),
      dp(i, j - 1)
    )
  }
  return dp(0, heights.length - 1)
}
/**
 * 84. 柱状图中最大的矩形（动态规划）
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  if (heights.length === 0) return 0
  let len = heights.length,
    dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len)
    dp[i][i] = heights[i]
  }
  for (let l = 1; l < len; l++) {
    for (let i = 0; i < len - 1; i++) {
      let j = l + i,
        temp = (j - i + 1) * Math.min(...heights.slice(i, j + 1))
      dp[i][j] = Math.max(temp, dp[i + 1][j], dp[i][j - 1])
    }
  }
  return dp[0][len - 1]
}
/**
 * 300. 最长上升子序列（暴力递归）
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  function dp(i, j) {
    if (i === j) return 1
    if (i > j) return 0
    let res = 1
    if (nums[j] > nums[i]) res = 2
    let left = nums[i] > nums[i + 1] ? 0 : 1,
      right = nums[j] > nums[j - 1] ? 1 : 0
    res = Math.max(res, left + dp(i + 1, j), right + dp(i, j - 1))
    return res
  }
  return dp(0, nums.length - 1)
}
/**
 * 5. 最长回文子串（暴力递归）
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  function dp(i, j) {
    if (i === j) return s[i]
    if (j < i) return ''
    let cur = s.slice(i, j + 1),
      temp = cur
        .split('')
        .reverse()
        .join('')
    if (cur === temp) return cur
    let l = dp(i + 1, j),
      r = dp(i, j - 1)
    return l.length > r.length ? l : r
  }
  return dp(0, s.length - 1)
}
/**
 * 5. 最长回文子串（动态规划）
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (s.length === 0) return ''
  let len = s.length,
    dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len)
    dp[i][i] = s[i]
  }
  for (let l = 1; l < len; l++) {
    for (let i = 0; i < len - l; i++) {
      let j = l + i
      let cur = s.slice(i, j + 1),
        temp = cur
          .split('')
          .reverse()
          .join('')
      if (cur === temp) {
        dp[i][j] = cur
      } else {
        dp[i][j] =
          dp[i + 1][j].length > dp[i][j - 1].length
            ? dp[i + 1][j]
            : dp[i][j - 1]
      }
    }
  }
  return dp[0][len - 1]
}
/**
 * 3. 无重复字符的最长子串（滑动窗口）
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let hash = {},
    left = 0,
    right = 0,
    len = s.length,
    res = 0
  while (right < len) {
    let char = s[right]
    if (!hash.hasOwnProperty(char)) {
      res = Math.max(res, right - left + 1)
      hash[char] = 1
    } else {
      while (hash.hasOwnProperty(char)) {
        delete hash[s[left]]
        left++
      }
      res = Math.max(res, right - left + 1)
      hash[char] = 1
    }
    right++
  }
  return res
}
/**
 * 32. 最长有效括号（暴力递归）
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  function dp(i, j) {
    if (i === j) return 0
    if (i > j) return 0
    let temp = s.slice(i, j + 1),
      stack = []
    for (let i = 0, len = temp.length; i < len; i++) {
      let cur = temp[i]
      if (stack[stack.length - 1] === '(' && cur === ')') {
        stack.pop()
      } else {
        stack.push(cur)
      }
    }
    if (stack.length === 0) return j - i + 1
    return Math.max(dp(i + 1, j), dp(i, j - 1))
  }
  return dp(0, s.length - 1)
}
/**
 * 236. 二叉树的最近公共祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (!root) return null
  if (p === q) return p
  if (root === q || root === p) return root
  let l = lowestCommonAncestor(root.left, p, q),
    r = lowestCommonAncestor(root.right, p, q)
  if (l && r) return root
  return l ? l : r
}
/**
 * 169. 多数元素（摩尔投票）
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let count = 0,
    res
  for (let i = 0, len = nums.length; i < len; i++) {
    if (count === 0) {
      res = nums[i]
      count++
    } else {
      count += res === nums[i] ? 1 : -1
    }
  }
  return res
}
/**
 * 104. 二叉树的最大深度
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  function dfs(node) {
    if (!node) return 0
    return 1 + Math.max(dfs(node.left), dfs(node.right))
  }
  return dfs(root)
}
/**
 * 139. 单词拆分（暴力递归）
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  let len = s.length
  function dp(i, j) {
    let str = s.slice(i, j + 1),
      res = false
    if (!str) return true
    if (j > len - 1) return false
    if (wordDict.indexOf(str) !== -1) res = res || dp(j + 1, j + 1)
    res = res || dp(i, j + 1)
    return res
  }
  return dp(0, 0)
}
/**
 * 62. 不同路径（暴力递归）
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  function dp(i, j) {
    if (i >= m || j >= n) return 0
    if (i === m - 1 && j === n - 1) return 1
    return dp(i + 1, j) + dp(i, j + 1)
  }
  return dp(0, 0)
}
/**
 * 42. 接雨水（双指针）
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let left = 0,
    right = height.length - 1,
    res = 0
  let l = height[left],
    r = height[right]
  while (left < right - 1) {
    if (l <= r) {
      let temp = height[left + 1]
      res += temp < l ? l - temp : 0
      l = Math.max(l, temp)
      left++
    } else {
      let temp = height[right - 1]
      res += temp < r ? r - temp : 0
      r = Math.max(r, temp)
      right--
    }
  }
  return res
}
/**
 * 494. 目标和（暴力递归）
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function(nums, S) {
  let len = nums.length
  function dp(count, i) {
    if (i === len) return count === S ? 1 : 0
    return dp(count + nums[i], i + 1) + dp(count - nums[i], i + 1)
  }
  return dp(0, 0)
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
 * 78. 子集（回溯法）
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let res = []
  function backtrack(has, rest) {
    res.push(has)
    for (let i = 0, len = rest.length; i < len; i++) {
      backtrack([...has, rest[i]], rest.slice(i + 1))
    }
  }
  backtrack([], nums)
  return res
}
/**
 * 78. 子集（回溯法优化）
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let res = [],
    len = nums.length
  function backtrack(has, start) {
    res.push(has)
    for (let i = start; i < len; i++) {
      backtrack([...has, nums[i]], i + 1)
    }
  }
  backtrack([], 0)
  return res
}
/**
 * 560. 和为K的子数组（暴力循环）
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let res = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    let count = nums[i]
    if (count === k) res++
    for (let j = i + 1; j < len; j++) {
      count += nums[j]
      if (count === k) res++
    }
  }
  return res
}
/**
 * 53. 最大子序和（暴力递归）
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let sum = 0
  for (let i = 0, len = nums.length; i < len; i++) sum += nums[i]
  function dp(i, j, sum) {
    if (i === j) return sum
    return Math.max(
      sum,
      dp(i + 1, j, sum - nums[i]),
      dp(i, j - 1, sum - nums[j])
    )
  }
  return dp(0, nums.length - 1, sum)
}
/**
 * 53. 最大子序和（动态规划）
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  if (nums.length === 0) return 0
  let len = nums.length,
    res = Number.MIN_SAFE_INTEGER,
    prev = 0
  for (let i = 0; i < len; i++) {
    prev = Math.max(prev + nums[i], nums[i])
    res = Math.max(res, prev)
  }
  return res
}
/**
 * 416. Partition Equal Subset Sum（dynamic planning）
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  let sum = 0,
    len = nums.length
  for (let i = 0; i < len; i++) sum += nums[i]
  if (sum % 2 !== 0) return false
  let half = sum / 2,
    dp = new Array(half + 1)
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
 * 31. 下一个排列
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var maxProduct = function(nums) {
  let len = nums.length,
    dp = new Array(len),
    res = Number.MIN_SAFE_INTEGER
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len)
    dp[i][i] = nums[i]
    res = Math.max(res, dp[i][i])
  }
  for (let l = 1; l < len; l++) {
    for (let i = 0; i < len - l; i++) {
      let j = l + i
      dp[i][j] = nums[j] * dp[i][j - 1]
      res = Math.max(res, dp[i][j])
    }
  }
}
/**
 * 152. 乘积最大子序列（动态规划）
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  let res = Number.MIN_SAFE_INTEGER,
    max = 1,
    min = 1
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] < 0) {
      let temp = max
      max = min
      min = temp
    }
    max = Math.max(nums[i], max * nums[i])
    min = Math.min(nums[i], min * nums[i])
    res = Math.max(res, max)
  }
  return res
}
/**
 * 617. 合并二叉树
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
  if (!t1 || !t2) return t1 ? t1 : t2
  t1.val = t1.val + t2.val
  t1.left = mergeTrees(t1.left, t2.left)
  t1.right = mergeTrees(t1.right, t2.right)
  return t1
}
/**
 * 96. 不同的二叉搜索树（动态规划）
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  let dp = new Array(n + 1)
  dp.fill(0)
  dp[0] = 1
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1]
    }
  }
  return dp[n]
}
/**
 * 283. 移动零（双指针）
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let p1 = 0,
    len = nums.length
  while (nums[p1] !== 0 && p1 < len) p1++
  let p2 = p1 + 1
  while (p2 < len) {
    if (nums[p2] !== 0) {
      ;[nums[p1], nums[p2]] = [nums[p2], nums[p1]]
      p1++
    }
    p2++
  }
}
/**
 * 234. 回文链表
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  let arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  for (let i = 0, len = arr.length; i < Math.floor(len / 2); i++) {
    if (arr[i] !== arr[len - 1 - i]) return false
  }
  return true
}
/**
 * 647. 回文子串（滑动窗口）
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  let l = 0,
    r = 0,
    len = s.length,
    res = 0
  while (r < len) {
    let cur = s.slice(l, r + 1)
    if (
      cur
        .split('')
        .reverse()
        .join('') === cur
    )
      res++
    let count = l
    while (count < r) {
      count++
      let cur = s.slice(count, r + 1)
      if (
        cur
          .split('')
          .reverse()
          .join('') === cur
      )
        res++
    }
    r++
  }
  return res
}
/**
 * 647. 回文子串（中心法则）
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  let len = s.length,
    res = 0
  for (let i = 0, c = 2 * len - 1; i < c; i++) {
    let l = Math.floor(i / 2),
      r = l + (i % 2)
    while (l >= 0 && l < len && s[l] === s[r]) {
      l--
      r++
      res++
    }
  }
  return res
}
/**
 * 238. 除自身以外数组的乘积
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let res = [],
    len = nums.length
  let lMul = new Array(len),
    rMul = new Array(len)
  ;(lMul[0] = 1), (rMul[len - 1] = 1)
  for (let i = 1; i < len; i++) {
    lMul[i] = lMul[i - 1] * nums[i - 1]
  }
  res[len - 1] = lMul[len - 1] * rMul[len - 1]
  for (let j = len - 2; j >= 0; j--) {
    rMul[j] = rMul[j + 1] * nums[j + 1]
    res[j] = rMul[j] * lMul[j]
  }
  return res
}
/**
 * 416. 分割等和子集（动态规划）
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  let sum = 0,
    len = nums.length
  for (let i = 0; i < len; i++) sum += nums[i]
  if (sum % 2 !== 0) return false
  let half = sum / 2,
    dp = new Array(half + 1)
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
 * 279. 完全平方数（动态规划）
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  let squares = []
  function isSquares(num) {
    for (let i = 1; i <= num; i++) {
      if (i * i === num) {
        squares.push(num)
        return
      } else if (i * i > num) return
    }
  }
  for (let i = 1; i <= n; i++) {
    isSquares(i)
  }
  let dp = new Array(n + 1)
  dp.fill(-1)
  dp[0] = 0
  for (let i = 1; i <= n; i++) {
    for (let j = 0, len = squares.length; j < len; j++) {
      if (i - squares[j] >= 0) {
        if (dp[i - squares[j]] !== -1) {
          dp[i] =
            dp[i] === -1
              ? 1 + dp[i - squares[j]]
              : Math.min(dp[i], 1 + dp[i - squares[j]])
        }
      }
    }
  }
  return dp[n]
}
/**
 * 279. 完全平方数（动态规划）
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  let dp = new Array(n + 1)
  dp.fill(-1)
  dp[0] = 0
  for (let i = 1; i <= n; i++) {
    let j = 1
    while (i >= j * j) {
      dp[i] =
        dp[i] === -1 ? 1 + dp[i - j * j] : Math.min(dp[i], 1 + dp[i - j * j])
      j++
    }
  }
  return dp[n]
}
/**
 * 10. 正则表达式匹配（暴力递归）
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
        if (p[j] !== '*') {
          return false
        }
        j -= 2
      }
      return true
    }
    let charS = s[i],
      charP = p[j]
    if (charP === '.' || charS === charP) {
      return dp(i - 1, j - 1)
    } else if (charP === '*') {
      if (p[j - 1] === charS || p[j - 1] === '.')
        return dp(i - 1, j) || dp(i - 1, j - 2) || dp(i, j - 2)
      return dp(i, j - 2)
    } else {
      return false
    }
  }
  return dp(s.length - 1, p.length - 1)
}
/**
 * 301. 删除无效的括号（暴力递归）
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
  let all = [],
    max = 0
  function dp(brackets) {
    let stack = []
    for (let i = 0, len = brackets.length; i < len; i++) {
      if (brackets[i] === '(' || brackets[i] === ')') {
        if (brackets[i] === ')' && stack[stack.length - 1] === '(') {
          stack.pop()
        } else {
          stack.push(brackets[i])
        }
      }
    }
    if (stack.length === 0) {
      if (all.indexOf(brackets) === -1) {
        all.push(brackets)
        max = Math.max(max, brackets.length)
      }
    }
    for (let i = 0, len = brackets.length; i < len; i++) {
      dp(brackets.slice(0, i) + brackets.slice(i + 1))
    }
  }
  dp(s)
  let res = []
  for (let i = 0, len = all.length; i < len; i++) {
    if (all[i].length === max) res.push(all[i])
  }
  return res
}
/**
 * 301. 删除无效的括号（bfs）
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
  let queue = [s]
  while (queue.length) {
    let res = queue.filter(isValid)
    if (res.length > 0) return [...new Set(res)]
    let temp = []
    for (let i = 0, len1 = queue.length; i < len1; i++) {
      for (let j = 0, len2 = queue[i].length; j < len2; j++) {
        if (queue[i][j] === '(' || queue[i][j] === ')')
          temp.push(queue[i].slice(0, j) + queue[i].slice(j + 1))
      }
    }
    queue = temp
  }
  function isValid(brackets) {
    let count = 0,
      len = brackets.length
    for (let i = 0; i < len; i++) {
      if (brackets[i] === '(') {
        count++
      } else if (brackets[i] === ')') {
        count--
      }
      if (count < 0) return false
    }
    return count === 0
  }
}
/**
 * 136. 只出现一次的数字（异或）
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let a = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    a ^= nums[i]
  }
  return a
}
/**
 * 1356. 根据数字二进制下 1 的数目排序（位运算）
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function(arr) {
  function compare(n1, n2) {
    let count1 = 0,
      count2 = 0,
      temp = n1 - n2
    for (let i = 32; i > 0; i--) {
      if ((n1 & 1) === 1) count1++
      if ((n2 & 1) === 1) count2++
      n1 >>= 1
      n2 >>= 1
    }
    return count1 - count2 || temp
  }
  arr.sort(compare)
  return arr
}
/**
 * 762. 二进制表示中质数个计算置位（位运算）
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var countPrimeSetBits = function(L, R) {
  const prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
  let res = 0
  function countOne(n) {
    let count = 0
    for (let i = 32; i > 0; i--) {
      if ((n & 1) === 1) count++
      n >>= 1
    }
    return count
  }
  for (let i = L; i <= R; i++) {
    if (prime.indexOf(countOne(i)) !== -1) res++
  }
  return res
}
/**
 * 268. 缺失数字（异或）
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  let ans = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    ans ^= nums[i]
    ans ^= i
  }
  ans ^= nums.length
  return ans
}
/**
 * 98. 验证二叉搜索树（中序遍历）
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  let temp = Number.MIN_SAFE_INTEGER,
    res = true
  function mfs(node) {
    if (!node) return
    mfs(node.left)
    if (node.val > temp) {
      temp = node.val
    } else {
      res = false
      return
    }
    mfs(node.right)
  }
  mfs(root)
  return res
}
/**
 * 62. 不同路径（动态规划）
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  let dp = new Array(m + 1)
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1)
    dp[i][n] = 0
  }
  dp[m].fill(0)
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i === m - 1 && j === n - 1) {
        dp[i][j] = 1
      } else {
        dp[i][j] = dp[i + 1][j] + dp[i][j + 1]
      }
    }
  }
  return dp[0][0]
}
/**
 * 75. 颜色分类（双指针）
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  let l = 0,
    len = nums.length,
    r = len - 1
  for (let i = 0; i <= r; i++) {
    if (nums[i] === 2) {
      ;[nums[i], nums[r]] = [nums[r], nums[i]]
      r--
      i--
    } else if (nums[i] === 0) {
      ;[nums[i], nums[l]] = [nums[l], nums[i]]
      l++
    }
  }
}
/**
 * 297. 二叉树的序列化与反序列化
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
  const nodes = [],
    queue = [root]
  while (queue.length) {
    let cur = queue.shift()
    if (cur) {
      nodes.push(cur.val)
      queue.push(cur.left, cur.right)
    } else {
      nodes.push(null)
    }
  }
  while (nodes.length && nodes[nodes.length - 1] === null) nodes.pop()
  let res = '['
  for (let i = 0, len = nodes.length; i < len; i++) {
    res += nodes[i] + ','
  }
  res = res.slice(0, res.length - 1)
  return res + ']'
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  data = data.slice(1, data.length - 1)
  if (!data) return null
  data = data.split(',')
  let i = 1,
    len = data.length,
    root = new TreeNode(data[0]),
    queue = [root]
  while (i < len && queue.length) {
    let left = i < len ? data[i++] : 'null'
    let right = i < len ? data[i++] : 'null'
    let node = queue.shift()
    if (left !== 'null') {
      node.left = new TreeNode(left)
      queue.push(node.left)
    }
    if (right !== 'null') {
      node.right = new TreeNode(right)
      queue.push(node.right)
    }
  }
  return root
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
/**
 * 19. 删除链表的倒数第N个节点
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode(null)
  dummy.next = head
  let len = 0
  while (head) {
    len++
    head = head.next
  }
  let count = len - n,
    p = dummy
  while (count > 0) {
    count--
    p = p.next
  }
  p.next = p.next.next
  return dummy.next
}
/**
 * 19. 删除链表的倒数第N个节点（遍历一遍）
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode(null)
  dummy.next = head
  let p = dummy
  while (n > 0) {
    n--
    head = head.next
  }
  while (head) {
    head = head.next
    p = p.next
  }
  p.next = p.next.next
  return dummy.next
}
/**
 * 32. 最长有效括号（暴力循环）
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  let res = 0
  for (let i = 0, len = s.length; i < len; i++) {
    let count = s[i] === '(' ? 1 : -1
    for (let j = i + 1; j < len; j++) {
      if (count < 0) break
      if (s[j] === '(') {
        count++
      } else {
        count--
      }
      if (count === 0) res = Math.max(res, j - i + 1)
    }
  }
  return res
}
/**
 * 84. 柱状图中最大的矩形（暴力循环）
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
  let res = 0
  for (let i = 0, len = heights.length; i < len; i++) {
    let min = heights[i]
    res = Math.max(res, min)
    for (let j = i + 1; j < len; j++) {
      min = Math.min(min, heights[j])
      res = Math.max(res, (j - i + 1) * min)
    }
  }
  return res
}
/**
 * 461. 汉明距离（位运算）
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
  let z = x ^ y,
    res = 0
  for (let i = 32; i > 0; i--) {
    if ((z & 1) === 1) res++
    z >>= 1
  }
  return res
}
/**
 * 105. 从前序与中序遍历序列构造二叉树
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (preorder.length === 0) return null
  let cur = preorder[0],
    index = inorder.indexOf(cur)
  let tree = new TreeNode(cur)
  let preLeft = preorder.slice(1, index + 1),
    preRight = preorder.slice(index + 1)
  let inLeft = inorder.slice(0, index),
    inRight = inorder.slice(index + 1)
  tree.left = buildTree(preLeft, inLeft)
  tree.right = buildTree(preRight, inRight)
  return tree
}
/**
 * 739. 每日温度（单调栈）
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  let stack = [],
    res = []
  for (let i = 0, len = T.length; i < len; i++) {
    while (stack.length !== 0 && T[stack[stack.length - 1]] < T[i]) {
      let cur = stack.pop()
      res[cur] = i - cur
    }
    stack.push(i)
  }
  for (let i = 0, len = stack.length; i < len; i++) res[stack[i]] = 0
  return res
}
/**
 * 1019. 链表中的下一个更大节点（单调栈）
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function(head) {
  let stack = [],
    res = [],
    count = 0
  while (head) {
    while (stack.length > 0 && stack[stack.length - 1].val < head.val) {
      let temp = stack.pop()
      res[temp.key] = head.val
    }
    stack.push({ key: count, val: head.val })
    count++
    head = head.next
  }
  for (let i = 0, len = stack.length; i < len; i++) res[stack[i].key] = 0
  return res
}
