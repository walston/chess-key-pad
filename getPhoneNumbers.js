const _ = require('underscore')

module.exports = function (options) {
  const { width, height, keys, illegalPlacement, pieces } = options
  const getMoves = require('./getMoves')(width,height,keys,illegalPlacement)

  return function (piece, initString) {
    if (typeof initString !== 'string') return [];
    if (initString[0] == "0" || initString[0] == "1") return []

    let collection = [initString]

    while (collection[0] && collection[0].length < 10) {

      let acc = []

      for (let i = 0; i < collection.length; i++) {

        let curr = collection[i]
        let iof = keys.findIndex( key => key == curr.slice(-1) )
        let next = getMoves(piece, iof)

        if (next.length > 0) {
          acc = acc.concat(next.map( n => curr + n ))
        }
      }

      collection = acc
    }

    return collection
  }
}
