

// module.exports.findSpace = function(string) {
// 	var index = string.indexOf(' ');
// 	var result = { };

// 	result.row = Math.floor(index / 9);
// 	result.col = index % 9;

// 	console.log(result);
// 	return result;
// };

module.exports.nextSpace = function(string, startingPosition) {
	startingPosition = startingPosition || { row: 0, col: 0 };
	var index = string.indexOf(' ', (startingPosition.row * 9 + startingPosition.col));
	var result = { };

	result.row = Math.floor(index / 9);
	result.col = index % 9;

	return result;
};

module.exports.numExistsInRow = function(string, position, n) {
	//take a number and compare it to the row and determine if it already there
	//if it is, next number
	var rowString = string.substr(position.row * 9, 9);

	return (rowString.indexOf(n.toString()) !== -1);
};