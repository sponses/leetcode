/**
 * 101. 对称二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true

  function compare(root1, root2) {
    if (!root1 && !root2) return true
    if ((root1 && !root2) || (!root1 && root2)) return false
    if (root1.val !== root2.val) return false
    return compare(root1.left, root2.right) && compare(root1.right, root2.left)
  }
  return compare(root.left, root.right)
}
/**
 * 938. 二叉搜索树的范围和
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
var rangeSumBST = function (root, L, R) {
  let arr = []
  //哈哈哈我疯了中序遍历把每个值保存进数组
  function midOrderTraversal(root) {
    if (!root) return
    midOrderTraversal(root.left)
    arr.push(root.val)
    midOrderTraversal(root.right)
  }
  midOrderTraversal(root)

  let result = 0
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] >= L && arr[i] <= R) {
      result += arr[i]
    }
  }
  return result
}
/**
 * 653. 两数之和 IV - 输入 BST
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
  //思路就是遍历它
  let arr = []

  function traversal(root) {
    if (!root) return false
    if (arr.includes(k - root.val)) return true
    arr.push(root.val)
    return traversal(root.left) || traversal(root.right)
  }
  return traversal(root)
}
/**
 * 404.左叶子之和
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function (root) {
  if (!root) return 0
  let result = 0
  if (root.left && !root.left.left && !root.left.right) result += root.left.val
  return result + sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right)
}
/**
 * 257. 二叉树的所有路径
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  let res = []
  if (!root) return res

  function getPath(root, str) {
    str === '' ? (str += +root.val) : (str += '->' + root.val)

    if (!root.left && !root.right) {
      res.push(str)
      return res
    }

    if (root.left) getPath(root.left, str)
    if (root.right) getPath(root.right, str)
  }
  let str = ''
  getPath(root, str)

  return res
}
/**
 * 1038. 从二叉搜索树到更大和树（中序遍历逆序）
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var bstToGst = function (root) {
  let sum = 0
  function updateNode(node) {
    if (!node) return
    updateNode(node.right)
    let temp = node.val
    node.val += sum
    sum += temp
    updateNode(node.left)
  }
  updateNode(root)
  return root
}
/**
 * 114. 二叉树展开为链表
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  function flat(root) {
    if (!root || (!root.left && !root.right)) return

    if (!root.left && root.right) {
    } else if (root.left && !root.right) {
      root.right = root.left
      root.left = null
    } else {
      let right = root.right
      root.right = root.left
      root.left = null

      let temp = root.right
      while (temp.right) {
        temp = temp.right
      }
      temp.right = right
    }
    flat(root.right)
  }
  flat(root)
}
/**
 * 230. 二叉搜索树中第K小的元素
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let count = 1,
    res = null
  function getTthSmallest(node) {
    if (!node) return null
    if (res) return
    getTthSmallest(node.left)
    if (k === count) {
      res = node.val
      count++
      return
    } else {
      count++
    }
    getTthSmallest(node.right)
  }
  getTthSmallest(root)
  return res
}
/**
 * 951. 翻转等价二叉树
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function (root1, root2) {
  if (!root1 && !root2) return true
  if ((!root1 && root2) || (root1 && !root2)) return false
  if (root1.val !== root2.val) return false

  return (
    (flipEquiv(root1.left, root2.right) &&
      flipEquiv(root1.right, root2.left)) ||
    (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right))
  )
}
/**
 * 102. 二叉树的层次遍历（队列）
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return []
  let res = [],
    queue = [root, 'ok'],
    temp = [],
    count = 0
  while (queue.length) {
    let cur = queue.shift()
    if (cur === 'ok') {
      res.push(temp)
      temp = []
      if (count) queue.push('ok')
      count = 0
    } else {
      if (cur.left) {
        queue.push(cur.left)
        count++
      }
      if (cur.right) {
        queue.push(cur.right)
        count++
      }
      temp.push(cur.val)
    }
  }
  return res
}
/**
 * 102. 二叉树的层次遍历（优化）
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return []
  let queue = [root],
    res = []
  while (queue.length) {
    let count = queue.length,
      temp = []
    while (count) {
      let cur = queue.shift()
      temp.push(cur.val)
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
      count--
    }
    res.push(temp)
  }
  return res
}
/**
 * 102. 二叉树的层次遍历（dfs）
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let res = []
  function dfs(node, count) {
    if (!node) return
    if (Array.isArray(res[count])) {
      res[count].push(node.val)
    } else {
      res[count] = [node.val]
    }
    if (node.left) dfs(node.left, count + 1)
    if (node.right) dfs(node.right, count + 1)
  }
  dfs(root, 0)
  return res
}
/**
 * 107. 二叉树的层次遍历 II（dfs）
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  let res = []
  function dfs(node, count) {
    if (!node) return
    if (Array.isArray(res[count])) {
      res[count].push(node.val)
    } else {
      res[count] = [node.val]
    }
    if (node.left) dfs(node.left, count + 1)
    if (node.right) dfs(node.right, count + 1)
  }
  dfs(root, 0)
  res.reverse()
  return res
}
/**
 * 103. 二叉树的锯齿形层次遍历（dfs）
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  let res = []
  function dfs(node, count) {
    if (!node) return
    if (Array.isArray(res[count])) {
      if (count % 2 === 0) {
        res[count].push(node.val)
      } else {
        res[count].unshift(node.val)
      }
    } else {
      res[count] = [node.val]
    }
    if (node.left) dfs(node.left, count + 1)
    if (node.right) dfs(node.right, count + 1)
  }
  dfs(root, 0)
  return res
}
/**
 * 637. 二叉树的层平均值（队列）
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  if (!root) return []
  let res = [],
    queue = [root]
  while (queue.length) {
    let count = queue.length,
      x = count,
      sum = 0
    while (count) {
      let cur = queue.shift()
      sum += cur.val
      if (cur.left) {
        queue.push(cur.left)
      }
      if (cur.right) {
        queue.push(cur.right)
      }
      count--
    }
    res.push(sum / x)
  }
  return res
}
/**
 * 111. 二叉树的最小深度（队列）
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0
  let queue = [root],
    len = 0
  while (queue.length) {
    let count = queue.length
    len++
    while (count) {
      let cur = queue.shift()
      if (cur.left || cur.right) {
        cur.left && queue.push(cur.left)
        cur.right && queue.push(cur.right)
      } else {
        return len
      }
      count--
    }
  }
}
/**
 * 111. 二叉树的最小深度（dfs）
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0
  let res = Number.MAX_SAFE_INTEGER
  function dfs(node, count) {
    if (!node) return
    if (node.left || node.right) {
      node.left && dfs(node.left, count + 1)
      node.right && dfs(node.right, count + 1)
    } else {
      res = Math.min(res, count)
    }
  }
  dfs(root, 1)
  return res
}
/**
 * 112. 路径总和（dfs）
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function (root, sum) {
  function dfs(node, sum) {
    if (!node) return false
    sum -= node.val
    if (!node.right && !node.left) {
      return sum === 0
    }
    return dfs(node.left, sum) || dfs(node.right, sum)
  }
  return dfs(root, sum)
}
/**
 * 113. 路径总和 II（dfs）
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function (root, sum) {
  let res = []
  function dfs(node, temp, sum) {
    if (!node) return
    sum -= node.val
    temp.push(node.val)
    if (!node.left && !node.right) {
      if (sum === 0) {
        res.push(temp)
      }
      return
    }
    dfs(node.left, [...temp], sum)
    dfs(node.right, [...temp], sum)
  }
  dfs(root, [], sum)
  return res
}
/**
 * 437. 路径总和 III（dfs）
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function (root, sum) {
  function dfs(node, count, arr) {
    if (!node) return 0
    let cur = node.val,
      n = cur === sum ? 1 : 0
    arr[count] = node.val
    for (let i = count; i > 0; i--) {
      cur += arr[i - 1]
      if (cur === sum) n++
    }
    return n + dfs(node.left, count + 1, arr) + dfs(node.right, count + 1, arr)
  }
  return dfs(root, 0, [])
}
/**
 * 257. 二叉树的所有路径（dfs）
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  let res = []
  function dfs(node, path) {
    if (!node) return
    if (!node.left && !node.right) {
      path += node.val
      res.push(path)
    } else {
      path += node.val + '->'
    }
    dfs(node.left, path)
    dfs(node.right, path)
  }
  dfs(root, '')
  return res
}
/**
 * 987. 二叉树的垂序遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  const arr = []
  const ans = []
  function dfs(root, x, y) {
    if (!root) return
    arr.push({ x, y, val: root.val })
    dfs(root.left, x - 1, y - 1)
    dfs(root.right, x + 1, y - 1)
  }
  dfs(root, 0, 0)
  function compare(a, b) {
    return a.x - b.x || b.y - a.y || a.val - b.val
  }
  arr.sort(compare)
  for (let i = 0, len = arr.length; i < len; i++) {
    ans.push([arr[i].val])
    while (arr[i + 1] && arr[i].x === arr[i + 1].x) {
      ans[ans.length - 1].push(arr[++i].val)
    }
  }
  return ans
}
/**
 * 623. 在二叉树中增加一行
 * @param {TreeNode} root
 * @param {number} v
 * @param {number} d
 * @return {TreeNode}
 */
var addOneRow = function (root, v, d) {
  if (d === 1) {
    const node = new TreeNode(v)
    node.left = root
    return node
  } else {
    const ans = root
    dfs(root, v, 1, d)
    return ans
  }
}

function dfs(node, v, n, d) {
  if (!node) return
  if (n === d - 1) {
    let l = node.left,
      r = node.right
    node.left = new TreeNode(v)
    node.left.left = l
    node.right = new TreeNode(v)
    node.right.right = r
    return
  }
  dfs(node.left, v, n + 1, d)
  dfs(node.right, v, n + 1, d)
}
/**
 * 508. 出现次数最多的子树元素和
 * @param {TreeNode} root
 * @return {number[]}
 */
var findFrequentTreeSum = function (root) {
  const hash = {}
  const max = { count: 0, val: [] }
  hash.max = max
  function getSum(node) {
    if (!node) return 0
    const l = getSum(node.left)
    const r = getSum(node.right)
    const sum = node.val + l + r
    if (hash[sum]) {
      hash[sum]++
    } else {
      hash[sum] = 1
    }
    if (hash[sum] > hash.max.count) {
      hash.max.count = hash[sum]
      hash.max.val = [sum]
    } else if (hash[sum] === hash.max.count) {
      hash.max.val.push(sum)
    }
    return sum
  }
  getSum(root)
  return hash.max.val
}
/**
 * 907. 子数组的最小值之和
 * @param {number[]} A
 * @return {number}
 */
var sumSubarrayMins = function (A) {
  let ans = 0
  const stack = []
  A.push(Number.MIN_SAFE_INTEGER)
  A.unshift(Number.MIN_SAFE_INTEGER)
  for (let i = 0, len = A.length; i < len; i++) {
    while (stack.length > 1 && A[stack[stack.length - 1]] > A[i]) {
      const cur = stack.pop()
      ans += A[cur] * (i - cur) * (cur - stack[stack.length - 1])
    }
    stack.push(i)
  }
  return ans % 1000000007
}
/**
 * 662. 二叉树最大宽度
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  const hash = {}
  let ans = 1
  function dfs(node, i, pos) {
    if (!node) return
    if (hash.hasOwnProperty(i)) {
      ans = Math.max(Math.abs(pos - hash[i] + 1), ans)
    } else {
      hash[i] = pos
    }
    dfs(node.left, i + 1, pos * 2)
    dfs(node.right, i + 1, pos * 2 + 1)
  }
  dfs(root, 0, 1)
  return ans
}
/**
 * 889. 根据前序和后序遍历构造二叉树
 * @param {number[]} pre
 * @param {number[]} post
 * @return {TreeNode}
 */
var constructFromPrePost = function (pre, post) {
  if (!pre.length) return null
  const cur = pre[0]
  const node = new TreeNode(cur)
  const l = pre[1],
    r = post[post.length - 2]
  if (l || l === r) {
    const i = post.indexOf(l)
    node.left = constructFromPrePost(pre.slice(1, i + 2), post.slice(0, i + 1))
  }
  if (r && l !== r) {
    const i = pre.indexOf(r)
    node.right = constructFromPrePost(
      pre.slice(i),
      post.slice(i - 1, post.length - 1)
    )
  }
  return node
}
/**
 * 1161. 最大层内元素和
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function (root) {
  let sum = Number.MIN_SAFE_INTEGER,
    ans = 0,
    n = 0
  const queue = [root]
  while (queue.length) {
    let count = queue.length
    let temp = 0
    while (count) {
      const cur = queue.shift()
      if (cur) temp += cur.val
      if (cur.left) queue.push(cur.left)
      if (cur.right) queue.push(cur.right)
      count--
    }
    n++
    if (temp > sum) {
      ans = n
      sum = temp
    }
  }
  return ans
}
/**
 * 701. 二叉搜索树中的插入操作
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (!root) return new TreeNode(val)
  if (root.val < val) {
    if (root.right) {
      insertIntoBST(root.right, val)
    } else {
      root.right = new TreeNode(val)
    }
  } else {
    if (root.left) {
      insertIntoBST(root.left, val)
    } else {
      root.left = new TreeNode(val)
    }
  }
  return root
}
/**
 * 729. 我的日程安排表 I
 */
var MyCalendar = function () {
  this.cal = null
}

function SegNode(s, e) {
  this.start = s
  this.end = e
  this.left = null
  this.right = null
}

/**
 *
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  if (this.cal === null) {
    this.cal = new SegNode(start, end)
    return true
  }
  let node = this.cal
  while (true) {
    if (node.start >= end) {
      if (node.left) {
        node = node.left
      } else {
        node.left = new SegNode(start, end)
        return true
      }
    } else if (node.end <= start) {
      if (node.right) {
        node = node.right
      } else {
        node.right = new SegNode(start, end)
        return true
      }
    } else {
      return false
    }
  }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

/**
 * 589. N叉树的前序遍历
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function (root) {
  const ans = []
  if (!root) return ans
  const stack = [root]
  while (stack.length) {
    const cur = stack.pop()
    ans.push(cur.val)
    for (let i = cur.children.length - 1; i >= 0; i--) {
      stack.push(cur.children[i])
    }
  }
  return ans
}
/**
 * 590. N叉树的后序遍历
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function (root) {
  const ans = []
  if (!root) return ans
  const stack = [root]
  while (stack.length) {
    const cur = stack.pop()
    ans.push(cur.val)
    for (let i = 0, len = cur.children.length; i < len; i++) {
      stack.push(cur.children[i])
    }
  }
  return ans.reverse()
}
/**
 * 1041. 困于环中的机器人
 * @param {string} instructions
 * @return {boolean}
 */
var isRobotBounded = function (instructions) {
  const hash = {
    0: [1, 0],
    90: [0, 1],
    180: [-1, 0],
    270: [0, -1],
  }
  let cnt = 4
  let x = 0,
    y = 0,
    ang = 0
  while (cnt--) {
    for (let i = 0, len = instructions.length; i < len; i++) {
      if (instructions[i] === 'G') {
        const temp = hash[ang]
        x += temp[0]
        y += temp[1]
      } else if (instructions[i] === 'L') {
        ang = (ang + 90) % 360
      } else {
        ang = ang - 90 < 0 ? ang - 90 + 360 : ang - 90
      }
    }
  }
  return x === 0 && y === 0
}
