var cuttingRope = function(n) {
  const dp = new Array(n + 1)
  dp.fill(0)
  dp[1] = 1
  dp[2] = 1
  dp[3] = 2
  for (let i = 4; i <= n; i++) {
    let temp = 0
    let l = 1
    while (l <= i << 1) {
      const r = i - l
      temp = Math.max(dp[l], l) * Math.max(dp[r], r)
      dp[i] = Math.max(temp, dp[i])
      l++
    }
  }
  dp[n]
}
cuttingRope(10)
