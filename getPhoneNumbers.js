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
  
  return expand;

  function expand(piece, digits) {
    if (!digits.slice) return []
    if (digits[0] == "0" || digits[0] == "1") return []
    if (!unfolds[piece]) unfolds[piece] = keys.map((k,i) => getMoves(piece,i))

    if (digits.length >= length) return digits

    let lastTile = keys.indexOf(digits.slice(-1))
    let expansion = []

    // promote a pawn!
    if (piece == 'pawn' && lastTile == 10) {
      piece = 'queen'
      expansion = getMoves(piece, lastTile).map( k => expand(piece, digits + k) )
    }
    else {
      expansion = unfolds[piece][lastTile].map( k => expand(piece, digits + k) )
    }

    return expansion.reduce( (acc, digits) => acc.concat(digits), [] )
  }
}
