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
var minDiffInBST = function(root) {
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
var minDiffInBST = function(root) {
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
