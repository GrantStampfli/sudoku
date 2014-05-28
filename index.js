

// module.exports.findSpace = function(string) {
// 	var index = string.indexOf(' ');
// 	var result = { };

// 	result.row = Math.floor(index / 9);
// 	result.col = index % 9;

// 	console.log(result);
// 	return result;
// };

module.exports.nextSpace = function(string, startingSpace) {
	startingSpace = startingSpace || { row: 0, col: 0 };
	var index = string.indexOf(' ', (startingSpace.row * 9 + startingSpace.col));
	var result = { };

	result.row = Math.floor(index / 9);
	result.col = index % 9;

	console.log(result);
	return result;
};

module.exports.numExistsInRow = function(string, startingSpace, n) {
	//take a number and compare it to the row and determine if it already there
	//if it is, next number
	var row = '158 2  6 ';

	console.log(row.indexOf(n.toString()));

	return (row.indexOf(n.toString()) !== -1);
};