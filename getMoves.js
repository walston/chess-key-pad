const _ = require('underscore');
const getMovesMemo = {
  _counter: 0,
  counter: 0,
  reset: () => this.counter = 0,
  tick: () => {this._counter++; return this.counter++}
} ;

function getMoves(piece, start) {
  let signature = `${piece}_i=${start}`

  if (getMovesMemo[signature]) {
    if (getMovesMemo.tick() > 100) debugger;
    return getMovesMemo[signature];
  }

  let value;
  switch (piece) {
    case 'pawn':   value = pawnMovements(start, w, h); break;
    case 'rook':   value = rookMovements(start, w, h); break;
    case 'knight': value = knightMovements(start, w, h); break;
    case 'bishop': value = bishopMovements(start, w, h); break;
    case 'queen':  value = queenMovements(start, w, h); break;
    case 'king':   value = kingMovements(start, w, h); break;
    default: value = [];
  }

  if (illegalTiles) {
    value = _.difference(value, illegalTiles);
  }

  if (mapping) {
    value = value.map(n => mapping[n]);
  }

  getMovesMemo[signature] = value;
  return value;
}

function pawnMovements(start, w, h) {
  let lastRow = w * h - w;
  if (start < lastRow)
    return [start + w];
  return [];
}

function rookMovements(start, w, h) {
  let startcol = start % w;
  let vertical = _.range(startcol,w*(h-1)+startcol,w)
  let startrow = (start / w) | 0
  let horizontal = _.range(startrow*w,startrow*w+(w-1))
  return _.union(vertical, horizontal)
    .filter(n=>n!==start)
    .sort((a,b)=>a>b)
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

module.exports = function (width, height, m, illegal) {
  w = width;
  h = height;
  mapping = m;
  illegalTiles = illegal
  return getMoves;
}
