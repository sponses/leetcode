/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  // let ans = 0
  // for(let i = 0,len = prices.length;i<len-1;i++){
  //     for(let j = i+1;j<len;j++){
  //         ans = Math.max(ans,-prices[i] + prices[j])
  //     }
  // }
  // return ans
  const len = prices.length,
    dp = new Array(len)
  for (let i = 0; i < len; i++) {
    if (i === 0) {
      dp[i] = [-prices[i], 0]
    } else {
      dp[i] = []
      dp[i][0] = Math.max(dp[i - 1][0], -prices[i])
      dp[i][1] = Math.max(dp[i - 1][0] + prices[i], dp[i - 1][1])
    }
  }
  return dp[len - 1]
}
maxProfit([7, 1, 5, 3, 6, 4])
