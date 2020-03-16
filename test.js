var longestCommonPrefix = function(strs) {
  let ans = ''
  if (strs.length === 0) return ans
  if (strs.length === 1) return strs[0]
  const len = strs.length,
    firstL = strs[0].length
  for (let i = 0; i < firstL; i++) {
    let temp = strs[0].slice(0, i + 1)
    let j
    for (j = 1; j < len; j++) {
      if (temp !== strs[j].slice(0, i + 1)) break
    }
    if (j === len - 1) {
      ans = temp
    } else {
      break
    }
  }
  return ans
}
longestCommonPrefix(['flower', 'flow', 'flight'])
