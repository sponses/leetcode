/**
 * 997. 找到小镇的法官（图）
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(N, trust) {
  let deGeree = new Array(N)
  deGeree.fill(0)
  for (let i = 0, len = trust.length; i < len; i++) {
    deGeree[trust[i][0] - 1]++
  }
  for (let i = 0; i < N; i++) {
    if (deGeree[i] === 0) {
      let count = N - 1,
        cur = i + 1
      for (let j = 0, len = trust.length; j < len; j++) {
        if (trust[j][1] == cur) count--
      }
      if (count === 0) return cur
    }
  }
  return -1
}
