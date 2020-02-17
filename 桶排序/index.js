/**
 * 41. 缺失的第一个正数（桶排序+抽屉原理）
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  for (let i = 0, len = nums.length; i < len; i++) {
    let cur = nums[i]
    while (cur <= len && cur - 1 !== i && cur > 0 && nums[cur - 1] !== cur) {
      ;[nums[i], nums[cur - 1]] = [nums[cur - 1], nums[i]]
      cur = nums[i]
    }
  }
  for (let i = 0, len = nums.length; i < len; i++) {
    if (i !== nums[i] - 1) return i + 1
  }
  return nums.length + 1
}
