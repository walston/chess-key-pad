const _ = require('underscore')

module.exports = function (options) {
  const { width, height, length, keys, illegalPlacement, pieces } = options
  const getMoves = require('./getMoves')(width,height,keys,illegalPlacement)
  const unfolds = {}

  return expand;

  function expand(piece, initString) {
    if (!initString.slice) return []
    if (initString[0] == "0" || initString[0] == "1") return []
    if (!unfolds[piece]) unfolds[piece] = keys.map((k,i) => getMoves(piece,i))

    if (initString.length >= length) return initString

    let expansion = unfolds[piece][initString.slice(-1)].map( k => expand(piece, initString + k) )

    return expansion.reduce( (acc, keys) => acc.concat(keys), [] )
  }
}
