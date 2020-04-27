/**
 * 472. 连接词
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  const pre = new Set()
  const ans = []
  words.sort((a, b) => a.length - b.length)
  function dfs(word, start) {
    let temp = ''
    for (let i = start, len = word.length; i < len; i++) {
      temp += word[i]
      if (pre.has(temp) && (pre.has(word.slice(i + 1)) || dfs(word, i + 1))) {
        return true
      }
    }
    return false
  }
  for (let i = 0, len = words.length; i < len; i++) {
    if (dfs(words[i], 0)) {
      ans.push(words[i])
    } else {
      pre.add(words[i])
    }
  }
  return ans
}
/**
 * 1269. 停在原地的方案数
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
var numWays = function (steps, arrLen) {
  const hash = new Map()
  function dp(s, i) {
    if (i < 0 || i >= arrLen || s < 0 || i > s) return 0
    if (s === i) return 1
    const str = s + '-' + i
    if (hash.has(str)) return hash.get(str)
    s--
    let ans =
      (dp(s, i) % 1000000007) +
      (dp(s, i - 1) % 1000000007) +
      (dp(s, i + 1) % 1000000007)
    ans %= 1000000007
    hash.set(str, ans)
    return ans
  }
  return dp(steps, 0)
}
