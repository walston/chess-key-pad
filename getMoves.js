const getMovesMemo = {
  counter: 0,
  reset: () => this.counter = 0,
  tick: () => {return this.counter++}
};

function getMoves(piece, start) {
  let signature = `${piece}_i=${start}`

  if (getMovesMemo[signature]) {
    return getMovesMemo[signature];
  }

  if (illegalTiles && illegalTiles.includes(start)) {
    return []
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
    value = value.reduce( (fresh, k) => {
      return (illegalTiles.includes(k) ? fresh : fresh.concat(k))
    }, []);
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
  let startcol = start % w
  let startrow = (start / w) | 0

  let vertical = [];
  for (let wi = startcol; wi < startcol + (w * h); wi += w) {
    vertical.push(wi)
  }

  let horizontal = [];
  for (let hi = startrow * w; hi < (startrow * w) + w; hi++) {
    horizontal.push(hi)
  }

  return vertical.concat(horizontal)
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

  let v = []
  for (let key in potential) {
    v.push(potential[key])
  }
  return v;
}

function bishopMovements(start, w, h) {
  let startcol = start % w;
  let range = (new Array(w)).fill(null).map( (n,i) => i)
  let westward = range.map(n=> start + (n-startcol) * (w+1) );
  let eastward = range.map(n=> start - (n-startcol) * (w-1) );

  return westward.concat(eastward)
    .filter(n => n >= 0 && n < w*h)
    .filter(n => n !== start)
    .sort((a,b) => a > b)
}

function queenMovements(start, w, h) {
  return [].concat(
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

  return potential.filter(function(n) {
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
