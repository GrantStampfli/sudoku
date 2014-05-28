var chai = require('chai');
var expect = chai.expect;
var index = require('../index');

var sudokuString = '158 2  6 2   8  9  3  7 8 2 6 74      4 6 7      19 5 4 9 3  2  2  5   8 7  9 413';


describe ('(sudoku)', function() {
	it('looks for a space in a string row', function() {
		expect(index.findSpace(sudokuString)).to.eql({row:1, col:4});
	});

});