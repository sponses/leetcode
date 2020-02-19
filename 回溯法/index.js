/**
 * 78. 子集（枚举）
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let res = [[]]
  for (let i = 0, len = nums.length; i < len; i++) {
    let count = res.length
    while (count) {
      let temp = [...res[count - 1]]
      temp.push(nums[i])
      res.push(temp)
      count--
    }
  }
  return res
}
