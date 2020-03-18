var wordBreak = function(s, wordDict) {
  const len = s.length,
    dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len)
    dp[i].fill(false)
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      let cur = s.slice(i, j + 1)
      if (wordDict.indexOf(cur) !== -1) dp[i][j] = true
    }
  }
}
wordBreak('catsanddog', ['cat', 'cats', 'and', 'sand', 'dog'])
