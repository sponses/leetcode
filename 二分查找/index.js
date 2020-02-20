/**
 * 704. 二分查找（二分法）
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    if (left === right) return nums[left] === target ? left : -1
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === target) return mid
    if (nums[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}
/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置（二分查找）
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    if (left === right) return nums[left] === target ? [left, left] : [-1, -1]
    let mid = left + Math.floor((right - left) / 2)
    if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] === target) {
      let temp1 = mid,
        temp2 = mid
      while (nums[temp1 - 1] === target) temp1--
      while (nums[temp2 + 1] === target) temp2++
      return [temp1, temp2]
    } else {
      right = mid - 1
    }
  }
  return [-1, -1]
}
/**
 * 69. x 的平方根（二分法）
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  let left = 1,
    right = x
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2)
    if (mid * mid <= x && (mid + 1) * (mid + 1) > x) return mid
    if (mid * mid > x) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return 0
}
