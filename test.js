var numDecodings = function(s) {
  if (!s.length) return 0
  if (s[0] == 0) return 0
  let prev1 = 1,
    prev2 = 1
  for (let i = 1, len = s.length; i < len; i++) {
    let temp
    if (s[i] == 0) {
      temp = s[i - 1] == 0 || s[i - 1] > 2 ? 0 : prev1
    } else if (s[i - 1] == 0) {
      temp = prev2
    } else if (+(s[i - 1] + s[i]) > 26) {
      temp = prev1
    } else {
      temp = prev1 + prev2
    }
    prev1 = prev2
    prev2 = temp
  }
  return prev2
}
numDecodings('178')
