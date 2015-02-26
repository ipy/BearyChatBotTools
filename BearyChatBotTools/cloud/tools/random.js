module.exports = tool;

var tool = {
  usage: '',
  func: function() {
    return Math.random();
  },
  sub: {
    'int': {
      usage: '',
      func: function (min, max, repeat) {
        var result = '';
        for (var i = 0; i<repeat; i++) {
          result = result + randInt(min, max) + '\n';
        }
        return result;
      },
      parser: function(){
        var min, max, repeat;
        repeat = 1;
        switch (arguments.length) {
          case 0:
            min = 0;
            max = Number.MAX_SAFE_INTEGER;
            break;
          case 1:
            min = 1;
            max = parseInt(arguments[0]);
            break;
          default:
            min = parseInt(arguments[0]);
            max = parseInt(arguments[1]);
            if(arguments.length >= 3) {
              repeat = parseInt(arguments[2]);
            }
            break;
        }
        return [min, max, repeat];
      }
    },
    'select': {
      usage: '',
      func: randSelect
    }
  }
}

function randInt(min, max) {
  var range = max - min;
	var rand = Math.floor(Math.random() * (range + 1));
	return min + rand;
}

function randSelect() {
  switch (arguments.length) {
    case 0:
      return;
    case 1:
      return arguments[0];
    default:
      return arguments[randInt(0, arguments.length)];
  }
}