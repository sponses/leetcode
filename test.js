var permutation = function(s) {
  const ans = []
  s = s
    .split('')
    .sort((a, b) => a.charCodeAt() - b.charCodeAt())
    .join('')
  function backtrack(has, rest) {
    if (rest.length === 0) ans.push(has)
    for (let i = 0, len = rest.length; i < len; i++) {
      if (rest[i] === rest[i + 1]) continue
      backtrack(has + rest[i], rest.slice(0, i) + rest.slice(i + 1))
    }
  }
  backtrack('', s)
  return ans
}
permutation('aabbadkwkee')
