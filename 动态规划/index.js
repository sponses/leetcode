/**
 * 322. 零钱兑换（暴力递归超时）
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  if (amount === 0) return 0

  let min = Number.MAX_SAFE_INTEGER
  for (let i = 0, len = coins.length; i < len; i++) {
    if (coins[i] > amount) continue

    let res = coinChange(coins, amount - coins[i])
    if (res === -1) continue
    min = Math.min(min, res + 1)
  }
  return min === Number.MAX_SAFE_INTEGER ? -1 : min
}
