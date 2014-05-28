var chai = require('chai');
var expect = chai.expect;
var index = require('../index');

var sudokuString = '158 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';


describe ('(sudoku)', function() {
	it('start from possition 0,0 and move to find space', function() {
		expect(index.findSpace(sudokuString)).to.eql({row:0, col:3});
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
			row:0,
			col:4
		};
		expect(index.nextSpace(sudokuString, startingSpace)).to.eql({ row:0, col:5});
	});
	it('start from a previous space and find next space', function () {
		var startingSpace = {
			row:1,
			col:5
		};
		expect(index.nextSpace(sudokuString, startingSpace)).to.eql({ row:1, col:6});
	});
});
