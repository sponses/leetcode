/**
 * 76. 最小覆盖子串（滑动窗口）
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  let left = 0,
    right = 0,
    match = 0,
    res = '',
    count = Number.MAX_SAFE_INTEGER
  const needs = {},
    window = {}

  for (let i = 0, len = t.length; i < len; i++) {
    let char = t[i]
    if (needs.hasOwnProperty(char)) {
      needs[char]++
    } else {
      needs[char] = 1
    }
  }

  while (right < s.length) {
    let char = s[right]
    if (needs.hasOwnProperty(char)) {
      if (window.hasOwnProperty(char)) {
        window[char]++
      } else {
        window[char] = 1
      }

      if (needs[char] === window[char]) {
        match++
      }
    }

    while (match === Object.keys(needs).length) {
      if (count > right - left) {
        res = s.slice(left, right + 1)
        count = right - left + 1
      }
      let char = s[left]
      if (needs.hasOwnProperty(char)) {
        window[char]--
        if (window[char] < needs[char]) {
          match--
        }
      }
      left++
    }
    right++
  }
  return res
}
/**
 * 438. 找到字符串中所有字母异位词（滑动窗口）
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  let left = 0,
    right = 0,
    match = 0,
    res = []
  const needs = {},
    window = {}

  for (let i = 0, len = p.length; i < len; i++) {
    let char = p[i]
    if (needs.hasOwnProperty(char)) {
      needs[char]++
    } else {
      needs[char] = 1
    }
  }

  while (right < s.length) {
    let char = s[right]
    if (needs.hasOwnProperty(char)) {
      if (window.hasOwnProperty(char)) {
        window[char]++
      } else {
        window[char] = 1
      }

      if (needs[char] === window[char]) {
        match++
      }
    }

    while (match === Object.keys(needs).length) {
      if (p.length - 1 === right - left) {
        res.push(left)
      }
      let char = s[left]
      if (needs.hasOwnProperty(char)) {
        window[char]--
        if (window[char] < needs[char]) {
          match--
        }
      }
      left++
    }
    right++
  }
  return res
}
/**
 * 159. 至多包含两个不同字符的最长子串（滑动窗口）
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstringTwoDistinct = function(s) {
  let left = 0,
    right = 0,
    res = Number.MIN_SAFE_INTEGER
  const window = {}

  while (right < s.length) {
    let char = s[right]
    if (window.hasOwnProperty(char)) {
      window[char]++
    } else {
      window[char] = 1
    }

    while (Object.keys(window).length > 2) {
      let char = s[left]
      if (window[char] === 1) {
        delete window[char]
      } else {
        window[char]--
      }
      left++
    }

    if (Object.keys(window).length === 2) {
      res = Math.max(res, right - left + 1)
    }
    right++
  }
  return res
}
/**
 * 340.至多包含 K 个不同字符的最长子串 （滑动窗口）
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

var lengthOfLongestSubstringKDistinct = function(s, k) {
  let left = 0,
    right = 0,
    res = Number.MIN_SAFE_INTEGER
  const window = {}

  while (right < s.length) {
    let char = s[right]
    if (window.hasOwnProperty(char)) {
      window[char]++
    } else {
      window[char] = 1
    }

    while (Object.keys(window).length > k) {
      let char = s[left]
      if (window[char] === 1) {
        delete window[char]
      } else {
        window[char]--
      }
      left++
    }

    if (Object.keys(window).length === k) {
      res = Math.max(res, right - left + 1)
    }
    right++
  }
  return res
}
/**
 * 567. 字符串的排列（滑动窗口）
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  let left = 0,
    right = 0,
    match = 0
  const needs = {},
    window = {}
  for (let i = 0, len = s1.length; i < len; i++) {
    needs[s1[i]] = needs.hasOwnProperty(s1[i]) ? needs[s1[i]] + 1 : 1
  }
  while (right < s2.length) {
    let char = s2[right]
    if (needs.hasOwnProperty(char)) {
      window[char] = window.hasOwnProperty(char) ? window[char] + 1 : 1
      if (window[char] === needs[char]) {
        match++
      }
    }
    while (right - left > s1.length - 1) {
      let char = s2[left]
      if (needs.hasOwnProperty(char)) {
        if (window[char] === needs[char]) {
          match--
        }
        if (window[char] === 1) {
          delete window[char]
        } else {
          window[char]--
        }
      }
      left++
    }
    if (match === Object.keys(needs).length) {
      return true
    }
    right++
  }
  return false
}
/**
 * 485. 最大连续1的个数（滑动窗口）
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
  let left = 0,
    right = 0,
    res = 0,
    count = 0
  while (right < nums.length) {
    let n = nums[right]
    if (n === 0) {
      left = right = right + 1
      count = 0
      continue
    } else {
      count++
      res = Math.max(res, count)
    }
    right++
  }
  return res
}
/**
 * 3. 无重复字符的最长子串（滑动窗口）
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let res = 0,
    left = 0,
    right = 0
  const hash = {}
  while (right < s.length) {
    let char = s[right]
    while (hash.hasOwnProperty(char)) {
      delete hash[s[left]]
      left++
    }
    hash[char] = 1
    res = Math.max(res, right - left + 1)
    right++
  }
  return res
}
