/**
 * 141. 环形链表（快慢指针）
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  let fast = head,
    slow = head
  while (slow) {
    fast = fast.next ? fast.next.next : fast.next
    if (!fast) return false
    slow = slow.next
    if (fast === slow) return true
  }
  return false
}
/**
 * 142. 环形链表 II（快慢指针）
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  if (!head) return null
  let slow = head,
    fast = head
  while (slow) {
    fast = fast.next ? fast.next.next : fast.next
    if (!fast) return null
    slow = slow.next
    if (fast === slow) break
  }
  slow = head
  while (slow !== fast) {
    slow = slow.next
    fast = fast.next
  }
  return fast
}
/**
 * 202. 快乐数（快慢指针）
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  function getSumOfSquares(n) {
    let res = 0
    while (n) {
      res += (n % 10) * (n % 10)
      n = Math.floor(n / 10)
    }
    return res
  }
  let slow = n,
    fast = n
  while (true) {
    slow = getSumOfSquares(slow)
    fast = getSumOfSquares(fast)
    if (fast === 1) return true
    fast = getSumOfSquares(fast)
    if (fast === 1) return true
    if (fast === slow) return false
  }
}
