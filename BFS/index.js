/**
 * 127. 单词接龙
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  if (beginWord === endWord) return 1
  if (wordList.indexOf(endWord) === -1) return 0
  const visited = { [beginWord]: 1, [endWord]: 1 }
  let q1 = [beginWord],
    q2 = [endWord]
  let ans = 1
  function canChange(word1, word2) {
    let ans = word1.length
    for (let i = 0, len = word1.length; i < len; i++) {
      if (word1[i] === word2[i]) ans--
    }
    return ans === 1
  }
  while (q1.length && q2.length) {
    if (q1.length > q2.length) {
      const temp = q1
      q1 = q2
      q2 = temp
    }
    const q3 = []
    for (let i = 0, len1 = q1.length; i < len1; i++) {
      for (let j = 0, len2 = wordList.length; j < len2; j++) {
        if (canChange(q1[i], wordList[j])) {
          if (q2.indexOf(wordList[j]) !== -1) return ans + 1
          if (!visited.hasOwnProperty(wordList[j])) {
            q3.push(wordList[j])
            visited[wordList[j]] = 1
          }
        }
      }
    }
    ans++
    q1 = q3
  }
  return 0
}
/**
 * 752. 打开转盘锁
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  const deadHash = {}
  for (let i = 0, len = deadends.length; i < len; i++) deadHash[deadends[i]] = 1
  if (deadHash['0000']) return -1
  if ('0000' === target) return 0
  deadHash['0000'] = 1
  function getNeighbors(str) {
    const ans = []
    for (let i = 0; i < 4; i++) {
      const a = str[i] == 0 ? 9 : +str[i] - 1
      const b = str[i] == 9 ? 0 : +str[i] + 1
      ans.push(
        str.slice(0, i) + a + str.slice(i + 1),
        str.slice(0, i) + b + str.slice(i + 1)
      )
    }
    return ans
  }
  let ans = 0
  let q1 = ['0000'],
    q2 = [target]
  while (q1.length && q2.length) {
    if (q1.length > q2.length) {
      const temp = q2
      q2 = q1
      q1 = temp
    }
    const q3 = []
    for (let i = 0, len = q1.length; i < len; i++) {
      const cur = getNeighbors(q1[i])
      for (let j = 0, len = cur.length; j < len; j++) {
        if (q2.indexOf(cur[j]) !== -1) return ans + 1
        if (!deadHash[cur[j]]) {
          deadHash[cur[j]] = 1
          q3.push(cur[j])
        }
      }
    }
    ans++
    q1 = q3
  }
  return -1
}
