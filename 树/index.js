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
