/**
 * 78. 子集（枚举）
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let res = [[]]
  for (let i = 0, len = nums.length; i < len; i++) {
    let count = res.length
    while (count) {
      let temp = [...res[count - 1]]
      temp.push(nums[i])
      res.push(temp)
      count--
    }
  }
  return res
}
/**
 * 17. 电话号码的字母组合（枚举）
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  let hash = {
      2: 'abc',
      3: 'def',
      4: 'ghi',
      5: 'jkl',
      6: 'mno',
      7: 'pqrs',
      8: 'tuv',
      9: 'wxyz'
    },
    res = []
  if (digits <= 1) return res
  res = [...hash[digits[0]]]
  for (let i = 1, len1 = digits.length; i < len1; i++) {
    let count = res.length,
      len = count
    while (count) {
      for (let k = 0, len3 = hash[digits[i]].length; k < len3; k++) {
        res.push(res[count - 1] + hash[digits[i]][k])
      }
      count--
    }
    res.splice(0, len)
  }
  return res
}
/**
 * 17. 电话号码的字母组合（回溯法）
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  let hash = {
      2: 'abc',
      3: 'def',
      4: 'ghi',
      5: 'jkl',
      6: 'mno',
      7: 'pqrs',
      8: 'tuv',
      9: 'wxyz'
    },
    res = []
  if (!digits) return res
  function backtrack(str, digits) {
    if (!digits) {
      res.push(str)
      return
    }
    let cur = hash[digits[0]]
    for (let i = 0, len = cur.length; i < len; i++) {
      backtrack(str + cur[i], digits.slice(1))
    }
  }
  backtrack('', digits)
  return res
}
/**
 * 46. 全排列（全排列）
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let res = []
  function backtrack(has, left) {
    if (has.length === nums.length) {
      res.push(has)
      return
    }
    for (let i = 0, len = left.length; i < len; i++) {
      backtrack(
        [...has, left[i]],
        left.filter(x => x != left[i])
      )
    }
  }
  backtrack([], nums)
  return res
}
/**
 * 78. 子集（回溯法）
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let res = []
  function backtrack(arr, index) {
    res.push(arr)
    for (let i = index, len = nums.length; i < len; i++) {
      backtrack([...arr, nums[i]], i + 1)
    }
  }
  backtrack([], 0)
  return res
}
/**
 * 90. 子集 II（排序+回溯）
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
  let res = []
  nums.sort((a, b) => a - b)
  function backtrack(arr, index) {
    res.push(arr)
    for (let i = index, len = nums.length; i < len; i++) {
      backtrack([...arr, nums[i]], i + 1)
      while (nums[i] === nums[i + 1]) i++
    }
  }
  backtrack([], 0)
  return res
}
/**
 * 784. 字母大小写全排列（回溯法）
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function(S) {
  let res = []
  const reg = new RegExp('[A-Za-z]')
  function backtrack(str, index) {
    if (str.length === S.length) {
      res.push(str)
      return
    }
    for (let i = index, len = S.length; i < len; i++) {
      while (!reg.test(S[i])) {
        str += S[i]
        i++
        if (i >= S.length) {
          str.length === S.length && res.push(str)
          return
        }
      }
      let letter1 = S[i]
      let letter2 =
        letter1.charCodeAt() < 97
          ? letter1.toLocaleLowerCase()
          : letter1.toLocaleUpperCase()
      backtrack(str + letter1, i + 1)
      backtrack(str + letter2, i + 1)
    }
  }
  backtrack('', 0)
  return res
}
/**
 * 77. 组合（回溯法）
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  let res = []
  function backtrack(arr, index) {
    if (arr.length === k) {
      res.push(arr)
      return
    }
    if (index > n) return
    for (let i = index; i <= n; i++) {
      backtrack([...arr, i], i + 1)
    }
  }
  backtrack([], 1)
  return res
}
/**
 * 77. 组合（回溯法剪枝）
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  let res = []
  function backtrack(arr, index) {
    if (arr.length === k) {
      res.push(arr)
      return
    }
    if (index > n) return
    for (let i = index; i <= n - (k - arr.length) + 1; i++) {
      backtrack([...arr, i], i + 1)
    }
  }
  backtrack([], 1)
  return res
}
