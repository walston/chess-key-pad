module.exports = function (options) {
  const { width, height, length, keys, illegalPlacement, pieces } = options
  const getMoves = require('./getMoves')(width,height,keys,illegalPlacement)
  const unfolds = pieces.reduce( (u, piece) => {
    u[piece] = keys.reduce( (p, key, index) => {
      p[key] = getMoves(piece, index)
      return p
    }, {})
    return u
  }, {})

  return function numbers(piece, seed) {
    this.print = function print(printer) {
      iterate(seed, length, unfolds, piece, printer)
    }

    return this
  }
}



function iterate(seed, cutoff, unfolds, piece, printer) {
  if (seed.length === cutoff) {
    printer(seed.slice(0, cutoff))
  }
  else {
    let char = seed[seed.length - 1]
    unfolds[piece][char].forEach( k => {
      iterate(seed + k, cutoff, unfolds, piece, printer)
    })
  }
}
