const _ = require('underscore')

module.exports = function (options) {
  const { width, height, length, keys, illegalPlacement, pieces } = options
  const getMoves = require('./getMoves')(width,height,keys,illegalPlacement)
  const unfolds = pieces.reduce( (dictionary, p) => {
    dictionary[p] = keys.reduce( (moves, k, i) => {
      moves[k] = getMoves(p, i)
      return moves
    }, {})
    return dictionary
  }, {})

  function Node(char, piece) {
    this.char = char
    this.depth = 0
    this.children = {}
    this.parents = []
    this.piece = piece
  }

  Node.prototype = {
    expand: function() {
      let expansions = unfolds[this.piece]
      let letter = this.char.slice(-1)
      if (expansions[letter] && this.parents.length < length) {
        this.children = expansions[letter].reduce( (acc, k) => {
          acc[k] = new Node(k, this.piece)
          return acc
        }, {})
      }
      for (let name in this.children) {
        let child = this.children[name]
        child.depth = this.depth + 1
        child.parents = this.parents.concat(this.char)
        child.expand()
      }
    },
    print: function(printer) {
      let children = false
      for (let name in this.children) {
        let child = this.children[name]
        child.print(printer)
        children = true
      }

      if (!children) {
        if (this.parents.length >= length - 3) debugger;
        printer(this.parents.join('') + this.char)
      }
    }
  }

  function Trie(piece, seed) {
    if (!seed || !piece) { return console.log('No seed or piece supplied') }

    this.root = new Node('', piece)
    this.tail = this.root

    let nodes = seed.split('').reduce( (stem, k) => {
      let node = new Node(k)
      stem.children[k] = node
      node.parents = stem.parents.concat(stem.char)
      node.depth = stem.depth + 1
      node.piece = stem.piece

      this.tail = node
      return node
    }, this.root)
  }

  Trie.prototype = {
    expand: function() {
      this.tail.expand()
    },
    print: function(printer) {
      this.tail.print(printer)
    }
  }

  return function(piece, seed) {
    let trie = new Trie(piece, seed)
    console.log(trie);
    trie.expand()
    return trie
  }
}
