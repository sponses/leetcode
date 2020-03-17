var numDecodings = function(s) {
  if (s[0] === 0) return 0
  let prev1 = 1,
    prev2 = 1
  const len = s.length
  for (let i = 1; i < len; i++) {
    let temp = 0
    if (s[i] === 0 && (s[i - 1] === 0 || s[i - 1] > 2)) return 0
    if (s[i] === 0) {
      temp = prev1
    } else if (s[i - 1] === 0 || +(s[i - 1] + s[i]) > 26) {
      temp = prev2
    } else {
      temp = prev1 + prev2
    }
    prev1 = prev2
    prev2 = temp
  }
  return prev2
}
numDecodings('2260')
