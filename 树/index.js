/**
 * 101. 对称二叉树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
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
var rangeSumBST = function(root, L, R) {
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
var findTarget = function(root, k) {
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
var sumOfLeftLeaves = function(root) {
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
var binaryTreePaths = function(root) {
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
var bstToGst = function(root) {
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
