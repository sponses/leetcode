/**
 * 140. 单词拆分 II（暴力解）
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
  let res = [],
    len = s.length
  function dp(i, j, str) {
    if (j === len && i === len) {
      res.push(str)
      return
    }
    for (let n = j; n < len; n++) {
      let temp = s.slice(i, n + 1)
      if (wordDict.indexOf(temp) !== -1) {
        dp(n + 1, n + 1, str + (str === '' ? '' : ' ') + temp)
        dp(i, n + 1, str)
        return
      }
    }
  }
  dp(0, 0, '')
  return res
}
/**
 * 139. 单词拆分（动态规划）
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const len = s.length
  const dp = new Array(len + 1)
  dp.fill(false)
  dp[0] = true
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.indexOf(s.slice(j, i)) !== -1) dp[i] = true
    }
  }
  return dp[len]
}
