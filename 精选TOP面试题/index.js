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
/**
 * 79. 单词搜索（dfs）
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const len = word.length,
    h = board.length,
    w = board[0].length
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (board[i][j] === word[0]) {
        if (dfs(i, j, 1, [i + ',' + j])) return true
      }
    }
  }
  function dfs(i, j, k, used) {
    if (k === len) return true
    let res = false
    if (
      i - 1 >= 0 &&
      board[i - 1][j] === word[k] &&
      used.indexOf(i - 1 + ',' + j) === -1
    ) {
      res = res || dfs(i - 1, j, k + 1, used.concat([i - 1 + ',' + j]))
    }
    if (
      i + 1 < h &&
      board[i + 1][j] === word[k] &&
      used.indexOf(i + 1 + ',' + j) === -1
    ) {
      res = res || dfs(i + 1, j, k + 1, used.concat([i + 1 + ',' + j]))
    }
    if (
      j - 1 >= 0 &&
      board[i][j - 1] === word[k] &&
      used.indexOf(i + ',' + (j - 1)) === -1
    ) {
      res = res || dfs(i, j - 1, k + 1, used.concat([i + ',' + (j - 1)]))
    }
    if (
      j + 1 < w &&
      board[i][j + 1] === word[k] &&
      used.indexOf(i + ',' + (j + 1)) === -1
    ) {
      res = res || dfs(i, j + 1, k + 1, used.concat([i + ',' + (j + 1)]))
    }
    return res
  }
  return false
}
/**
 * 78. 子集（回溯法）
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const res = [],
    len = nums.length
  function backtrack(has, i) {
    res.push(has)
    for (let n = i; n < len; n++) {
      backtrack([...has, nums[n]], n + 1)
    }
  }
  backtrack([], 0)
  return res
}
/**
 * 8. 字符串转换整数 (atoi)
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
  let i = 0,
    len = str.length,
    res = ''
  while (str[i] === ' ') i++
  if (str[i] === '-' || str[i] === '+') res += str[i++]
  while (!Number.isNaN(+str[i]) && str[i] !== ' ' && i < len) res += str[i++]
  if (Number.isNaN(+res)) return 0
  if (+res < -Math.pow(2, 31)) return -Math.pow(2, 31)
  if (+res > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1
  return +res
}
/**
 * 69. x 的平方根
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  if (x === 0) return 0
  for (let i = 1; i <= x; i++) {
    if (i * i === x || (i * i < x && (i + 1) * (i + 1) > x)) return i
  }
}
/**
 * 54. 螺旋矩阵（定义边界）
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  if (!matrix.length) return []
  let l = 0,
    r = matrix[0].length - 1,
    t = 0,
    b = matrix.length - 1
  const res = []
  while (true) {
    for (let n = l; n <= r; n++) res.push(matrix[t][n])
    if (++t > b) break
    for (let n = t; n <= b; n++) res.push(matrix[n][r])
    if (--r < l) break
    for (let n = r; n >= l; n--) res.push(matrix[b][n])
    if (--b < t) break
    for (let n = b; n >= t; n--) res.push(matrix[n][l])
    if (++l > r) break
  }
  return res
}
/**
 * 148. 排序链表（归并排序）
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  let p = head,
    len = 0
  while (head) {
    len++
    head = head.next
  }
  const dummy = new ListNode(null)
  let t = dummy,
    step = 1
  while (step <= len) {
    while (p) {
      let l = p,
        r = cut(l, step)
      p = cut(r, step)
      t.next = merge(l, r)
      while (t.next) t = t.next
    }
    step <<= 1
    p = dummy.next
    t = dummy
  }
  return dummy.next
  function cut(node, step) {
    if (step === 0 || !node) return node
    while (step > 1 && node.next) {
      node = node.next
      step--
    }
    const temp = node.next
    node.next = null
    return temp
  }
  function merge(l1, l2) {
    if (!l1 || !l2) return l1 ? l1 : l2
    let p = new ListNode(null),
      dummy = p
    while (l1 && l2) {
      if (l1.val < l2.val) {
        p.next = l1
        p = l1
        l1 = l1.next
      } else {
        p.next = l2
        p = l2
        l2 = l2.next
      }
    }
    p.next = l1 ? l1 : l2
    return dummy.next
  }
}
/**
 * 239. 滑动窗口最大值（队列）
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  const queue = [],
    res = [],
    len = nums.length
  let l = 0,
    r = 0
  while (r < len) {
    while (queue.length > 0 && nums[queue[queue.length - 1]] < nums[r]) {
      queue.pop()
    }
    queue.push(r)
    if (r - l + 1 === k) {
      res.push(nums[queue[0]])
      l++
      if (queue[0] < l) queue.shift()
    }
    r++
  }
  return res
}
/**
 * 136. 只出现一次的数字（异或）
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let res = 0
  for (let i = 0, len = nums.length; i < len; i++) res ^= nums[i]
  return res
}
/**
 * 73. 矩阵置零（dfs）
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
  const h = matrix.length,
    w = matrix[0].length
  function dfs(i, j, dir) {
    if (i < 0 || i >= h || j < 0 || j >= w || matrix[i][j] === 0) return
    matrix[i][j] = '#'
    if (dir === 'l') return dfs(i, j - 1, 'l')
    if (dir === 'r') return dfs(i, j + 1, 'r')
    if (dir === 'u') return dfs(i - 1, j, 'u')
    if (dir === 'd') return dfs(i + 1, j, 'd')
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][j] = '#'
        dfs(i - 1, j, 'u')
        dfs(i + 1, j, 'd')
        dfs(i, j - 1, 'l')
        dfs(i, j + 1, 'r')
      }
    }
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (matrix[i][j] === '#') {
        matrix[i][j] = '0'
      }
    }
  }
}
/**
 * 344. 反转字符串（双指针）
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  for (let i = 0, len = s.length; i < Math.floor(len / 2); i++) {
    ;[s[i], s[len - i - 1]] = [s[len - i - 1], s[i]]
  }
}
/**
 * 206. 反转链表（递归）
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  function reverse(prev, l) {
    if (!l) return prev
    const temp = l.next
    l.next = prev
    return reverse(l, temp)
  }
  return reverse(null, head)
}
/**
 * 116. 填充每个节点的下一个右侧节点指针
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  function point(l, r) {
    if (!l && !r) return
    l.next = r
    point(l.left, l.right)
    if (r) {
      point(l.right, r.left)
      point(r.left, r.right)
      point(r.right, null)
    } else {
      point(l.right, null)
    }
  }
  point(root, null)
  return root
}
/**
 * 50. Pow(x, n)
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (x === 0) return 0
  if (n === 0) return 1
  if (n === 1) return x
  let absN = Math.abs(n),
    halfN = Math.floor(absN / 2)
  let halfRes = myPow(x, halfN)
  let res = absN % 2 === 0 ? halfRes * halfRes : halfRes * halfRes * x
  return n > 0 ? res : 1 / res
}
/**
 * 307. 区域和检索 - 数组可修改（线段树）
 * @param {number[]} nums
 */
var NumArray = function(nums) {
  let len = nums.length
  this.tree = new Array(len * 2)
  for (let i = 0; i < len; i++) {
    this.tree[len + i] = nums[i]
  }
  for (let i = len - 1; i > 0; i--) {
    this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1]
  }
}

/**
 * @param {number} i
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(i, val) {
  i += this.tree.length / 2
  this.tree[i] = val
  while (i > 1) {
    let parent = Math.floor(i / 2)
    let other = i % 2 == 1 ? i - 1 : i + 1
    this.tree[parent] = this.tree[i] + this.tree[other]
    i = parent
  }
}

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  let l = this.tree.length / 2 + i
  let r = this.tree.length / 2 + j
  let sum = 0
  while (l <= r) {
    if (l % 2 == 1) {
      sum += this.tree[l]
      l++
    }
    if (r % 2 == 0) {
      sum += this.tree[r]
      r--
    }
    l /= 2
    r = Math.floor(r / 2)
  }
  return sum
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */
/**
 * 327. 区间和的个数（暴力循环）
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function(nums, lower, upper) {
  let ans = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    let sum = 0
    for (let j = i; j < len; j++) {
      sum += nums[j]
      if (sum >= lower && sum <= upper) ans++
    }
  }
  return ans
}
/**
 * 326. 3的幂
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
  let res = 1
  while (res < n) {
    res *= 3
  }
  return res === n
}
/**
 * 238. 除自身以外数组的乘积
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const pre = [],
    suf = [],
    res = []
  let l = 1
  for (let i = 0, len = nums.length; i < len; i++) {
    pre.push(l)
    l *= nums[i]
  }
  let r = 1
  for (let len = nums.length, i = len - 1; i >= 0; i--) {
    suf[i] = r
    r *= nums[i]
  }
  for (let i = 0, len = nums.length; i < len; i++) res.push(pre[i] * suf[i])
  return res
}
/**
 * 66. 加一
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  const len = digits.length
  if (digits[len - 1] !== 9) {
    digits[len - 1]++
  } else {
    let i = 1
    while (i <= len && digits[len - i] === 9) {
      digits[len - i] = 0
      i++
    }
    if (len - i < 0) {
      digits.unshift(1)
      return digits
    }
    digits[len - i]++
  }
  return digits
}
/**
 * 5. 最长回文子串（中心扩展）
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const len = s.length,
    N = len * 2 - 1
  let res = ''
  for (let i = 0; i < N; i++) {
    let l = Math.ceil(i / 2) - 1,
      r = l + 1 + (i % 2 === 0 ? 1 : 0)
    let count = i % 2 === 0 ? 1 : 0
    while (l >= 0 && r < len && s[l] === s[r]) {
      l--
      r++
      count += 2
    }
    if (count > res.length) res = s.slice(l + 1, r)
  }
  return res
}
/**
 * 334. 递增的三元子序列
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function(nums) {
  let first = Number.MAX_SAFE_INTEGER,
    second = Number.MAX_SAFE_INTEGER
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] <= first) {
      first = nums[i]
    } else if (nums[i] < second) {
      second = nums[i]
    }
    if (nums[i] > second) return true
  }
  return false
}
/**
 * 350. 两个数组的交集 II（排序）
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  const ans = []
  let i = 0,
    j = 0,
    len1 = nums1.length,
    len2 = nums2.length
  while (i < len1 && j < len2) {
    if (nums1[i] === nums2[j]) {
      ans.push(nums1[i])
      i++
      j++
    } else if (nums1[i] < nums2[j]) {
      i++
    } else {
      j++
    }
  }
  return ans
}
/**
 * 134. 加油站
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
  let total = 0,
    len = gas.length,
    sum = 0,
    start = 0
  for (let i = 0; i < len; i++) {
    sum += gas[i] - cost[i]
    total += gas[i] - cost[i]
    if (sum < 0) {
      sum = 0
      start = i + 1
    }
  }
  return total >= 0 ? start : -1
}
/**
 * 387. 字符串中的第一个唯一字符（hash）
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  const hash = {}
  for (let i = 0, len = s.length; i < len; i++) {
    if (hash.hasOwnProperty(s[i])) {
      hash[s[i]]++
    } else {
      hash[s[i]] = 1
    }
  }
  for (let i = 0, len = s.length; i < len; i++) {
    if (hash[s[i]] === 1) return i
  }
  return -1
}
/**
 * 124. 二叉树中的最大路径和
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
  let res = Number.MIN_SAFE_INTEGER
  function getMax(node) {
    if (!node) return 0
    let l = Math.max(0, getMax(node.left))
    let r = Math.max(0, getMax(node.right))
    res = Math.max(res, node.val + l + r)
    return Math.max(l, r) + node.val
  }
  getMax(root)
  return res
}
/**
 * 227. 基本计算器 II（栈）
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
  let stack = []
  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] === ' ') continue
    let cur = ''
    if (s[i] === '+' || s[i] === '-') {
      cur = s[i]
    } else if (s[i] === '*' || s[i] === '/') {
      let symb = s[i]
      let prev = stack.pop()
      let next = ''
      while (s[i + 1] === ' ' && i < s.length) i++
      while (!Number.isNaN(+s[i + 1]) && s[i + 1] !== ' ' && i < s.length) {
        next += s[++i]
      }
      cur = symb === '*' ? prev * +next : Math.floor(prev / +next)
    } else {
      cur += s[i]
      while (!Number.isNaN(+s[i + 1]) && s[i + 1] !== ' ' && i < s.length) {
        cur += s[++i]
      }
      cur = +cur
    }
    stack.push(cur)
  }
  let ans = stack[0]
  for (let i = 1, len = stack.length; i < len; i++) {
    if (stack[i] === '+') {
      ans += stack[++i]
    } else {
      ans -= stack[++i]
    }
  }
  return ans
}
/**
 * 108. 将有序数组转换为二叉搜索树
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  if (nums.length === 0) return null
  let mid = Math.floor(nums.length / 2)
  let root = new TreeNode(nums[mid])
  root.left = sortedArrayToBST(nums.slice(0, mid))
  root.right = sortedArrayToBST(nums.slice(mid + 1))
  return root
}
/**
 * 38. 外观数列
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
  let ans = '1'
  for (let i = 2; i <= n; i++) {
    let temp = ''
    for (let j = 0, len = ans.length; j < len; j++) {
      let cur = ans[j],
        count = 1
      while (cur === ans[j + 1]) {
        count++
        j++
      }
      temp += count + cur
    }
    ans = temp
  }
  return ans
}
/**
 * 315. 计算右侧小于当前元素的个数（暴力循环）
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function(nums) {
  if (nums.length === 0) return []
  const ans = []
  for (let i = 0, len = nums.length; i < len - 1; i++) {
    let temp = 0
    for (let j = i + 1; j < len; j++) {
      if (nums[i] > nums[j]) temp++
    }
    ans.push(temp)
  }
  ans.push(0)
  return ans
}
/**
 * 138. 复制带随机指针的链表（hash）
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
  const hash = new Map()
  if (!head) return null
  let cHead = new Node()
  function copy(cNode, node) {
    cNode.val = node.val
    hash.set(node, cNode)
    if (node.next) {
      if (hash.has(node.next)) {
        cNode.next = hash.get(node.next)
      } else {
        cNode.next = new Node()
        copy(cNode.next, node.next)
      }
    }
    if (node.random) {
      if (hash.has(node.random)) {
        cNode.random = hash.get(node.random)
      } else {
        cNode.random = new Node()
        copy(cNode.random.node.random)
      }
    }
  }
  copy(cHead, head)
  return cHead
}
/**
 * 138. 复制带随机指针的链表（回溯）
 * @param {Node} head
 * @return {Node}
 */
const hash = new Map()
var copyRandomList = function(head) {
  if (!head) return null
  if (hash.has(head)) return hash.get(head)
  const node = new Node()
  node.val = head.val
  hash.set(head, node)
  node.next = copyRandomList(head.next)
  node.random = copyRandomList(head.random)
  return node
}
/**
 * 171. Excel表列序号
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function(s) {
  const len = s.length
  let ans = 0
  for (let i = 0; i < len; i++) {
    ans += (s[i].charCodeAt() - 64) * Math.pow(26, len - i - 1)
  }
  return ans
}
/**
 * 204. 计数质数
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
  const prims = new Array(n)
  prims.fill(true)
  for (let i = 2; i * i <= n; i++) {
    if (prims[i]) {
      for (let j = 2; i * j <= n; j++) {
        prims[i * j] = false
      }
    }
  }
  let ans = 0
  for (let i = 2; i <= n; i++) if (prims[i]) ans++
  return ans
}
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  let ans = ''
  if (strs.length === 0) return ans
  if (strs.length === 1) return strs[0]
  const len = strs.length,
    firstL = strs[0].length
  for (let i = 0; i < firstL; i++) {
    let temp = strs[0].slice(0, i + 1)
    let j
    for (j = 1; j < len; j++) {
      if (temp !== strs[j].slice(0, i + 1)) break
    }
    if (j === len) {
      ans = temp
    } else {
      break
    }
  }
  return ans
}
/**
 * 191. 位1的个数（位运算）
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
  let ans = 0
  for (let i = 32; i > 0; i--) {
    ans += n & 1
    n >>= 1
  }
  return ans
}
/**
 * 131. 分割回文串（回溯法）
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  const ans = [],
    len = s.length
  function backtrack(i, temp) {
    if (i === len) ans.push(temp)
    for (let count = i; count < len; count++) {
      let cur = s.slice(i, count + 1)
      if (
        cur ===
        cur
          .split('')
          .reverse()
          .join('')
      ) {
        backtrack(count + 1, [...temp, cur])
      }
    }
  }
  backtrack(0, [])
  return ans
}
/**
 * 5. 最长回文子串（中心扩展）
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const len = s.length,
    N = len * 2 - 1
  let ans = ''
  for (let i = 0; i < N; i++) {
    let l = (i - 1) >> 1
    let r = l + (i % 2 === 0 ? 1 : 0) + 1
    let count = i % 2 === 0 ? 1 : 0
    while (l >= 0 && r < len && s[l] === s[r]) {
      l--
      r++
      count += 2
    }
    if (ans.length < count) ans = s.slice(l + 1, r)
  }
  return ans
}
/**
 * 395. 至少有K个重复字符的最长子串（分治法）
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function(s, k) {
  const queue = [s]
  let ans = 0
  while (queue.length) {
    const cur = queue.pop(),
      hash = {}
    for (let i = 0, len = cur.length; i < len; i++) {
      if (hash.hasOwnProperty(cur[i])) {
        hash[cur[i]]++
      } else {
        hash[cur[i]] = 1
      }
    }
    let i = 0,
      prev = 0
    for (i = 0, len = cur.length; i < len; i++) {
      if (hash[cur[i]] < k) {
        queue.push(cur.slice(prev, i))
        prev = i + 1
      }
    }
    if (prev === 0) ans = Math.max(ans, cur.length)
    if (prev !== 0) queue.push(cur.slice(prev))
  }
  return ans
}
/**
 * 88. 合并两个有序数组
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let i = 0,
    j = 0
  while (i < m && j < n) {
    if (nums1[i] > nums2[j]) {
      for (let k = m; k > i; k--) {
        nums1[k] = nums1[k - 1]
      }
      m++
      nums1[i] = nums2[j]
      j++
      i++
    } else {
      i++
    }
  }
  while (j < n) {
    nums1[m++] = nums2[j++]
  }
}
/**
 * 412. Fizz Buzz（极度简单，引起舒适）
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
  const ans = []
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      ans.push('FizzBuzz')
    } else if (i % 3 === 0) {
      ans.push('Fizz')
    } else if (i % 5 === 0) {
      ans.push('Buzz')
    } else {
      ans.push(i + '')
    }
  }
  return ans
}
/**
 * 91. 解码方法（动态规划）
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if (s[0] == 0) return 0
  let prev1 = 1,
    prev2 = 1
  const len = s.length
  for (let i = 1; i < len; i++) {
    let temp = 0
    if (s[i] == 0 && (s[i - 1] == 0 || s[i - 1] > 2)) return 0
    if (s[i] == 0) {
      temp = prev1
    } else if (s[i - 1] == 0 || +(s[i - 1] + s[i]) > 26) {
      temp = prev2
    } else {
      temp = prev1 + prev2
    }
    prev1 = prev2
    prev2 = temp
  }
  return prev2
}
/**
 * 44. 通配符匹配（动态规划）
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const lenS = s.length,
    lenP = p.length
  const dp = new Array(lenS + 1)
  for (let i = 0; i <= lenS; i++) {
    dp[i] = new Array(lenP + 1)
    dp[i].fill(false)
  }
  dp[lenS][lenP] = true
  for (let i = lenP - 1; i >= 0; i--) {
    dp[lenS][i] = dp[lenS][i + 1] && p[i] === '*'
  }
  for (let i = lenS - 1; i >= 0; i--) {
    for (let j = lenP - 1; j >= 0; j--) {
      const charS = s[i],
        charP = p[j]
      if (charS === charP || charP === '?') {
        dp[i][j] = dp[i + 1][j + 1]
      } else if (charP === '*') {
        for (let n = 0; n <= lenS - i; n++) {
          dp[i][j] = dp[i][j] || dp[i + n][j + 1]
        }
      }
    }
  }
  return dp[0][0]
}
