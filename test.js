var isNumber = function(s) {
  if (s.length === 0) return false
  let len = s.length
  let i = 0
  while (s[len - 1] === ' ' && len > 0) len--
  while (s[i] === ' ' && i < len) i++
  if (s[i] === '-' || (s[i] === '+' && i < len)) i++
  if (i === len) return false
  let e = true,
    point = true
  for (let n = i; n < len; n++) {
    const cur = s[n]
    if ((n === i || n === len - 1) && cur === 'e') return false
    if ((cur === '+' || cur === '-') && s[n - 1] !== 'e') return false
    if (cur === 'e' && e) {
      e = false
      point = false
    } else if (cur === '.' && point) {
      point = false
    } else if (Number.isNaN(+cur) || cur === ' ') {
      return false
    }
  }
  return true
}
isNumber('   1e-2323')
