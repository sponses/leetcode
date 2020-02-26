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
