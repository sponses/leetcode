/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
  let ans = '1'
  for (let i = 2; i <= n; i++) {
    let temp = ''
    for (let j = 0, len = ans.length; i < len; i++) {
      let cur = ans[j],
        count = 1
      while (cur === ans[j + 1]) {
        count++
        j++
      }
      temp += count + cur
    }
    ans = temp
  }
  return ans
}
countAndSay(4)
