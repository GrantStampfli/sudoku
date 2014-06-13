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

var nextPosition = function(position) {
	position.col += 1;
	position.row += Math.floor(position.col / 9);
	position.col = position.col % 9;
	return position;
};

var nextSpace = module.exports.nextSpace = function(string, startingPosition) {
	startingPosition = startingPosition || { row: 0, col: 0 };
	var startingIndex = indexFromPosition(startingPosition);
	var index = string.indexOf(' ', startingIndex);
	return positionFromIndex(index);
};

var numExistsInRow = module.exports.numExistsInRow = function(string, position, n) {
	
	var rowString = string.substr(position.row * 9, 9);

	return (rowString.indexOf(n.toString()) !== -1);
};

var numExistsInCol = module.exports.numExistsInCol = function(string, position, n) {

	var array = string.split('');
	var colArray = array.filter(function(cell, index) {
		return (positionFromIndex(index).col === position.col);
	});

	var colString = colArray.join('');

	return (colString.indexOf(n.toString()) !== -1);
};

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

var storeSolvedNumber = module.exports.storeSolvedNumber = function(string, position) {
	var array = string.split('');
	var index = indexFromPosition(position);
	array[index] = solveSpace(string, position);
	return array.join('');
};

var solveFirstPossibleCell = module.exports.solveFirstPossibleCell = function(string) {
	var position = nextSpace(string);
	var solvedString;

	while(!solvedString) {
		if (solveSpace(string, position)) {
			
			solvedString = storeSolvedNumber(string, position);
		}else {
			position = nextSpace(string, nextPosition(position));
		}
		console.log('Solved puzzle: %j', solvedString);
	}

	return solvedString;

};

module.exports.solvePuzzles = function(string) {
	while(string.indexOf(' ') !== -1) {
			string = solveFirstPossibleCell(string);
	}
	return string;

};

