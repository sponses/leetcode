/**
 * 344.反转字符串
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  if (s.length < 2) return s
  for (let i = 0, len = s.length; i < len; i++) {
    ;[s[i], s[len - i - 1]] = [s[len - i - 1], s[i]]
    if (i >= Math.floor(len / 2) - 1) return
  }
}
