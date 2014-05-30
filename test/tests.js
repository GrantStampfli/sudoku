var chai = require('chai');
var expect = chai.expect;
var index = require('../index');

var sudokuString = '158 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';
var sudokuString2 = ' 58 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';
var sudokuStringFirstSolved = '158 2 36 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';

describe ('(sudoku)', function() {
	it('start from position 0,0 and move to find space', function() {
		expect(index.nextSpace(sudokuString2)).to.eql({row:0, col:0});
	});

	it('start from position 0,0 and move to find space', function() {
		expect(index.nextSpace(sudokuString)).to.eql({row:0, col:3});
	});

	it('start from position 0,0 and move to find space', function() {
		expect(index.nextSpace(sudokuString)).to.eql({row:0, col:3});
	});

	it('start from position 0,0 and move to find space', function() {
		var startingSpace = {
			row:2,
			col:1
		};
		expect(index.nextSpace(sudokuString, startingSpace)).to.eql({row:2, col:2});
	});

	it('start from a previous space and find next space', function () {
		var startingSpace = {
			row:0,
			col:4
		};
		expect(index.nextSpace(sudokuString, startingSpace)).to.eql({ row:0, col:5});
	});

	it('start from a previous space and find next space', function () {
		var startingSpace = {
			row:1,
			col:6
		};
		expect(index.nextSpace(sudokuString, startingSpace)).to.eql({ row:1, col:6});
	});
});
describe ('(sudoku)', function() {
	it('tests if 1 is already in the row', function() {
		expect(index.numExistsInRow(sudokuString, { row: 0, col: 0 }, 1)).to.eql(true);
	});

	it('tests if 9 is already in the 2nd row', function() {
		expect(index.numExistsInRow(sudokuString, { row: 1, col: 0 }, 9)).to.eql(true);
	});
});
describe ('(sudoku)', function() {
	it('tests if 4 is already in the same column 0', function() {
		expect(index.numExistsInCol(sudokuString, { row: 0, col: 0 }, 4)).to.eql(true);
	});
	it('tests if 3 is already in the same column 1', function() {
		expect(index.numExistsInCol(sudokuString, { row: 1, col: 1 }, 3)).to.eql(true);
	});
	it('tests if 4 is already in the same column 2', function() {
		expect(index.numExistsInCol(sudokuString, { row: 0, col: 2 }, 4)).to.eql(true);
	});
});
describe ('(sudoku)', function() {
	it('tests if 5 is already in the same box', function() {
		expect(index.numExistsInBox(sudokuString, { row: 0, col: 0 }, 5)).to.eql(true);
	});

	it('tests if 7 is already in the same box(the next space over)', function() {
		expect(index.numExistsInBox(sudokuString, { row: 1, col: 4 }, 7)).to.eql(true);
	});
	
	it('tests if 7 is already in the same box(the next space over)', function() {
		expect(index.numExistsInBox(sudokuString, { row: 3, col: 3 }, 7)).to.eql(true);
	});
	it('tests if 9 is already in the same box number 4', function() {
		expect(index.numExistsInBox(sudokuString, { row: 5, col: 5 }, 9)).to.eql(true);
	});
});
describe ('(sudoku)', function() {
	it('solves for 3 in col:6 row:0', function() {
		expect(index.solveSpace(sudokuString, { row: 0, col: 6 })).to.eql(3);
	});
	it('cannot solve a space that can not be solved', function () {
		expect(index.solveSpace(sudokuString, { row: 0, col:3 })).to.eql(undefined);

	});
});
describe ('(sudoku)', function () {
	it('stores the solved numbers in the sudokuString', function () {
		expect(index.storeSolvedNumber(sudokuString, { row: 0, col: 6 })).to.eql(sudokuStringFirstSolved);
	});
});
describe('(sudoku', function () {
	it('takes in a sudokuString and looks for the first cell it can solve', function () {
		expect(index.solveCells(sudokuString)).to.eql(sudokuStringFirstSolved);
	});
});







