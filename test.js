var calculate = function(s) {
  let stack = []
  for (let i = 0, len = s.length; i < len; i++) {
    if (s[i] === ' ') continue
    let cur = ''
    if (s[i] === '+' || s[i] === '-') {
      cur = s[i]
    } else if (s[i] === '*' || s[i] === '/') {
      let symb = s[i]
      let prev = stack.pop()
      let next = ''
      while (s[i + 1] === ' ' && i < s.length) i++
      while (!Number.isNaN(+s[i + 1]) && s[i + 1] !== ' ' && i < s.length) {
        next += s[++i]
      }
      cur = symb === '*' ? prev * +next : Math.floor(prev / +next)
    } else {
      cur += s[i]
      while (!Number.isNaN(+s[i + 1]) && s[i + 1] !== ' ' && i < s.length) {
        cur += s[++i]
      }
      cur = +cur
    }
    stack.push(cur)
  }
  let ans = stack[0]
  for (let i = 1, len = stack.length; i < len; i++) {
    if (stack[i] === '+') {
      ans += stack[++i]
    } else {
      ans -= stack[++i]
    }
  }
  return ans
}
calculate(' 3+544 / 2 ')
