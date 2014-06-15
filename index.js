var _ = require('lodash');

var indexFromPosition = function(position) {
	return position.row * 9 + position.col;
};

var positionFromIndex = function(index) {
	var result = { };

	result.row = Math.floor(index / 9);
	result.col = index % 9;

	return result;
};

/**
 * Description: This function looks along a string to find a space.
 *
 * @function
 * @param {object} startingPosition - An object that defines
 * the starting position. 
 */
var nextPosition = function(position) {
	position.col += 1;
	position.row += Math.floor(position.col / 9);
	position.col = position.col % 9;
	return position;
};

/**
 * Description: This function looks along a string to find a space.
 *
 * @function
 * @param {string} string - Sudoku puzzle as a string.
 * @param {object} startingPosition - Optional param: an object to define 
 * the starting position. If no object is given, function will begin looking at
 * the begining of the string.
 * @param {integer} n - description.
 */
var nextSpace = module.exports.nextSpace = function(string, startingPosition) {
	startingPosition = startingPosition || { row: 0, col: 0 };
	var startingIndex = indexFromPosition(startingPosition);
	var index = string.indexOf(' ', startingIndex);
	return positionFromIndex(index);
};

/**
 * Description: This function looks within the same row of the space being 
 * tested to determine if the a number is already present.
 *
 * @function
 * @param {string} string - Sudoku puzzle as a string.
 * @param {integer} position - Integer representing a position in the string.
 * @param {integer} n - description.
 */
var numExistsInRow = module.exports.numExistsInRow = function(string, position, n) {
	
	var rowString = string.substr(position.row * 9, 9);

	return (rowString.indexOf(n.toString()) !== -1);
};

/**
 * Description: This function looks within the same column of the space being 
 * tested to determine if the a number is already present.
 *
 * @function
 * @param {string} string - Sudoku puzzle as a string.
 * @param {integer} position - Integer representing a position in the string.
 * @param {integer} n - description.
 */
var numExistsInCol = module.exports.numExistsInCol = function(string, position, n) {

	var array = string.split('');
	var colArray = array.filter(function(cell, index) {
		return (positionFromIndex(index).col === position.col);
	});

	var colString = colArray.join('');

	return (colString.indexOf(n.toString()) !== -1);
};

/**
 * Description: This function looks within the same 3X3 box of the space being 
 * tested to determine if the a number is already present.
 *
 * @function
 * @param {string} string - Sudoku puzzle as a string.
 * @param {integer} position - Integer representing a position in the string.
 * @param {integer} n - description.
 */
var numExistsInBox = module.exports.numExistsInBox = function(string, position, n) {

	var boxNumber = Math.floor(position.col / 3) + 
		Math.floor(position.row / 3) * 3;
	var rowStartValue = Math.floor(boxNumber / 3) * 3;
	var colStartValue = (boxNumber % 3) * 3;
	var array = string.split('');

	var boxArray = array.filter(function(cell, index) {
		var cellPosition = positionFromIndex(index);		
		return ((cellPosition.row >= 0+rowStartValue) && (cellPosition.row <= 2+rowStartValue) && 
					(cellPosition.col >= 0+colStartValue) && (cellPosition.col <= 2+colStartValue));
	});

	var boxString = boxArray.join('');

	return (boxString.indexOf(n.toString()) !== -1);
};

/**
 * Description: Solves a space if it can be solved and returns a value, 
 * otherwise 'undefined' is returned.
 *
 * @function
 * @param {string} string - A sudoku puzzle as a string of numbers and spaces.
 * @param {integer} position - Integer representing a position in the string.
 * @return {array} - An array of the sudoku puzzle with a cell solved.
 */
var solveSpace = module.exports.solveSpace = function(string, position) {
	var numRange = _.range(1, 10);
	var result = [];

	numRange.forEach(function(n){
		if (numExistsInRow(string, position, n) === false && 
			numExistsInCol(string, position, n) === false && 
			numExistsInBox(string, position, n) === false) {
			result.push (n);
		}
	}); 
	return result.length === 1 ? result[0] : undefined;
};

/**
 * Description: Stores the solved number in an array and then joins the array and returns a string.
 *
 * @function
 * @param {string} string - A sudoku puzzle as a string of numbers and spaces.
 * @param {integer} position - Integer representing a position in the string.
 * @return {string} - A method to return the array as a string with the solved cell.
 */
var storeSolvedNumber = module.exports.storeSolvedNumber = function(string, position) {
	var array = string.split('');
	var index = indexFromPosition(position);

	array[index] = solveSpace(string, position);
	return array.join('');
};

/**
 * Description: Finds the first space it can solve and returns a value.
 *
 * @function
 * @param {string} string - A sudoku puzzle as a string of numbers and spaces.
 * @return {string} solvedString - The ammended string with the first solvable space.
 */
var solveFirstPossibleCell = module.exports.solveFirstPossibleCell = function(string) {
	var position = nextSpace(string);
	var solvedString;

	while(!solvedString) {
		if (solveSpace(string, position)) {
			
			solvedString = storeSolvedNumber(string, position);
		} else {
			position = nextSpace(string, nextPosition(position));
		}
	}
	return solvedString;
};

/**
 * Description: Iterates through a string until all spaces are solved.
 *
 * @function
 * @param {string} string - A sudoku puzzle as a string of numbers and spaces. 
 * @return {string} string -  A solved puzzle string w/ no spaces.
 */
module.exports.solvePuzzles = function(string) {
	while(string.indexOf(' ') !== -1) {
		string = solveFirstPossibleCell(string);
	}
	return string;
};

