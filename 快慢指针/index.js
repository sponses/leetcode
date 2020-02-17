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
