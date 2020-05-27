/**
 * 76. 最小覆盖子串（滑动窗口）
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
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
var findAnagrams = function (s, p) {
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

var lengthOfLongestSubstringTwoDistinct = function (s) {
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

var lengthOfLongestSubstringKDistinct = function (s, k) {
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
var checkInclusion = function (s1, s2) {
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
var findMaxConsecutiveOnes = function (nums) {
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
var lengthOfLongestSubstring = function (s) {
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
/**
 * 209. 长度最小的子数组（滑动窗口）
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
  let left = 0,
    right = 0,
    res = Number.MAX_SAFE_INTEGER,
    sum = 0,
    count = 0
  while (right < nums.length) {
    sum += nums[right]
    count += nums[right]
    // left 移动的条件为 count 大于等于 s , 并且 right 大于等于 left
    while (right >= left && count >= s) {
      res = Math.min(res, right - left + 1)
      count -= nums[left]
      left++
    }
    right++
  }
  if (sum < s) return 0
  return res
}
/**
 * 992. K 个不同整数的子数组
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var subarraysWithKDistinct = function (A, K) {
  let ans = 0,
    l1 = 0,
    l2 = 0,
    r = 0,
    hash_l1 = {},
    hash_l2 = {},
    cnt_l1 = 0,
    cnt_l2 = 0
  for (let i = 0, len = A.length; i < len; i++) {
    hash_l1[A[i]] = 0
    hash_l2[A[i]] = 0
  }
  while (r < A.length) {
    hash_l1[A[r]]++
    hash_l2[A[r]]++
    if (hash_l1[A[r]] === 1) cnt_l1++
    if (hash_l2[A[r]] === 1) cnt_l2++
    while (cnt_l1 > K) {
      if (hash_l1[A[l1]] === 1) cnt_l1--
      hash_l1[A[l1++]]--
    }
    while (cnt_l2 >= K) {
      if (hash_l2[A[l2]] === 1) cnt_l2--
      hash_l2[A[l2++]]--
    }
    ans += l2 - l1
    r++
  }
  return ans
}
