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
/**
 * 26. 删除排序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (!nums.length) return 0
  let i = 0
  for (let j = 1; j < nums.length; j++) {
    if (nums[i] !== nums[j]) {
      i++
      nums[i] = nums[j]
    }
  }
  return i + 1
}
/**
 * 80. 删除排序数组中的重复项 II（双指针）
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let len = nums.length
  if (len < 2) return len
  let i = 1
  for (let j = 2; j < len; j++) {
    if (nums[j] !== nums[i - 1]) {
      i++
      nums[i] = nums[j]
    }
  }
  return i + 1
}
/**
 * 167. 两数之和 II - 输入有序数组（双指针）
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  let front = 0,
    end = numbers.length
  while (front < end) {
    if (numbers[front] + numbers[end] === target) return [front + 1, end + 1]
    if (numbers[front] + numbers[end] < target) {
      front++
    } else {
      end--
    }
  }
  return []
}
