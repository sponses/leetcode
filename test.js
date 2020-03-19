/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  // function dp(i,j){
  //     if(i < 0 && j < 0) return true
  //     if(j < 0) return false
  //     if(i < 0){
  //         while(p[j] === '*') j -= 2
  //         return j < 0
  //     }
  //     const charS = s[i], charP = p[j]
  //     if(charS === charP || charP === '.'){
  //         return dp(i-1,j-1)
  //     }else if(charP === '*'){
  //         if(p[j-1] !== charS && p[j-1] !== '.') return dp(i,j-2)
  //         return dp(i,j-2) || dp(i-1,j-2) || dp(i-1,j)
  //     }else {
  //         return false
  //     }
  // }
  // return dp(s.length-1,p.length-1)
  const lenS = s.length,
    lenP = p.length
  const dp = new Array(lenS)
  for (let i = 0; i < lenS; i++) {
    dp[i] = new Array(lenP)
    dp[i].fill(false)
  }
  for (let i = 0; i < lenS; i++) {
    for (let j = 0; j < lenP; j++) {
      const charS = s[i],
        charP = p[j]
      if (i === 0 && j === 0) {
        dp[i][j] = charS === charP || charP === '.'
        continue
      }
      if (charP === charS || charP === '.') {
        dp[i][j] = dp[i - 1][j - 1]
      } else if (charP === '*') {
        if (p[j - 1] !== charS && p[j - 1] !== '.') {
          dp[i][j] = j < 2 || dp[i][j - 2]
        } else {
          dp[i][j] = j < 2 || dp[i - 1][j - 2] || dp[i][j - 2] || dp[i - 1][j]
        }
      } else {
        dp[i][j] = false
      }
    }
  }
  return dp[lenS - 1][lenP - 1]
}
isMatch('aa', 'a')
