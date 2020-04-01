/**
 * 217. 存在重复元素
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  let obj = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (obj.hasOwnProperty(nums[i])) {
      return true
    }
    obj[nums[i]] = true
  }
  return false
}
/**
 * 219. 存在重复元素Ⅱ
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
  let obj = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (obj.hasOwnProperty(nums[i])) {
      if (Math.abs(i - obj[nums[i]]) <= k) return true
    }
    obj[nums[i]] = i
  }
  return false
}
/**
 * 220. 存在重复元素Ⅲ
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
  for (let i = 0, len = nums.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (j - i <= k && Math.abs(nums[i] - nums[j]) <= t) return true
    }
  }
  return false
}
/**
 * 525.连续数组（两层for）
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
  let result = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    let zero = 0,
      one = 0
    for (let j = i; j < len; j++) {
      if (nums[j] === 0) {
        zero++
      } else {
        one++
      }
      if (zero === one) {
        result = Math.max(result, zero + one)
      }
    }
  }
  return result
}
/**
 * 409. 最长回文串
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
  let obj = {}
  for (let i = 0, len = s.length; i < len; i++) {
    if (!obj.hasOwnProperty(s[i])) {
      obj[s[i]] = 1
      continue
    }
    obj[s[i]]++
  }
  let keys = Object.keys(obj),
    count = 0,
    res = 0
  for (let i = 0, len = keys.length; i < len; i++) {
    if (obj[keys[i]] % 2 === 0) {
      res += obj[keys[i]]
      continue
    }
    if (!count) {
      res += obj[keys[i]]
      count++
      continue
    }
    res += obj[keys[i]] - 1
  }
  return res
}
/**
 * 1. 两数之和（哈希表）
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
  let hash = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (hash.hasOwnProperty(target - nums[i]))
      return [hash[target - nums[i]], i]
    hash[nums[i]] = i
  }
}
/**
 * 290. 单词规律
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function(pattern, str) {
  const hashP = {},
    hashS = {}
  str = str.split(' ')
  if (pattern.length !== str.length) return false
  for (let i = 0, len = pattern.length; i < len; i++) {
    const p = pattern[i],
      s = str[i]
    if (hashP.hasOwnProperty(p)) {
      if (hashP[p] !== s) return false
    } else {
      if (hashS.hasOwnProperty(s)) return false
      hashP[p] = s
      hashS[s] = p
    }
  }
  return true
}
/**
 * 692. 前K个高频单词
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
  const hash = {},
    ans = []
  for (let i = 0, len = words.length; i < len; i++) {
    const cur = words[i]
    if (hash.hasOwnProperty(cur)) {
      hash[cur]++
    } else {
      hash[cur] = 1
      ans.push(cur)
    }
  }
  function compare(a, b) {
    let i = 0,
      j = 0
    while (i < a.length && j < b.length && a[i] === b[j]) {
      i++
      j++
    }
    if (i === a.length) return -1
    if (j === b.length) return 1
    return a[i].charCodeAt() - b[j].charCodeAt()
  }
  ans.sort((a, b) => {
    return hash[b] - hash[a] || compare(a, b)
  })
  return ans.slice(0, k)
}
