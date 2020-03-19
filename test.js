var singleNumbers = function(nums) {
  let sum = 0
  for (let i = 0, len = nums.length; i < len; i++) sum ^= nums[i]
  let a = 1
  for (let i = 32; i > 0; i--) {
    if (sum & (a === 0)) a <<= 1
  }
  let ans1 = 0,
    ans2 = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] & (a === 0)) {
      ans1 ^= nums[i]
    } else {
      ans2 ^= nums[i]
    }
  }
  return [ans1, ans2]
}
singleNumbers([4, 1, 4, 6])
