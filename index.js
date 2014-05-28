

module.exports.findSpace = function(string) {
	var index = string.indexOf(' ');
	var result = { };

	result.row = Math.floor(index / 9);
	result.col = index % 9;

	console.log(result);
	return result;
};