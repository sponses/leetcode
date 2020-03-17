var largestNumber = function(nums) {
  const used = [],
    len = nums.length
  let ans = ''
  while (used.length < len) {
    let temp = -1
    for (let i = 0; i < len; i++) {
      if (used.indexOf(i) === -1) {
        if (temp === -1) {
          temp = i
        } else {
          let t = nums[temp],
            cur = nums[i]
          if (t[0] < cur[0]) {
            temp = i
          } else if (t[0] === cur[0]) {
            if (t + cur < cur + t) temp = i
          }
        }
      }
    }
    used.push(temp)
    ans += nums[temp]
  }
  return ans
}
largestNumber([3, 30, 34, 5, 9])
