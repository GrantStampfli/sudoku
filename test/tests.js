var chai = require('chai');
var expect = chai.expect;
var index = require('../index');

var sudokuString = '158 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';
var sudokuString2 = ' 58 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';


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
