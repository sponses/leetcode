/**
 * 217. 存在重复元素
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  let obj = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (obj.hasOwnProperty(nums[i])) {
      return true
    }
    obj[nums[i]] = true
  }
  return false
}
/**
 * 219. 存在重复元素Ⅱ
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
  let obj = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (obj.hasOwnProperty(nums[i])) {
      if (Math.abs(i - obj[nums[i]]) <= k) return true
    }
    obj[nums[i]] = i
  }
  return false
}
/**
 * 220. 存在重复元素Ⅲ
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
  for (let i = 0, len = nums.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (j - i <= k && Math.abs(nums[i] - nums[j]) <= t) return true
    }
  }
  return false
}
/**
 * 525.连续数组（两层for）
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
  let result = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    let zero = 0,
      one = 0
    for (let j = i; j < len; j++) {
      if (nums[j] === 0) {
        zero++
      } else {
        one++
      }
      if (zero === one) {
        result = Math.max(result, zero + one)
      }
    }
  }
  return result
}
