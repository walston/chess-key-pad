const getMoves = require('./getMoves')(3, 4, null, [9,11]);

Array.prototype.equals = function(array) {
  if (this === array) return true;
  if (this == null || array == null) return false;
  if (this.length !== array.length) return false;
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== array[i]) return false;
  }
  return true;
}

var testRook3 = getMoves('rook', 3);
var testRook4 = getMoves('rook', 4);
var testRook5 = getMoves('rook', 5);
var testRook6 = getMoves('rook', 6);
console.assert([0,4,5,6].equals(testRook3), "\nExpectation does not match result:",  "\nExpected:", [0,4,5,6], "\nResult:", testRook3);
console.assert([1,3,5,7,10].equals(testRook4), "\nExpectation does not match result:",  "\nExpected:", [1,3,5,7,10], "\nResult:", testRook4);
console.assert([2,3,4,8].equals(testRook5), "\nExpectation does not match result:",  "\nExpected:", [2,3,4,8], "\nResult:", testRook5);
console.assert([0,3,7,8].equals(testRook6), "\nExpectation does not match result:",  "\nExpected:", [0,3,7,8], "\nResult:", testRook6);

var testKnight3 = getMoves('knight', 3);
var testKnight4 = getMoves('knight', 4);
var testKnight5 = getMoves('knight', 5);
var testKnight6 = getMoves('knight', 6);
console.assert([2,8,10].equals(testKnight3), "\nExpectation does not match result:",  "\nExpected:", [2,8,10], "\nResult:", testKnight3);
console.assert([].equals(testKnight4), "\nExpectation does not match result:",  "\nExpected:", [], "\nResult:", testKnight4);
console.assert([0,6,10].equals(testKnight5), "\nExpectation does not match result:",  "\nExpected:", [0,6,10], "\nResult:", testKnight5);
console.assert([1,5].equals(testKnight6), "\nExpectation does not match result:",  "\nExpected:", [1,5], "\nResult:", testKnight6);

var testBishop0 = getMoves('bishop', 0);
var testBishop1 = getMoves('bishop', 1);
var testBishop2 = getMoves('bishop', 2);
var testBishop3 = getMoves('bishop', 3);
var testBishop4 = getMoves('bishop', 4);
var testBishop5 = getMoves('bishop', 5);
var testBishop6 = getMoves('bishop', 6);
var testBishop7 = getMoves('bishop', 7);
var testBishop8 = getMoves('bishop', 8);
var testBishop9 = getMoves('bishop', 9);
var testBishop10 = getMoves('bishop', 10);
var testBishop11 = getMoves('bishop', 11);
console.assert([4,8].equals(testBishop0), "\nExpectation does not match result:",  "\nExpected:", [4,8], "\nResult:", testBishop0);
console.assert([3,5].equals(testBishop1), "\nExpectation does not match result:",  "\nExpected:", [3,5], "\nResult:", testBishop1);
console.assert([4,6].equals(testBishop2), "\nExpectation does not match result:",  "\nExpected:", [4,6], "\nResult:", testBishop2);
console.assert([1,7].equals(testBishop3), "\nExpectation does not match result:",  "\nExpected:", [1,7], "\nResult:", testBishop3);
console.assert([0,2,6,8].equals(testBishop4), "\nExpectation does not match result:",  "\nExpected:", [0,2,6,8], "\nResult:", testBishop4);
console.assert([1,7].equals(testBishop5), "\nExpectation does not match result:",  "\nExpected:", [1,7], "\nResult:", testBishop5);
console.assert([2,4,10].equals(testBishop6), "\nExpectation does not match result:",  "\nExpected:", [2,4,10], "\nResult:", testBishop6);
console.assert([3,5].equals(testBishop7), "\nExpectation does not match result:",  "\nExpected:", [3,5], "\nResult:", testBishop7);
console.assert([0,4,10].equals(testBishop8), "\nExpectation does not match result:",  "\nExpected:", [0,4,10], "\nResult:", testBishop8);
console.assert([5,7].equals(testBishop9), "\nExpectation does not match result:",  "\nExpected:", [5,7], "\nResult:", testBishop9);
console.assert([6,8].equals(testBishop10), "\nExpectation does not match result:",  "\nExpected:", [6,8], "\nResult:", testBishop10);
console.assert([3,7].equals(testBishop11), "\nExpectation does not match result:",  "\nExpected:", [3,7], "\nResult:", testBishop11);

var testQueen0 = getMoves('queen', 0);
var testQueen4 = getMoves('queen', 4);
var testQueen11 = getMoves('queen', 11);
console.assert([1,2,3,4,6,8].equals(testQueen0), "\nExpectation does not match result:",  "\nExpected:", [1,2,3,4,6,8], "\nResult:", testQueen0);
console.assert([0,1,2,3,5,6,7,8,10].equals(testQueen4), "\nExpectation does not match result:",  "\nExpected:", [0,1,2,3,5,6,7,8,10], "\nResult:", testQueen4);
console.assert([2,3,5,7,8,10].equals(testQueen11), "\nExpectation does not match result:",  "\nExpected:", [2,3,5,7,8,10], "\nResult:", testQueen11);

var testKing0 = getMoves('king', 0);
var testKing3 = getMoves('king', 3);
var testKing7 = getMoves('king', 7);
var testKing11 = getMoves('king', 11);
console.assert([1,3,4].equals(testKing0), "\nExpectation does not match result:",  "\nExpected:", [1,3,4], "\nResult:", testKing0);
console.assert([0,1,4,6,7].equals(testKing3), "\nExpectation does not match result:",  "\nExpected:", [0,1,4,6,7], "\nResult:", testKing3);
console.assert([3,4,5,6,8,10].equals(testKing7), "\nExpectation does not match result:",  "\nExpected:", [3,4,5,6,8,10], "\nResult:", testKing7);
console.assert([7,8,10].equals(testKing11), "\nExpectation does not match result:",  "\nExpected:", [7,8,10], "\nResult:", testKing11);
