/**
 * 140. 单词拆分 II（暴力解）
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function(s, wordDict) {
  let res = [],
    len = s.length
  function dp(i, j, str) {
    if (j === len && i === len) {
      res.push(str)
      return
    }
    for (let n = j; n < len; n++) {
      let temp = s.slice(i, n + 1)
      if (wordDict.indexOf(temp) !== -1) {
        dp(n + 1, n + 1, str + (str === '' ? '' : ' ') + temp)
        dp(i, n + 1, str)
        return
      }
    }
  }
  dp(0, 0, '')
  return res
}
/**
 * 139. 单词拆分（动态规划）
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const len = s.length
  const dp = new Array(len + 1)
  dp.fill(false)
  dp[0] = true
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.indexOf(s.slice(j, i)) !== -1) dp[i] = true
    }
  }
  return dp[len]
}
/**
 * 44. 通配符匹配（暴力解）
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  function dp(i, j) {
    if (i < 0 && j < 0) return true
    if (j < 0) return false
    if (i < 0) {
      while (j >= 0) {
        if (p[j] !== '*') return false
        j--
      }
      return true
    }
    const charS = s[i],
      charP = p[j]
    if (charS === charP || charP === '?') {
      return dp(i - 1, j - 1)
    } else if (charP === '*') {
      let res = false
      for (let n = -1; n <= i; n++) {
        res = res || dp(n, j - 1)
      }
      return res
    } else {
      return false
    }
  }
  return dp(s.length - 1, p.length - 1)
}
/**
 * 98. 验证二叉搜索树（中序遍历）
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  let compare = Number.MIN_SAFE_INTEGER,
    res = true
  function mfs(node) {
    if (!node) return
    mfs(node.left)
    if (compare >= node.val) res = false
    compare = node.val
    mfs(node.right)
  }
  mfs(root)
  return res
}
/**
 * 20. 有效的括号（栈）
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const hash = { ')': '(', '}': '{', ']': '[' }
  let stack = []
  for (let i = 0, len = s.length; i < len; i++) {
    if (hash.hasOwnProperty(s[i]) && stack[stack.length - 1] === hash[s[i]]) {
      stack.pop()
    } else {
      stack.push(s[i])
    }
  }
  return stack.length === 0
}
/**
 * 125. 验证回文串
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  let res = ''
  for (let i = 0, len = s.length; i < len; i++) {
    let cur = s[i]
    if (cur.charCodeAt() >= 65 && cur.charCodeAt() <= 90)
      res += cur.toLocaleLowerCase()
    if (cur.charCodeAt() >= 97 && cur.charCodeAt() <= 122) res += cur
    if (!isNaN(cur) && cur !== ' ') res += cur
  }
  for (
    let i = 0, len = Math.floor(res.length / 2), l = res.length;
    i < len;
    i++
  ) {
    if (res[i] !== res[l - i - 1]) return false
  }
  return true
}
/**
 * 242. 有效的字母异位词（hash表）
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  let hashS = {}
  for (let i = 0, len = s.length; i < len; i++) {
    if (!hashS.hasOwnProperty(s[i])) {
      hashS[s[i]] = 1
    } else {
      hashS[s[i]]++
    }
  }
  let count = 0,
    hashT = {}
  for (let i = 0, len = t.length; i < len; i++) {
    if (!hashT.hasOwnProperty(t[i])) {
      hashT[t[i]] = 1
    } else {
      hashT[t[i]]++
    }
    if (hashS[t[i]] === hashT[t[i]]) count++
  }
  return s.length === t.length && count === Object.keys(hashS).length
}
