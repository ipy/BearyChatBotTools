module.exports = function() {
  if (!arguments.length) {
    return Math.random();
  }
  switch (arguments[0]) {
    case 'int':
      if (arguments.length > 3) {
        var result = '';
        for (var i = 0; i<parseInt(arguments[3]); i++) {
          result = result + randInt(parseInt(arguments[1]), parseInt(arguments[2])) + '\n';
        }
        return result;
      } else if (arguments.length === 3) {
        return randInt(parseInt(arguments[1]), parseInt(arguments[2])).toString();
      } else if (arguments.length === 2) {
        return randInt(0, parseInt(arguments[1])).toString();
      } else {
        return randInt(0, Number.MAX_VALUE).toString();
      }
      break;
    
    case 'password':
    case 'pass':
      return randPassword();
      
    default:
      // code
  }
}

function randInt(min, max) {
  var range = max - min;
	var rand = Math.floor(Math.random() * (range + 1));
	return min + rand;
}

function randPassword() {
  return "not implemented";
}