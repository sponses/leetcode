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
/**
 * 141.环形链表(哈希表)
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  const x = new WeakSet()
  while (head) {
    if (x.has(head)) return true
    x.add(head)
    head = head.next
  }
  return false
}
/**
 * 141.环形链表(快慢指针)
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  if (!head) return false
  let low = head,
    fast = head.next

  while (low !== fast) {
    if (!fast || !fast.next) return false
    low = low.next
    fast = fast.next.next
  }
  return true
}
/**
 * 328.奇偶链表
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
var oddEvenList = function(head) {
  if (!head) return null
  let odd = head,
    even = head.next,
    list = even
  while (even && even.next) {
    odd.next = even.next
    odd = odd.next
    even.next = odd.next
    even = even.next
  }
  odd.next = list
  return head
}
/**
 * 21. 合并两个有序链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let result = new ListNode(null),
    dummy = result

  while (l1 && l2) {
    if ((l1 && l2 && l1.val <= l2.val) || (l1 && !l2)) {
      result.next = new ListNode(l1.val)
      result = result.next
      l1 = l1.next
    } else if ((l1 && l2 && l2.val < l1.val) || (!l1 && l2)) {
      result.next = new ListNode(l2.val)
      result = result.next
      l2 = l2.next
    }
  }
  result.next = l1 ? l1 : l2
  return dummy.next
}
/**
 * 147. 对链表进行插入排序
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
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
var insertionSortList = function(head) {
  let dummy = new ListNode(null)
  dummy.next = head
  while (head && head.next) {
    let prev = dummy,
      i = 0
    while (prev.next !== head.next) {
      if (prev.next.val > head.next.val) {
        let temp = head.next
        head.next = head.next.next
        temp.next = prev.next
        prev.next = temp
        i++
        break
      } else {
        prev = prev.next
      }
    }
    if (i) continue
    head = head.next
  }
  return dummy.next
}
/**
 * 143.重排链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  while (head && head.next && head.next) {
    let penult = getPenult(head)
    let last = penult.next
    penult.next = null
    last.next = head.next
    head.next = last
    head = head.next.next
  }

  function getPenult(l) {
    while (l && l.next && l.next.next) {
      l = l.next
    }
    return l
  }
}
/**
 * 143.重排链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  if (!head || !head.next) return

  let fast = head,
    low = head
  while (fast && fast.next) {
    low = low.next
    fast = fast.next.next ? fast.next.next : fast.next
  }
  let last = low.next
  low.next = null

  let prev = null
  while (last) {
    let head = last.next
    last.next = prev
    prev = last
    last = head
  }

  while (prev) {
    let temp = prev
    prev = prev.next
    temp.next = head.next
    head.next = temp
    head = head.next.next
  }
}
/**
 * 61. 旋转链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  if (!head || !head.next) return head
  //求出链表的长度
  let len = 0
  let p = head
  while (p) {
    len++
    p = p.next
  }

  //长度与k求余，值为旋转的位置
  let offset = k % len
  if (!offset) return head

  //找出链表索引为(len-k)的节点
  let rest = head
  while (len - offset > 1) {
    rest = rest.next
    offset++
  }

  let temp = rest.next
  rest.next = null
  let last = temp
  while (last && last.next) {
    last = last.next
  }
  last.next = head
  head = temp
  return head
}
/**
 * 61. 旋转链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  if (!head || !head.next) return head

  let p = head,
    len = 1
  while (p && p.next) {
    len++
    p = p.next
  }
  p.next = head

  let offset = len - (k % len)

  let prev = null
  while (offset > 0) {
    prev = head
    head = head.next
    offset--
  }
  prev.next = null
  return head
}
/**
 * 24. 两两交换链表中的节点
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
var swapPairs = function(head) {
  let dummy = new ListNode(null)
  dummy.next = head
  let prev = dummy

  while (head && head.next) {
    let temp = head.next
    head.next = head.next.next
    temp.next = head
    prev.next = temp
    prev = head
    head = head.next
  }

  return dummy.next
}
/**
 * 2. 两数相加
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let dummy = new ListNode(null),
    p = dummy,
    val = 0
  while (l1 || l2 || val) {
    let newNode = new ListNode(null)
    if (!l1 && !l2) {
      newNode.val = val
      p.next = newNode
      break
    } else if (l1 && !l2) {
      newNode.val = l1.val + val >= 10 ? (l1.val + val) % 10 : l1.val + val
      p.next = newNode
      val = l1.val + val >= 10 ? 1 : 0
      l1 = l1.next
    } else if (!l1 && l2) {
      newNode.val = l2.val + val >= 10 ? (l2.val + val) % 10 : l2.val + val
      p.next = newNode
      val = l2.val + val >= 10 ? 1 : 0
      l2 = l2.next
    } else {
      newNode.val =
        l1.val + val + l2.val >= 10
          ? (l1.val + val + l2.val) % 10
          : l1.val + val + l2.val
      p.next = newNode
      val = l1.val + val + l2.val >= 10 ? 1 : 0
      l1 = l1.next
      l2 = l2.next
    }
    p = p.next
  }
  return dummy.next
}
