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
