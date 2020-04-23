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
