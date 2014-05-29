module.exports.nextSpace = function(string, startingPosition) {
	startingPosition = startingPosition || { row: 0, col: 0 };
	var index = string.indexOf(' ', (startingPosition.row * 9 + startingPosition.col));
	var result = { };

	result.row = Math.floor(index / 9);
	result.col = index % 9;

	return result;
};

module.exports.numExistsInRow = function(string, position, n) {
	
	var rowString = string.substr(position.row * 9, 9);

	return (rowString.indexOf(n.toString()) !== -1);
};

module.exports.numExistsInCol = function(string, position, n) {

	var array = string.split('');

	var colArray = array.filter(function(cell, index) {
	
		return (index % 9 === position.col);
	});

	var colString = colArray.join('');

	return (colString.indexOf(n.toString()) !== -1);
};

module.exports.numExistsInBox = function(string, position, n) {
	
	// var array = [1,5,8,2, , , ,3, ];
	var boxNumber = 0; //eventually will get this from the position
	var array = string.split('');

	var boxArray = array.filter(function(cell, index) {
		var division= Math.floor(index / 9);
		var modulus= index % 9;
		//console.log('%d: %d %d', index, Math.floor(index/9), index%9);

		return (division >= 0 && division <= 2 && modulus >= 0 && modulus <= 2);
	});

	var boxString = boxArray.join('');
	console.log(boxArray);

	return (boxString.indexOf(n.toString()) !== -1);
	
};





