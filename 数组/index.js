/**
 * 581.最短无序连续子数组
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
  let arr = [...nums].sort((a, b) => a - b)
  let start = nums.length,
    end = 0,
    count = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== arr[i]) {
      start = Math.min(start, i)
      end = Math.max(end, i)
    } else {
      count++
    }
  }
  return count === nums.length ? 0 : end - start + 1
}
/**
 * 914.卡牌分组
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function (deck) {
  if (!deck.length) return false
  function gcd(a, b) {
    if (a % b === 0) return b
    return gcd(b, a % b)
  }
  deck.sort((a, b) => a - b)
  let arr = [],
    count = 0
  for (let i = 0, len = deck.length; i < len; i++) {
    if (deck[i] === deck[i + 1]) {
      count++
    } else {
      count++
      arr.push(count)
      count = 0
    }
  }
  if (Math.min(...arr) === 1) return false
  for (let i = 0, len = arr.length - 1; i < len; i++) {
    if (gcd(arr[i], arr[i + 1]) <= 1) {
      return false
    }
  }
  return true
}
/**
 * 941.有效的山脉数组
 * @param {number[]} A
 * @return {boolean}
 */
var validMountainArray = function (A) {
  const len = A.length
  let i = 0
  while (i < len - 1 && A[i] < A[i + 1]) {
    i++
  }
  if (i === 0 || i === len - 1) return false
  while (i < len - 1 && A[i] > A[i + 1]) {
    i++
  }
  return i === len - 1
}
/**
 * 414.第三大的数
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  let arr = [...new Set(nums)].sort((a, b) => a - b)
  if (arr.length < 3) return Math.max(...arr)
  return arr[arr.length - 3]
}
/**
 * 766. 托普利茨矩阵
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function (matrix) {
  const hash = {}
  for (let i = 0, h = matrix.length; i < h; i++) {
    for (let j = 0, w = matrix[0].length; j < w; j++) {
      if (i === 0 || j === 0) continue
      if (matrix[i][j] !== matrix[i - 1][j - 1]) return false
    }
  }
  return true
}
/**
 * 845. 数组中的最长山脉
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function (A) {
  const len = A.length
  let ans = 0
  let i = 0
  while (i < len - 1) {
    while (i < len - 1 && A[i] >= A[i + 1]) i++
    let x = i
    while (i < len - 1 && A[i] <= A[i + 1]) {
      if (A[i] === A[i + 1]) x = i + 1
      i++
    }
    let y = i
    while (i < len - 1 && A[i] > A[i + 1]) i++
    if (i > y && y > x) {
      ans = Math.max(ans, i - x + 1)
    }
  }
  return ans
}
/**
 * 846. 一手顺子
 * @param {number[]} hand
 * @param {number} W
 * @return {boolean}
 */
var isNStraightHand = function (hand, W) {
  const hash = {}
  for (let i = 0, len = hand.length; i < len; i++) {
    if (hash.hasOwnProperty(hand[i])) {
      hash[hand[i]]++
    } else {
      hash[hand[i]] = 1
    }
  }
  hand.sort((a, b) => a - b)
  for (let i = 0, len = hand.length; i < len; i++) {
    let cur = hand[i]
    if (hash[cur] <= 0) continue
    hash[cur]--
    let cnt = W - 1
    while (cnt) {
      if (!hash[cur + W - cnt] || hash[cur + W - cnt] <= 0) return false
      hash[cur + W - cnt]--
      cnt--
    }
  }
  return true
}
/**
 * 119. 杨辉三角 II
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  if (rowIndex === 0) return [1]
  let prev = [1, 1]
  for (let i = 1; i < rowIndex; i++) {
    let temp = [1]
    for (let i = 0, len = prev.length; i < len - 1; i++) {
      temp.push(prev[i] + prev[i + 1])
    }
    temp.push(1)
    prev = temp
  }
  return prev
}
