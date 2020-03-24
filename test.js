var translateNum = function(num) {
  num += ''
  const len = num.length,
    dp = new Array(len + 1)
  dp[0] = 1
  dp[1] = 1
  for (let i = 1; i < len; i++) {
    if (+(num[i - 1] + num[i]) > 25 || num[i - 1] == '0') {
      dp[i + 1] = dp[i]
    } else {
      dp[i + 1] = dp[i] + dp[i - 1]
    }
  }
  return dp[len]
}
translateNum(40184034802)
