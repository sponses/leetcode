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
