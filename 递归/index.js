/**
 * 783.二叉搜索树节点最小距离（数组排序）
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
  let arr = []

  function dfs(root) {
    if (!root) return
    arr.push(root.val)
    dfs(root.left)
    dfs(root.right)
  }
  dfs(root)

  arr.sort((a, b) => a - b)

  let min = arr[arr.length - 1]
  for (let i = 0, len = arr.length - 1; i < len; i++) {
    min = Math.min(min, arr[i + 1] - arr[i])
  }
  return min
}
/**
 * 783.二叉搜索树节点最小距离（中序遍历）
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function (root) {
  let prev = null,
    min = Number.MAX_SAFE_INTEGER

  function dfs(root) {
    if (!root) return
    dfs(root.left)
    if (prev !== null) min = Math.min(min, root.val - prev)
    prev = root.val
    dfs(root.right)
  }
  dfs(root)
  return min
}
/**
 * 1137. 第 N 个泰波那契数
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  let a = 0,
    b = 1,
    c = 1
  if (n === 0) return a
  if (n === 1 || n === 2) return b

  for (let i = 3; i <= n; i++) {
    let temp = a + b + c
    a = b
    b = c
    c = temp
  }
  return c
}
/**
 * 1342. 将数字变成 0 的操作次数
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
  if (num === 0) return 0
  if (num % 2 === 0) return 1 + numberOfSteps(num / 2)
  return 1 + numberOfSteps(num - 1)
}
/**
 * 1387. 将整数按权重排序
 * @param {number} lo
 * @param {number} hi
 * @param {number} k
 * @return {number}
 */
var getKth = function (lo, hi, k) {
  const hash = {}
  function toOne(num) {
    if (num === 1) return 0
    if (!hash.hasOwnProperty(num)) {
      hash[num] = 1 + (num % 2 === 0 ? toOne(num / 2) : toOne(3 * num + 1))
    }
    return hash[num]
  }
  const arr = []
  let j = 0
  for (let i = lo; i <= hi; i++) arr[j++] = i
  arr.sort((a, b) => {
    return toOne(a) - toOne(b) || a - b
  })
  return arr[k - 1]
}
/**
 * 779. 第K个语法符号
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var kthGrammar = function (N, K) {
  if (N === 1) return '0'
  const p = kthGrammar(N - 1, Math.ceil(K / 2))
  if (K % 2 === 1) return p
  return p === '0' ? '1' : '0'
}
