const getMovesInit = require("./getMoves");
const assert = require("chai").assert;

describe("3 x 4 phone pad", () => {
  const pieces = ["pawn", "rook", "bishop", "knight", "queen", "king"];
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
  const getMoves = getMovesInit(3, 4, keys, [9, 11]);

  describe("Pawn Movements", () => {
    let moves = keys.map((k, i) => getMoves("pawn", i));
    let expected = [
      ["4"], // "1"
      ["5"], // "2"
      ["6"], // "3"
      ["7"], // "4"
      ["8"], // "5"
      ["9"], // "6"
      [], // "7"
      ["0"], // "8"
      [], // "9"
      [], // "*"
      [], // "0"
      [] // "#"
    ];

    expected.forEach((expectation, index) => {
      it(`Pawn from key "${
        keys[index]
      }" should return [${expectation}]`, () => {
        assert.sameMembers(moves[index], expectation);
      });
    });
  });

  describe("Rook Movements", () => {
    let moves = keys.map((k, i) => getMoves("rook", i));
    let expected = [
      ["2", "3", "4", "7"], // "1"
      ["1", "3", "5", "8", "0"], // "2"
      ["1", "2", "6", "9"], // "3"
      ["1", "5", "6", "7"], // "4"
      ["2", "4", "6", "8", "0"], // "5"
      ["3", "4", "5", "9"], // "6"
      ["1", "4", "8", "9"], // "7"
      ["2", "5", "7", "9", "0"], // "8"
      ["3", "6", "7", "8"], // "9"
      [], // "*"
      ["2", "5", "8"], // "0"
      [] // "#"
    ];
    expected.forEach((expectation, index) => {
      it(`Rook from key "${
        keys[index]
      }" should return [${expectation}]`, () => {
        assert.sameMembers(moves[index], expectation);
      });
    });
  });

  describe("Bishop Movements", () => {
    let moves = keys.map((k, i) => getMoves("bishop", i));
    let expected = [
      ["5", "9"], // "1"
      ["4", "6"], // "2"
      ["5", "7"], // "3"
      ["2", "8"], // "4"
      ["1", "3", "7", "9"], // "5"
      ["2", "8"], // "6"
      ["3", "5", "0"], // "7"
      ["4", "6"], // "8"
      ["1", "5", "0"], // "9"
      [], // "*"
      ["7", "9"], // "0"
      [] // "#"
    ];
    expected.forEach((expectation, index) => {
      it(`Bishop from key "${
        keys[index]
      }" should return [${expectation}]`, () => {
        assert.sameMembers(moves[index], expectation);
      });
    });
  });

  describe("Knight Movements", () => {
    let moves = keys.map((k, i) => getMoves("knight", i));
    let expected = [
      ["6", "8"], // "1"
      ["7", "9"], // "2"
      ["4", "8"], // "3"
      ["3", "9", "0"], // "4"
      [], // "5"
      ["1", "7", "0"], // "6"
      ["2", "6"], // "7"
      ["1", "3"], // "8"
      ["2", "4"], // "9"
      [], // "*"
      ["4", "6"], // "0"
      [] // "#"
    ];
    expected.forEach((expectation, index) => {
      it(`Knight from key "${
        keys[index]
      }" should return [${expectation}]`, () => {
        assert.sameMembers(moves[index], expectation);
      });
    });
  });

  describe("Queen Movements", () => {
    let moves = keys.map((k, i) => getMoves("queen", i));
    let expected = [
      ["2", "3", "4", "5", "7", "9"], // "1"
      ["1", "3", "4", "5", "6", "8", "0"], // "2"
      ["1", "2", "5", "6", "7", "9"], // "3"
      ["1", "2", "5", "6", "7", "8"], // "4"
      ["1", "2", "3", "4", "6", "7", "8", "9", "0"], // "5"
      ["2", "3", "4", "5", "8", "9"], // "6"
      ["1", "3", "4", "5", "8", "9", "0"], // "7"
      ["2", "4", "5", "6", "7", "9", "0"], // "8"
      ["1", "3", "5", "6", "7", "8", "0"], // "9"
      [], // "*"
      ["2", "5", "7", "8", "9"], // "0"
      [] // "#"
    ];
    expected.forEach((expectation, index) => {
      it(`Queen from key "${
        keys[index]
      }" should return [${expectation}]`, () => {
        assert.sameMembers(moves[index], expectation);
      });
    });
  });

  describe("King Movements", () => {
    let moves = keys.map((k, i) => getMoves("king", i));
    let expected = [
      ["2", "4", "5"], // "1"
      ["1", "3", "4", "5", "6"], // "2"
      ["2", "5", "6"], // "3"
      ["1", "2", "5", "7", "8"], // "4"
      ["1", "2", "3", "4", "6", "7", "8", "9"], // "5"
      ["2", "3", "5", "8", "9"], // "6"
      ["4", "5", "8", "0"], // "7"
      ["4", "5", "6", "7", "9", "0"], // "8"
      ["5", "6", "8", "0"], // "9"
      [], // "*"
      ["7", "8", "9"], // "0"
      [] // "#"
    ];

    expected.forEach((expectation, index) => {
      it(`King from key "${
        keys[index]
      }" should return [${expectation}]`, () => {
        assert.sameMembers(moves[index], expectation);
      });
    });
  });
});
