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
/**
 * 27. 移除元素
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let i = 0,
    j = nums.length - 1 - i
  while (i <= j) {
    if (nums[i] === val) {
      nums.splice(i, 1)
    } else {
      i++
    }
    if (nums[j] === val) {
      nums.splice(j, 1)
    }
    j--
  }
  return nums.length
}
/**
 * 561. 数组拆分 I
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function(nums) {
  nums.sort((a, b) => a - b)
  let res = 0
  for (let i = 0, len = nums.length; i < len; i += 2) {
    res += nums[i]
  }
  return res
}
