/**
 * 581.最短无序连续子数组
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
  let arr = [...nums].sort((a, b) => a - b)
  let start = nums.length,
    end = 0,
    count = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== arr[i]) {
      start = Math.min(start, i)
      end = Math.max(end, i)
    } else {
      count++
    }
  }
  return count === nums.length ? 0 : end - start + 1
}
