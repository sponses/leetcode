/**
 * 面试题29. 顺时针打印矩阵
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  if (matrix.length === 0) return []
  const ans = []
  let l = 0,
    r = matrix[0].length,
    u = 0,
    d = matrix.length
  while (true) {
    for (let i = l; i < r; i++) ans.push(matrix[u][i])
    if (++u === d) break
    for (let i = u; i < d; i++) ans.push(matrix[i][r - 1])
    if (--r === l) break
    for (let i = r - 1; i >= l; i--) ans.push(matrix[d - 1][i])
    if (--d === u) break
    for (let i = d - 1; i >= u; i--) ans.push(matrix[i][l])
    if (++l === r) break
  }
  return ans
}
/**
 * 面试题10- II. 青蛙跳台阶问题
 * @param {number} n
 * @return {number}
 */
var numWays = function(n) {
  if (n === 0) return 1
  let p1 = 0,
    p2 = 1
  for (let i = 1; i <= n; i++) {
    let temp = (p1 + p2) % 1000000007
    p1 = p2
    p2 = temp
  }
  return p2
}
/**
 * 面试题22. 链表中倒数第k个节点
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
  let p = head,
    len = 0
  while (p) {
    len++
    p = p.next
  }
  k = len - k
  while (k > 0) {
    head = head.next
    k--
  }
  return head
}
/**
 * 面试题22. 链表中倒数第k个节点
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
  let fast = head,
    slow = head
  while (k > 1) {
    fast = fast.next
    k--
  }
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  return slow
}
/**
 * 面试题07. 重建二叉树
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (preorder.length === 0) return null
  const cur = preorder[0]
  const node = new TreeNode(cur)
  const i = inorder.indexOf(cur)
  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i))
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1))
  return node
}
/**
 * 面试题42. 连续子数组的最大和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let prev = 0,
    ans = Number.MIN_SAFE_INTEGER
  for (let i = 0, len = nums.length; i < len; i++) {
    prev = Math.max(nums[i], prev + nums[i])
    ans = Math.max(prev, ans)
  }
  return ans
}
/**
 * 面试题21. 调整数组顺序使奇数位于偶数前面
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
  let even = nums.length - 1,
    odds = 0
  for (let i = 0, len = nums.length; i <= even; i++) {
    if (nums[i] % 2 === 0) {
      ;[nums[i], nums[even]] = [nums[even], nums[i]]
      even--
      i--
    } else {
      ;[nums[i], nums[odds]] = [nums[odds], nums[i]]
      odds++
    }
  }
  return nums
}
/**
 * 面试题58 - I. 翻转单词顺序
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let ans = ''
  let len = s.length - 1
  while (len >= 0) {
    while (s[len] === ' ' && len >= 0) len--
    let temp = ''
    while (s[len] !== ' ' && len >= 0) temp = s[len--] + temp
    ans += temp + (temp === '' ? '' : ' ')
  }
  return ans.slice(0, ans.length - 1)
}
/**
 * 面试题53 - II. 0～n-1中缺失的数字
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  let l = 0,
    r = nums.length - 1
  while (l <= r) {
    let mid = (l + r) >> 1
    if (nums[mid] === mid) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  return l
}
/**
 * 面试题50. 第一个只出现一次的字符
 * @param {string} s
 * @return {character}
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
    if (hash[s[i]] === 1) return s[i]
  }
  return ' '
}
/**
 * 面试题47. 礼物的最大价值
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
  const h = grid.length,
    w = grid[0].length
  const dp = new Array(w)
  dp.fill(0)
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (j === 0) {
        dp[0] += grid[i][j]
      } else {
        dp[j] = grid[i][j] + Math.max(dp[j - 1], dp[j])
      }
    }
  }
  return dp[w - 1]
}
/**
 * 面试题12. 矩阵中的路径
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const row = board.length,
    col = board[0].length,
    len = word.length
  function dfs(i, j, k) {
    if (i < 0 || i >= row || j < 0 || j >= col || word[k] !== board[i][j])
      return false
    if (k === len - 1) return true
    const temp = board[i][j]
    board[i][j] = '#'
    let res =
      dfs(i - 1, j, k + 1) ||
      dfs(i + 1, j, k + 1) ||
      dfs(i, j - 1, k + 1) ||
      dfs(i, j + 1, k + 1)
    board[i][j] = temp
    return res
  }
  let res = false
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === word[0]) {
        res = res || dfs(i, j, 0)
      }
      if (res) return true
    }
  }
  return res
}
/**
 * 面试题59 - I. 滑动窗口的最大值
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
  const stack = [],
    len = nums.length,
    ans = []
  let l = 0,
    r = 0
  while (r < len) {
    const cur = nums[r]
    while (stack.length && nums[stack[stack.length - 1]] < cur) stack.pop()
    stack.push(r)
    if (r - l + 1 === k) {
      ans.push(nums[stack[0]])
      l++
      if (stack[0] < l) stack.shift()
    }
    r++
  }
  return ans
}
/**
 * 面试题64. 求1+2+…+n
 * @param {number} n
 * @return {number}
 */
var sumNums = function(n) {
  return n && n + sumNums(n - 1)
}
/**
 * 面试题26. 树的子结构
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
  if (!A || !B) return false
  return isSub(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
}

var isSub = function(node1, node2) {
  if (!node2) return true
  if (!node1) return false
  if (node1.val !== node2.val) return false
  return isSub(node1.left, node2.left) && isSub(node1.right, node2.right)
}
/**
 * 面试题66. 构建乘积数组
 * @param {number[]} a
 * @return {number[]}
 */
var constructArr = function(a) {
  const pre = [1],
    suf = [1],
    ans = [],
    len = a.length
  for (let i = 1; i < len; i++) {
    pre.push(pre[i - 1] * a[i - 1])
    suf.unshift(suf[0] * a[len - i])
  }
  for (let i = 0; i < len; i++) ans.push(pre[i] * suf[i])
  return ans
}
/**
 * 面试题13. 机器人的运动范围
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
  const board = new Array(m)
  for (let i = 0; i < m; i++) board[i] = new Array(n)
  let ans = 0
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n) return
    let cur = '' + i + j,
      sum = 0
    for (let i = 0, len = cur.length; i < len; i++) sum += +cur[i]
    if (sum > k) return
    if (board[i][j] === '#') return
    board[i][j] = '#'
    ans++
    dfs(i - 1, j)
    dfs(i + 1, j)
    dfs(i, j - 1)
    dfs(i, j + 1)
  }
  dfs(0, 0)
  return ans
}
/**
 * 面试题48. 最长不含重复字符的子字符串
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let l = 0,
    r = 0,
    len = s.length,
    ans = 0
  const hash = {}
  while (r < len) {
    const cur = s[r]
    while (hash.hasOwnProperty(cur)) {
      const temp = s[l]
      delete hash[temp]
      l++
    }
    hash[cur] = 1
    ans = Math.max(ans, r - l + 1)
    r++
  }
  return ans
}
/**
 * 面试题05. 替换空格
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
  let ans = ''
  for (let i = 0, len = s.length; i < len; i++)
    ans += s[i] === ' ' ? '%20' : s[i]
  return ans
}
