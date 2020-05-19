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
/**
 * 1170. 比较字符串最小字母出现频次
 * @param {string[]} queries
 * @param {string[]} words
 * @return {number[]}
 */
var numSmallerByFrequency = function (queries, words) {
  const ans = new Array(queries.length)
  ans.fill(0)
  function getNums(str) {
    const arr = new Array(26)
    arr.fill(0)
    for (let i = 0, len = str.length; i < len; i++) {
      arr[str[i].charCodeAt() - 97]++
    }
    for (let i = 0; i < 26; i++) if (arr[i]) return arr[i]
  }
  const counts = []
  for (let i = 0, len = words.length; i < len; i++) {
    counts.push(getNums(words[i]))
  }
  counts.sort((a, b) => a - b)
  for (let i = 0, len = queries.length; i < len; i++) {
    const cur = getNums(queries[i])
    let j = 0
    while (cur >= counts[j]) j++
    ans[i] = counts.length - j
  }
  return ans
}
/**
 * 1422. 分割字符串的最大得分
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
  const len = s.length
  const prev = new Array(len + 1)
  const post = new Array(len + 1)
  prev[0] = 0
  post[len] = 0
  for (let i = 0; i < len; i++) {
    prev[i + 1] = prev[i]
    if (s[i] === '0') prev[i + 1]++
    post[len - i - 1] = post[len - i]
    if (s[len - i - 1] === '1') post[len - i - 1]++
  }
  let ans = 0
  for (let i = 1; i < len; i++) ans = Math.max(ans, prev[i] + post[i])
  return ans
}
/**
 * 1013. 将数组分成和相等的三个部分
 * @param {number[]} A
 * @return {boolean}
 */
var canThreePartsEqualSum = function (A) {
  let sum = 0
  for (let i = 0, len = A.length; i < len; i++) sum += A[i]
  if (sum % 3 !== 0) return false
  const third = sum / 3
  let cnt = 0
  let temp = 0
  for (let i = 0, len = A.length; i < len; i++) {
    temp += A[i]
    if (temp === third) {
      cnt++
      temp = 0
    }
    if (cnt === 2 && i < len - 1) return true
  }
  return false
}
/**
 * 59. 螺旋矩阵 II
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const ans = new Array(n)
  for (let i = 0; i < n; i++) ans[i] = new Array(n)
  let cnt = 1
  let t = 0,
    b = n - 1,
    l = 0,
    r = n - 1
  while (true) {
    for (let i = l; i <= r; i++) ans[t][i] = cnt++
    if (++t > b) break
    for (let i = t; i <= b; i++) ans[i][r] = cnt++
    if (--r < l) break
    for (let i = r; i >= l; i--) ans[b][i] = cnt++
    if (--b < t) break
    for (let i = b; i >= t; i--) ans[i][l] = cnt++
    if (++l > r) break
  }
  return ans
}
/**
 * 189. 旋转数组
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  k %= nums.length
  function reverse(l, r) {
    while (l < r) {
      ;[nums[l], nums[r]] = [nums[r], nums[l]]
      l++
      r--
    }
  }
  reverse(0, nums.length - 1)
  reverse(0, k - 1)
  reverse(k, nums.length - 1)
}
/**
 * 1103. 分糖果 II
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function (candies, num_people) {
  const ans = new Array(num_people)
  ans.fill(0)
  for (let i = 0; ; ) {
    ans[i++ % num_people] += i > candies ? candies : i
    candies -= i
    if (candies <= 0) break
  }
  return ans
}
