/**
 * 208.实现Trie（前缀树）
 * Initialize your data structure here.
 */
var Trie = function () {
  this.root = {}
}

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  function insertOne(word, node) {
    if (!word.length) return

    let letter = word[0]
    if (!node.hasOwnProperty(letter))
      node[letter] = { isEnd: word.length === 1 }
    if (word.length === 1) node[letter].isEnd = true
    insertOne(word.slice(1), node[letter])
  }
  insertOne(word, this.root)
}

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  function search(word, node) {
    let letter = word[0]
    if (!node.hasOwnProperty(letter)) return false
    if (word.length === 1) return node[letter].isEnd
    return search(word.slice(1), node[letter])
  }
  return search(word, this.root)
}

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  function startsWith(word, node) {
    if (!word.length) return true
    let letter = word[0]
    if (!node.hasOwnProperty(letter)) return false
    return startsWith(word.slice(1), node[letter])
  }
  return startsWith(prefix, this.root)
}
/**
 * 211. 添加与搜索单词 - 数据结构设计
 * Initialize your data structure here.
 */
var WordDictionary = function () {
  this.root = {}
}

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  function insert(word, root) {
    if (!word.length) return

    let letter = word[0]
    if (!root.hasOwnProperty(letter))
      root[letter] = { isEnd: word.length === 1 }
    if (word.length === 1) {
      root[letter].isEnd = true
      return
    }
    return insert(word.slice(1), root[letter])
  }
  insert(word, this.root)
}

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  function search(word, root) {
    if (!word.length) return false

    let letter = word[0]
    if (letter === '.') {
      let arr = Object.keys(root).filter((x) => x !== 'isEnd')
      let result = false
      for (let i = 0, len = arr.length; i < len; i++) {
        if (word.length === 1) {
          if (root[arr[i]].isEnd) return true
        } else {
          result = search(word.slice(1), root[arr[i]])
          if (result) break
        }
      }
      return result
    }
    if (!root.hasOwnProperty(letter)) return false
    if (word.length === 1 && root[letter].isEnd) return true
    return search(word.slice(1), root[letter])
  }
  return search(word, this.root)
}

/**
 * 1032. 字符流
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
/**
 * @param {string[]} words
 */
var StreamChecker = function (words) {
  this.tree = new Map()
  this.visited = []
  for (let i = 0, len = words.length; i < len; i++) {
    let node = this.tree
    const cur = words[i]
    let j = cur.length - 1
    while (j >= 0) {
      if (!node.has(cur[j])) node.set(cur[j], new Map())
      node = node.get(cur[j])
      node.set('isEnd', j === 0 || node.get('isEnd'))
      j--
    }
  }
}

/**
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function (letter) {
  this.visited.push(letter)
  let node = this.tree
  for (let i = this.visited.length - 1; i >= 0; i--) {
    if (!node.has(this.visited[i])) return false
    node = node.get(this.visited[i])
    if (node.get('isEnd')) return true
  }
  return false
}

/**
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */
