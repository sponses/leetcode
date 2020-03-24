var translateNum = function(num) {
  num += ''
  function dp(i) {
    if (i <= 0) return 1
    const cur = num[i]
    if (+(num[i - 1] + cur) > 25 || num[i - 1] == 0) return dp(i - 1)
    return dp(i - 1) + dp(i - 2)
  }
  return dp(num.length - 1)
}
translateNum(9418020810)
