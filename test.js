var shortestSubarray = function(A, K) {
  const N = A.length
  const pre = new Array(N + 1)
  pre[0] = 0
  for (let i = 0; i < N; i++) pre[i + 1] = pre[i] + A[i]
  const dequeue = []
  let ans = N + 1
  for (let i = 0, len = pre.length; i < len; i++) {
    while (!dequeue.length && pre[dequeue[dequeue.length - 1]] >= pre[i]) {
      dequeue.pop()
    }
    while (!dequeue.length && pre[i] - pre[dequeue[0]] >= K) {
      ans = Math.min(i - dequeue[0])
    }
    dequeue.push(i)
  }
  return ans > N ? 0 : ans
}
shortestSubarray([1])
