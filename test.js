/**
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function(d, f, target) {
  const dp = new Array(d + 1)
  for (let i = 0; i <= d; i++) {
    dp[i] = new Array(target + 1)
    dp[i].fill(0)
  }
  dp[0][0] = 1
  for (let i = 1; i <= d; i++) {
    for (let j = 1; j <= target; j++) {
      let res = 0
      for (let k = 1; k <= f; k++) {
        res += dp[i - 1][j - k] ? dp[i - 1][j - k] % 1000000007 : 0
      }
    }
  }
  return dp[d][target]
}
numRollsToTarget(2, 6, 7)
