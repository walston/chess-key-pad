const _ = require('underscore');
const getMovesMemo = {} ;

function getMoves(piece, start, mapping, illegalTiles) {
  if (getMovesMemo[piece+start])
    return getMovesMemo[piece+start];

  let value;
  let illegalMoves = [9, 11];
  switch (piece) {
    case 'pawn':   value = pawnMovements(start, w, h); break;
    case 'rook':   value = rookMovements(start, w, h); break;
    case 'knight': value = knightMovements(start, w, h); break;
    case 'bishop': value = bishopMovements(start, w, h); break;
    case 'queen':  value = queenMovements(start, w, h); break;
    case 'king':   value = kingMovements(start, w, h); break;
    default: value = [];
  }
  value = _.difference(value, illegalMoves);

  if (mapping) {
    value = value.map(n => mapping[n]);
  }

  getMovesMemo[piece+start] = value;
  return value;
}

function pawnMovements(start, w, h) {
  let lastRow = w * h - w;
  if (start < lastRow)
    return [start + w];
  return [];
}

function rookMovements(start, w, h) {
  return _.uniq([]
    .concat(
      _.range(h).map(function(tr) {
        let p = start % w;
        return tr * w + p
      })
    )
    .concat(
      _.range(w).map(function(td) {
        let tr = Math.floor(start/w);
        return tr*w + td
      })
    )
    .filter(n=>n!==start)
    .sort((a,b)=>a>b)
  )
}

function knightMovements(start, w, h) {
  let column = start % w;
  let row = Math.floor(start/w);
  let potential = {
    NNW: start - (2 * w + 1),
    NWW: start - (w + 2),
    SWW: start + (w - 2),
    SSW: start + (2 * w - 1),
    NNE: start - (2 * w - 1),
    NEE: start - (w - 2),
    SEE: start + (w + 2),
    SSE: start + (2 * w + 1)
  };
  if (column < 2) {
    delete potential.NWW;
    delete potential.SWW;
  }
  if (column < 1) {
    delete potential.NNW;
    delete potential.SSW;
  }
  if (column > (w-1) - 2) {
    delete potential.NEE;
    delete potential.SEE;
  }
  if (column > (w-1) - 1) {
    delete potential.NNE;
    delete potential.SSE;
  }
  if (row < 2) {
    delete potential.NNW;
    delete potential.NNE;
  }
  if (row < 1) {
    delete potential.NWW;
    delete potential.NEE;
  }
  if (row > (h-1)-2) {
    delete potential.SSW;
    delete potential.SSE;
  }
  if (row > (h-1)-1) {
    delete potential.SWW;
    delete potential.SEE;
  }
  return _.values(potential).sort((a,b)=>a>b);
}

function bishopMovements(start, w, h) {
  let startcol = start % w;
  let westward = _.range(w).map(n=> start + (n-startcol) * (w+1) );
  let eastward = _.range(w).map(n=> start - (n-startcol) * (w-1) );

  return _.union(westward, eastward)
    .filter(n => n >= 0 && n < w*h)
    .filter(n => n !== start)
    .sort((a,b) => a > b)
}

function queenMovements(start, w, h) {
  return _.union(
    rookMovements(start, w, h),
    bishopMovements(start, w, h)
  )
  .sort( (a,b) => a > b)
}

function kingMovements(start, w, h) {
  let startrow = (start / w) | 0;
  let startcol = start % w;
  let potential = [
    start - w - 1,
    start - w,
    start - w + 1,
    start - 1,
    start + 1,
    start + w - 1,
    start + w,
    start + w + 1
  ];

  return _.filter(potential, function(n) {
    let nr = (n / w) | 0;
    let nc = n % w;
    return true
      && nc >= 0
      && nc < w
      && nc >= startcol - 1
      && nc <= startcol + 1
      && nr >= 0
      && nr < h
      && nr >= startrow - 1
      && nr <= startrow + 1
  });
}

module.exports = function (width, height, mapping) {
  w = width;
  h = height;
  return getMoves;
}
