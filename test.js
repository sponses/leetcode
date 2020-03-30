var minCostToMoveChips = function(chips) {
  let ans = Number.MAX_SAFE_INTEGER
  const len = chips.length
  function dp(target, i, temp) {
    if (i === len) return 0
    temp += Math.abs(chips[i] - target) % 2
    return temp + dp(target, i + 1, temp)
  }
  for (let i = 0, len = chips.length; i < len; i++) {
    ans = Math.min(dp(chips[i], 0, 0), ans)
  }
  return ans
}
minCostToMoveChips([1, 2, 3])
