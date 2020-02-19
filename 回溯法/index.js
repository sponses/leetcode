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
