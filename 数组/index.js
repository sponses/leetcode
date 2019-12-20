/**
 * 581.最短无序连续子数组
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
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
var hasGroupsSizeX = function(deck) {
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
