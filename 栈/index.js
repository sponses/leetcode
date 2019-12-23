/**
 * 125.验证回文串
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  s = s.replace(
    /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,
    ''
  )
  let arr = [],
    mid1 = Math.ceil(s.length / 2),
    mid2 = Math.floor(s.length / 2)
  for (let i = 0; i < mid1; i++) {
    arr.push(s[i])
  }
  for (let i = mid2, len = s.length; i < len; i++) {
    if (arr[arr.length - 1].toLocaleLowerCase() !== s[i].toLocaleLowerCase())
      return false
    arr.pop()
  }
  return true
}
