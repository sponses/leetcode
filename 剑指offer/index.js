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
