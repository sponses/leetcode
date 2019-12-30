/**
 * 208.实现Trie（前缀树）
 * Initialize your data structure here.
 */
var Trie = function() {
  this.root = {}
}

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
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
Trie.prototype.search = function(word) {
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
Trie.prototype.startsWith = function(prefix) {
  function startsWith(word, node) {
    if (!word.length) return true
    let letter = word[0]
    if (!node.hasOwnProperty(letter)) return false
    return startsWith(word.slice(1), node[letter])
  }
  return startsWith(prefix, this.root)
}
