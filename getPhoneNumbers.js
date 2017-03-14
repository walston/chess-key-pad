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

  return function numbers(piece, seed, printer) {
    iterate(seed, length, piece, unfolds, printer);
    return null;
  }
}

function iterate(seed, cutoff, piece, unfolds, print) {
  if (cutoff < seed.length) {
    return seed.slice(0, cutoff)
  }

  let trunk = seed
  let branches = new Array(cutoff - trunk.length)
  let budding = 0
  branches[budding] = {
    leafs: unfolds[piece][trunk.slice(-1)].slice(),
    index: 0
  }

  // "iterate the array"
  while (branches[0]) {
    // "grow" the array (array is complete)
      // look for null
      // replace null w/ bud => newLeafs[0]
    for (let i = 0; i < branches.length; i++) { // bloom sequence
      if (!branches[i]) {
        let bud = branches[i-1].leafs[branches[i-1].index]

        branches[i] = {
          leafs: unfolds[piece][bud].slice(),
          index: 0
        }
      }
    }

    // pipe string value to print()
    let tree = branches.reduce( (trunk, branch) => {
      return trunk + branch.leafs[branch.index]
    }, trunk)
    print(tree)

    // "prune" the array
      // add 1 to last index;
      // if that's an undefined index ?
      // remove this node ("prune")
      // add 1 to the previous node ("sprout")
      // step up until that doesn't return undefined
    // return if b:0,i:i.length+1
    for (let i = branches.length - 1; i >= 0; i--) {
      branches[i].index++
      if (branches[i].leafs[branches[i].index]) {
        break;
      }
      else {
        branches[i] = null
      }
    }
  }
}
