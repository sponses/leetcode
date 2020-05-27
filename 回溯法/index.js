/**
 * 78. 子集（枚举）
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
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
var letterCombinations = function (digits) {
  let hash = {
      2: 'abc',
      3: 'def',
      4: 'ghi',
      5: 'jkl',
      6: 'mno',
      7: 'pqrs',
      8: 'tuv',
      9: 'wxyz',
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
var letterCombinations = function (digits) {
  let hash = {
      2: 'abc',
      3: 'def',
      4: 'ghi',
      5: 'jkl',
      6: 'mno',
      7: 'pqrs',
      8: 'tuv',
      9: 'wxyz',
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
var permute = function (nums) {
  let res = []
  function backtrack(has, left) {
    if (has.length === nums.length) {
      res.push(has)
      return
    }
    for (let i = 0, len = left.length; i < len; i++) {
      backtrack(
        [...has, left[i]],
        left.filter((x) => x != left[i])
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
var subsets = function (nums) {
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
var subsetsWithDup = function (nums) {
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
var letterCasePermutation = function (S) {
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
var combine = function (n, k) {
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
var combine = function (n, k) {
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
/**
 * 526. 优美的排列
 * @param {number} N
 * @return {number}
 */
var countArrangement = function (N) {
  const visited = new Array(N + 1)
  visited.fill(false)
  let ans = 0
  function backTrack(i) {
    if (i > N) ans++
    for (let j = 1; j <= N; j++) {
      if (visited[j]) continue
      if (i % j === 0 || j % i === 0) {
        visited[j] = true
        backTrack(i + 1)
        visited[j] = false
      }
    }
  }
  backTrack(1)
  return ans
}
/**
 * 51. N皇后
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const ans = []
  const grid = new Array(n)
  for (let i = 0; i < n; i++) {
    grid[i] = new Array(n)
    grid[i].fill('.')
  }
  function backTrack(i) {
    if (i === n) {
      const temp = new Array()
      grid.forEach((item) => {
        temp.push(item.join(''))
      })
      ans.push(temp)
      return
    }
    for (let j = 0; j < n; j++) {
      if (isOk(i, j, grid)) {
        grid[i][j] = 'Q'
        backTrack(i + 1)
        grid[i][j] = '.'
      }
    }
  }
  backTrack(0)
  return ans
}

function isOk(i, j, grid) {
  for (let k = 0; k < i; k++) {
    if (grid[k][j] === 'Q') return false
  }
  let a = i,
    b = j
  while (a >= 0 && b >= 0) {
    if (grid[a--][b--] === 'Q') return false
  }
  ;(a = i), (b = j)
  while (a >= 0 && b < grid[0].length) {
    if (grid[a--][b++] === 'Q') return false
  }
  return true
}
/**
 * 37. 解数独
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  function isOk(i, j, val) {
    for (let k = 0; k < 9; k++) {
      if (board[i][k] == val) return false
    }
    for (let k = 0; k < 9; k++) {
      if (board[k][j] == val) return false
    }
    let l = Math.floor(j / 3) * 3,
      t = Math.floor(i / 3) * 3
    for (let m = t; m < t + 3; m++) {
      for (let n = l; n < l + 3; n++) {
        if (board[m][n] == val) return false
      }
    }
    return true
  }
  function backTrace(i, j) {
    if (j === 9) {
      if (i === 8) return true
      i++
      j = 0
    }
    if (board[i][j] === '.') {
      for (let val = 1; val <= 9; val++) {
        if (isOk(i, j, val)) {
          board[i][j] = val + ''
          if (backTrace(i, j + 1)) return true
        }
        board[i][j] = '.'
      }
    } else {
      return backTrace(i, j + 1)
    }
    return false
  }
  backTrace(0, 0)
}
