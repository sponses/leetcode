/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const lenS = s.length,
    lenP = p.length
  const dp = new Array(lenS + 1)
  for (let i = 0; i <= lenS; i++) {
    dp[i] = new Array(lenP + 1)
    dp[i].fill(false)
  }
  dp[lenS][lenP] = true
  for (let i = lenP - 1; i >= 0; i--) {
    dp[lenS][i] = dp[lenS][i] && p[i] === '*'
  }
  for (let i = lenS - 1; i >= 0; i--) {
    for (let j = lenP - 1; j >= 0; j--) {
      const charS = s[i],
        charP = p[j]
      if (charS === charP || charP === '?') {
        dp[i][j] = dp[i + 1][j + 1]
      } else if (charP === '*') {
        for (let n = 0; n <= lenS - i; n++) {
          dp[i][j] = dp[i][j] || dp[i + n][j + 1]
        }
      }
    }
  }
  return dp[0][0]
}
isMatch('', '*')
