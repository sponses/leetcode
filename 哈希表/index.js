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
