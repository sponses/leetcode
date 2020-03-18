var missingNumber = function(nums) {
  let l = 0,
    r = nums.length - 1
  while (l <= r) {
    let mid = (l + r) >> 1
    if (nums[mid] == mid) l = mid + 1
    r = mid - 1
  }
  return l
}
missingNumber([0, 1])
