// 迭代方法会考虑到数组的顺序。为了保证结果数组与原数组中的元素顺序一致，会用到一个栈结构。每次循环判断栈顶元素是否是数组，如果是数组就弹出，然后逆序入栈。再进行循环，直到栈顶元素不是数组，结束当前循环，弹出栈顶元素，放入结果数组中。
function flat_iteration(arr) {
  const ans = []
  if (!arr || !arr.length) return ans
  const stack = [arr]
  while (stack.length) {
    while (Array.isArray(stack[stack.length - 1])) {
      const temp = stack.pop()
      for (let i = temp.length - 1; i >= 0; i--) temp[i] && stack.push(temp[i])
    }
    if (stack.length) ans.push(stack.pop())
  }
  return ans
}
// flat_iteration()

// 递归方法思路就是循环数组，当前项如果是数组就递归处理，否则直接
function flat_recursion(arr) {
  const ans = []
  function dfs(x) {
    if (Array.isArray(x)) {
      for (let i = 0, len = x.length; i < len; i++) dfs(x[i])
    } else {
      ans.push(x)
    }
  }
  dfs(arr)
  return ans
}
flat_recursion([[1, [[[[1]]]]]])

function flat_iteration(arr) {
  const ans = []
  const stack = [arr]
  while (stack.length) {
    while (Array.isArray(stack[stack.length - 1])) {
      const temp = stack.pop()
      for (let i = temp.length - 1; i >= 0; i--) stack.push(temp[i])
    }
    if (stack.length) ans.push(stack.pop())
  }
  return ans
}
