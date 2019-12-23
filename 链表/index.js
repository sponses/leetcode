/**
 * 206.反转链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null
  while (head) {
    let temp = head.next
    head.next = prev
    prev = head
    head = temp
  }
  return head
}
/**
 * 203.移除链表元素
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  while (head && head.val === val) {
    head = head.next
  }
  if (!head) return head
  let prev = head
  while (prev.next) {
    if (prev.next === val) {
      prev.next = prev.next.next
    } else {
      prev = prev.next
    }
  }
  return head
}
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 83.删除排序链表中的重复元素
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  if (!head) return head
  let prev = head
  while (prev.next) {
    if (prev.val === prev.next.val) {
      prev.next = prev.next.next
    } else {
      prev = prev.next
    }
  }
  return head
}
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 876.链表的中间节点
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  let fast = head,
    low = head
  while (fast && fast.next) {
    fast = fast.next.next ? fast.next.next : fast.next
    low = low.next
  }
  return low
}
/**
 * 160.相交链表（方法一）
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let pointerA = headA,
    pointerB = headB
  while (pointerB) {
    while (pointerA) {
      if (pointerA === pointerB) {
        return pointerA
      }
      pointerA = pointerA.next
    }
    pointerA = headA
    pointerB = pointerB.next
  }
  return null
}
/**
 * 160.相交链表（方法二）
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let pointerA = headA,
    pointerB = headB,
    x = new WeakSet()
  while (pointerA) {
    x.add(pointerA)
    pointerA = pointerA.next
  }
  while (pointerB) {
    if (x.has(pointerB)) return pointerB
    pointerB = pointerB.next
  }
  return null
}
