var minArray = function(numbers) {
  let l = 0,
    r = numbers.length - 1
  while (l < r) {
    let m = (l + r) >> 1
    let countL = 0,
      countR = 0
    for (let i = l; i <= m; i++) if (numbers[i] <= numbers[m]) countL++
    for (let i = m + 1; i <= r; i++) if (numbers[i] <= numbers[r]) countR++
    if (countL === m - l + 1 && countR === r - m) {
      return numbers[l] >= numbers[r] ? numbers[m + 1] : numbers[l]
    }
    if (countL < m - l + 1) {
      r = m
    } else {
      l = m + 1
    }
  }
}
minArray([10, 1, 10, 10, 10])
