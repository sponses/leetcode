/**
 * 125.验证回文串（栈）
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.replace(
    /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,
    ''
  )
  let arr = [],
    mid1 = Math.ceil(s.length / 2),
    mid2 = Math.floor(s.length / 2)
  for (let i = 0; i < mid1; i++) {
    arr.push(s[i])
  }
  for (let i = mid2, len = s.length; i < len; i++) {
    if (arr[arr.length - 1].toLocaleLowerCase() !== s[i].toLocaleLowerCase())
      return false
    arr.pop()
  }
  return true
}
/**
 * 125.验证回文串（双指针）
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.replace(
    /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,
    ''
  )
  for (let i = 0, len = s.length; i < len; i++) {
    if (i <= len - i - 1) {
      if (s[i].toLocaleLowerCase() !== s[len - i - 1].toLocaleLowerCase())
        return false
    } else {
      break
    }
  }
  return true
}
/**
 * 394. 字符串解码（栈）
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let stack = []
  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] !== ']') {
      stack.push(s[i])
    } else {
      let j = stack.length - 1,
        n = '',
        str = '',
        reg = /[0-9]/
      while (stack[j] !== '[') {
        str = stack.pop() + str
        j--
      }
      stack.pop()
      j--
      while (j >= 0 && reg.test(stack[j])) {
        n = stack.pop() + n
        j--
      }
      let temp = ''
      for (let i = 0; i < +n; i++) {
        temp += str
      }
      stack.push(...temp)
    }
  }
  return stack.join('')
}
/**
 * 862. 和至少为 K 的最短子数组
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var shortestSubarray = function (A, K) {
  const N = A.length
  const pre = new Array(N + 1)
  pre[0] = 0
  for (let i = 0; i < N; i++) pre[i + 1] = pre[i] + A[i]
  const deque = []
  let ans = N + 1
  for (let i = 0; i <= N; i++) {
    while (deque.length && pre[deque[deque.length - 1]] >= pre[i]) deque.pop()
    while (deque.length && pre[i] - pre[deque[0]] >= K) {
      ans = Math.min(ans, i - deque[0])
      deque.shift()
    }
    deque.push(i)
  }
  return ans > N ? -1 : ans
}
/**
 * 921. 使括号有效的最少添加
 * @param {string} S
 * @return {number}
 */
var minAddToMakeValid = function (S) {
  const stack = []
  for (let i = 0, len = S.length; i < len; i++) {
    if (stack[stack.length - 1] === '(' && S[i] === ')') {
      stack.pop()
    } else {
      stack.push(S[i])
    }
  }
  return stack.length
}
/**
 * 1249. 移除无效的括号
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  let ans = ''
  const stack = []
  let l = 0,
    r = 0
  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] === '(') {
      l++
    } else if (s[i] === ')') {
      if (l === r) continue
      r++
    }
    stack.push(s[i])
  }
  l = 0
  r = 0
  for (let i = stack.length - 1; i >= 0; i--) {
    if (stack[i] === ')') {
      r++
    } else if (stack[i] === '(') {
      if (l === r) continue
      l++
    }
    ans += stack[i]
  }
  return [...ans].reverse().join('')
}
/**
 * 155. 最小栈
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = []
  this.minStack = []
}

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x)
  if (!this.minStack.length || this.minStack[this.minStack.length - 1] >= x)
    this.minStack.push(x)
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const temp = this.stack.pop()
  if (this.minStack[this.minStack.length - 1] === temp) this.minStack.pop()
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1]
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1]
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
/**
 * 316. 去除重复字母（单调栈）
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  const visited = new Map()
  const stack = []
  const cnts = new Array(26)
  cnts.fill(0)
  for (let i = 0, len = s.length; i < len; i++) {
    cnts[s[i].charCodeAt() - 97]++
  }
  for (let i = 0, len = s.length; i < len; i++) {
    while (
      stack.length &&
      !visited.has(s[i]) &&
      stack[stack.length - 1].charCodeAt() > s[i].charCodeAt() &&
      cnts[stack[stack.length - 1].charCodeAt() - 97] > 0
    ) {
      const temp = stack.pop()
      visited.delete(temp)
    }
    cnts[s[i].charCodeAt() - 97]--
    if (!visited.has(s[i])) {
      stack.push(s[i])
      visited.set(s[i], true)
    }
  }
  return stack.join('')
}
