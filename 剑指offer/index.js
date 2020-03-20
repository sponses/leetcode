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
/**
 * 面试题11. 旋转数组的最小数字
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function(numbers) {
  let l = 0,
    r = numbers.length - 1
  while (l < r) {
    let m = (l + r) >> 1
    if (numbers[r] < numbers[m]) {
      l = m + 1
    } else if (numbers[r] > numbers[m]) {
      r = m
    } else {
      r--
    }
  }
  return numbers[l]
}
/**
 * 面试题56 - I. 数组中数字出现的次数
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
  let sum = 0
  for (let i = 0, len = nums.length; i < len; i++) sum ^= nums[i]
  let a = 1
  for (let i = 32; i > 0; i--) {
    if ((sum & a) === 0) a <<= 1
  }
  let ans1 = 0,
    ans2 = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    if ((nums[i] & a) === 0) {
      ans1 ^= nums[i]
    } else {
      ans2 ^= nums[i]
    }
  }
  return [ans1, ans2]
}
/**
 * 面试题51. 数组中的逆序对
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
  let ans = 0
  const temp = []
  function sort(l, r) {
    if (l < r) {
      let m = (l + r) >> 1
      sort(l, m)
      sort(m + 1, r)
      merge(l, m, r)
    }
  }
  function merge(l, m, r) {
    let i = l,
      j = m + 1,
      t = 0
    while (i <= m && j <= r) {
      if (nums[j] < nums[i]) {
        ans += m - i + 1
        temp[t++] = nums[j++]
      } else {
        temp[t++] = nums[i++]
      }
    }
    while (i <= m) temp[t++] = nums[i++]
    while (j <= r) temp[t++] = nums[j++]
    t = 0
    while (l <= r) nums[l++] = temp[t++]
  }
  sort(0, nums.length - 1)
  return ans
}
/**
 * 面试题10- I. 斐波那契数列
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if (n === 0) return 0
  let p1 = 0,
    p2 = 1
  for (let i = 2; i <= n; i++) {
    let temp = (p1 + p2) % 1000000007
    p1 = p2
    p2 = temp
  }
  return p2
}
/**
 * 面试题39. 数组中出现次数超过一半的数字
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  const len = nums.length
  let res = 0,
    count = 0
  for (let i = 0; i < len; i++) {
    if (count === 0) res = i
    count += nums[i] === nums[res] ? 1 : -1
  }
  return nums[res]
}
/**
 * 面试题38. 字符串的排列
 * @param {string} s
 * @return {string[]}
 */
var permutation = function(s) {
  const ans = []
  s = s
    .split('')
    .sort((a, b) => a.charCodeAt() - b.charCodeAt())
    .join('')
  function backtrack(has, rest) {
    if (rest.length === 0) ans.push(has)
    for (let i = 0, len = rest.length; i < len; i++) {
      if (rest[i] === rest[i + 1]) continue
      backtrack(has + rest[i], rest.slice(0, i) + rest.slice(i + 1))
    }
  }
  backtrack('', s)
  return ans
}
/**
 * 面试题25. 合并两个排序的链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  const dummy = new ListNode(null)
  let p = dummy
  while (l1 && l2) {
    if (l1.val <= l2.val) {
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
/**
 * 面试题24. 反转链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null
  while (head) {
    const temp = head.next
    head.next = prev
    prev = head
    head = temp
  }
  return prev
}
/**
 * 面试题30. 包含min函数的栈
 * initialize your data structure here.
 */
var MinStack = function() {
  this.increStack = []
  this.stack = []
}

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.push(x)
  if (
    this.increStack.length === 0 ||
    this.stack[this.increStack[this.increStack.length - 1]] > x
  ) {
    this.increStack.push(this.stack.length - 1)
  }
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.stack.pop()
  const cur = this.stack.length
  if (this.increStack[this.increStack.length - 1] === cur) this.increStack.pop()
}

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  if (this.stack.length === 0) return null
  return this.stack[this.stack.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
  if (this.stack.length === 0) return null
  return this.stack[this.increStack[this.increStack.length - 1]]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
/**
 * 面试题14- I. 剪绳子
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
  const dp = new Array(n + 1)
  dp.fill(0)
  dp[1] = 1
  dp[2] = 1
  for (let i = 3; i <= n; i++) {
    let l = 1
    const half = i >> 1
    while (l <= half) {
      const r = i - l
      dp[i] = Math.max(Math.max(dp[l], l) * Math.max(dp[r], r), dp[i])
      l++
    }
  }
  return dp[n]
}
/**
 * 面试题14- II. 剪绳子 II
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
  if (n === 2) return 1
  if (n === 3) return 2
  let m = 1
  while (n > 4) {
    m *= 3
    m = m % 1000000007
    n -= 3
  }
  return (m * n) % 1000000007
}
/**
 * 面试题18. 删除链表的节点
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function(head, val) {
  const dummy = new ListNode(null)
  dummy.next = head
  let p = dummy
  while (p.next && p.next.val !== val) p = p.next
  p.next = p.next.next
  return dummy.next
}
