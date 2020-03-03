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
