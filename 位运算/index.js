/**
 * 982. 按位与为零的三元组
 * @param {number[]} A
 * @return {number}
 */
var countTriplets = function (A) {
  const len = A.length
  let ans = 0
  const map = new Array(1 << 16)
  map.fill(0)
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      map[A[i] & A[j]]++
    }
  }
  for (let i = 0; i < map.length; i++) {
    if (!map[i]) continue
    for (let j = 0; j < len; j++) {
      if ((i & A[j]) === 0) ans += map[i]
    }
  }
  return ans
}
