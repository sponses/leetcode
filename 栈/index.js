/**
 * 125.验证回文串（栈）
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
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
var isPalindrome = function(s) {
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
var decodeString = function(s) {
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
var shortestSubarray = function(A, K) {
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
