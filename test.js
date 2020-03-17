var longestSubstring = function(s, k) {
  const queue = [s]
  let ans = 0
  while (queue.length) {
    const cur = queue.pop(),
      hash = {}
    for (let i = 0, len = cur.length; i < len; i++) {
      if (hash.hasOwnProperty(cur[i])) {
        hash[cur[i]]++
      } else {
        hash[cur[i]] = 0
      }
    }
    let i = 0,
      prev = 0
    for (i = 0, len = cur.length; i < len; i++) {
      if (hash[cur[i]] < k) {
        queue.push(cur.slice(prev, i))
        prev = i + 1
      }
    }
    if (prev === 0) ans = Math.max(ans, cur.length)
  }
  return ans
}
longestSubstring('aaabb', 3)
