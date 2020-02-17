/**
 * 56. 合并区间（排序）
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  let res = [],
    len = intervals.length,
    temp
  if (len < 2) return intervals
  intervals.sort((a, b) => a[0] - b[0])
  temp = intervals[0]
  for (let i = 1; i < len; i++) {
    let cur = intervals[i]
    if (cur[0] > temp[1]) {
      res.push(temp)
      temp = cur
    } else {
      temp[0] = Math.min(temp[0], cur[0])
      temp[1] = Math.max(temp[1], cur[1])
    }
  }
  res.push(temp)
  return res
}
