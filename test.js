var tallestBillboard = function(rods) {
  const len = rods.length
  let sum = 0
  for (let i = 0; i < len; i++) sum += rods[i]
  const half = sum >> 1
  const dp = new Array(half + 1)
  dp.fill(false)
  dp[0] = true
  for (let i = 0; i < len; i++) {
    for (let j = half; j >= rods[i]; j--) {
      if (
        (dp[j - rods[i]] === '#' || dp[j - rods[i]] === true) &&
        dp[j] === '#'
      ) {
        dp[j] = true
      } else {
        dp[j] = dp[j - rods[i]] ? '#' : dp[j]
      }
    }
  }
  for (let i = half; i >= 0; i--) if (dp[i] === true) return i
}
tallestBillboard([1, 2, 3, 4, 5, 6])
