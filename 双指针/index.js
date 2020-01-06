/**
 * 344.反转字符串
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  if (s.length < 2) return s
  for (let i = 0, len = s.length; i < len; i++) {
    ;[s[i], s[len - i - 1]] = [s[len - i - 1], s[i]]
    if (i >= Math.floor(len / 2) - 1) return
  }
}
/**
 * 977. 有序数组的平方
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
  let j = 0,
    len = A.length
  while (A[j] < 0) {
    j++
  }
  let i = j - 1,
    result = []

  while (i >= 0 && j < len) {
    if (Math.pow(A[i], 2) > Math.pow(A[j], 2)) {
      result.push(Math.pow(A[j], 2))
      j++
    } else {
      result.push(Math.pow(A[i], 2))
      i--
    }
  }

  while (i >= 0) {
    result.push(Math.pow(A[i], 2))
    i--
  }
  while (j < len) {
    result.push(Math.pow(A[j], 2))
    j++
  }
  return result
}
