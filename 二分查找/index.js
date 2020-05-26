/**
 * 704. 二分查找（二分法）
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
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
var searchRange = function (nums, target) {
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
var mySqrt = function (x) {
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
/**
 * 74. 搜索二维矩阵（二分法）
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let left = 0,
    right = matrix.length - 1
  while (left <= right) {
    if (left === right) {
      let l = 0,
        r = matrix[0].length - 1
      while (l <= r) {
        let mid = l + Math.floor((r - l) / 2)
        if (matrix[left][mid] === target) return true
        if (matrix[left][mid] > target) {
          r = mid - 1
        } else {
          l = mid + 1
        }
      }
      return false
    }
    let mid = left + Math.floor((right - left) / 2)
    if (
      matrix[mid][0] <= target &&
      matrix[mid][matrix[0].length - 1] >= target
    ) {
      left = right = mid
    } else if (matrix[mid][0] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return false
}
/**
 * 240. 搜索二维矩阵 II
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const h = matrix.length
  if (!h) return false
  const w = matrix[0].length
  let i = h - 1,
    j = 0
  while (i >= 0 && j < w) {
    if (matrix[i][j] === target) return true
    if (matrix[i][j] < target) {
      j++
    } else {
      i--
    }
  }
  return false
}
/**
 * 33. 搜索旋转排序数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let l = 0,
    r = nums.length - 1
  while (l <= r) {
    const m = l + ((r - l) >> 1)
    if (nums[m] === target) return m
    const temp =
      (nums[0] < nums[m] && target >= nums[0] && target < nums[m]) ||
      (nums[0] > nums[m] && (target < nums[m] || target >= nums[0]))
    if (temp) {
      r = m - 1
    } else {
      l = m + 1
    }
  }
  return -1
}
/**
 * 540. 有序数组中的单一元素
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  let l = 0,
    r = nums.length - 1
  while (l <= r) {
    let m = l + ((r - l) >> 1)
    if (nums[m] !== nums[m + 1] && nums[m] !== nums[m - 1]) return nums[m]
    if (nums[m] === nums[m - 1]) m = m - 1
    const len_l = m - l,
      len_r = r - m - 1
    if (len_l % 2 === 0) {
      l = m + 2
    } else {
      r = m - 1
    }
  }
}
/**
 * 719. 找出第 k 小的距离对
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function (nums, k) {
  nums.sort((a, b) => a - b)
  let l = 0,
    r = nums[nums.length - 1] - nums[0]
  while (l < r) {
    const m = (r + l) >> 1
    let cnt = 0,
      left = 0
    for (let right = 0, len = nums.length; right < len; right++) {
      while (nums[right] - nums[left] > m) left++
      cnt += right - left
    }
    if (cnt >= k) {
      r = m
    } else {
      l = m + 1
    }
  }
  return l
}
