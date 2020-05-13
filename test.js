function add(str1, str2) {
  let ans = '',
    prev = 0,
    i = str1.length - 1,
    j = str2.length - 1
  while (i >= 0 || j >= 0 || prev) {
    const a = i >= 0 ? +str1[i--] : 0
    const b = j >= 0 ? +str1[j--] : 0
    const temp = a + b + prev
    ans = (temp % 10) + ans
    prev = Math.floor(temp / 10)
  }
  return ans
}
add('123', '39')
