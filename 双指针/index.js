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
  let left = 0,
    len = numbers.length,
    right = len - 1
  while (left < right) {
    if (numbers[left] + numbers[right] === target) return [left + 1, right + 1]
    if (numbers[left] + numbers[right] > target) {
      right--
    } else {
      left++
    }
  }
  return []
}
/**
 * 15. 三数之和（双指针）
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  if (nums.length < 3) return []
  let len = nums.length,
    p1 = 0,
    p2,
    p3,
    res = []
  nums.sort((a, b) => a - b)
  while (p1 <= len - 3) {
    p2 = p1 + 1
    p3 = len - 1
    while (p2 < p3) {
      if (nums[p1] + nums[p2] + nums[p3] === 0) {
        res.push([nums[p1], nums[p2], nums[p3]])
        while (nums[p2] === nums[p2 + 1] && nums[p3] === nums[p3 - 1]) {
          p2++
          p3--
        }
        p3--
        p2++
      } else if (nums[p1] + nums[p2] + nums[p3] > 0) {
        p3--
      } else {
        p2++
      }
    }
    while (nums[p1] === nums[p1 + 1]) {
      p1++
    }
    p1++
  }
  return res
}
/**
 * 16. 最接近的三数之和（双指针）
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  let temp = Number.MAX_SAFE_INTEGER,
    p1 = 0,
    len = nums.length,
    p2,
    p3,
    res
  if (len < 3) return null
  nums.sort((a, b) => a - b)
  while (p1 <= len - 3) {
    p2 = p1 + 1
    p3 = len - 1
    while (p2 < p3) {
      let diff = target - (nums[p1] + nums[p2] + nums[p3])
      if (temp > Math.abs(diff)) {
        temp = Math.abs(diff)
        res = nums[p1] + nums[p2] + nums[p3]
      }
      if (diff === 0) return res
      if (diff < 0) {
        p3--
      } else {
        p2++
      }
    }
    p1++
  }
  return res
}
/**
 * 18. 四数之和（双指针）
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  let len = nums.length,
    p1 = 0,
    p2,
    p3,
    p4,
    res = []
  if (len < 4) return []
  nums.sort((a, b) => a - b)
  while (p1 <= len - 4) {
    p2 = p1 + 1
    while (p2 <= len - 3) {
      p3 = p2 + 1
      p4 = len - 1
      while (p3 < p4) {
        let sum = nums[p1] + nums[p2] + nums[p3] + nums[p4]
        if (sum === target) {
          res.push([nums[p1], nums[p2], nums[p3], nums[p4]])
          while (nums[p3] === nums[p3 + 1] && nums[p4] === nums[p4 - 1]) {
            p3++
            p4--
          }
          p3++
          p4--
        } else if (sum > target) {
          p4--
        } else {
          p3++
        }
      }
      while (nums[p2] === nums[p2 + 1]) {
        p2++
      }
      p2++
    }
    while (nums[p1] === nums[p1 + 1]) {
      p1++
    }
    p1++
  }
  return res
}
/**
 * 11. 盛最多水的容器（双指针）
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let left = 0,
    len = height.length,
    right = len - 1,
    res = 0
  if (len < 2) return 0
  while (left < right) {
    let s = (right - left) * Math.min(height[left], height[right])
    res = Math.max(res, s)
    if (height[left] > height[right]) {
      right--
    } else {
      left++
    }
  }
  return res
}
