var randInt = require('cloud/tools/random/common').randInt;

var tool = {name: 'random int'};
tool.run = function (text) {
  text = text || '100';
  var args = text.split(/\s+/);
  var min, max, repeat;
  repeat = 1;
  switch (args.length) {
    case 1:
      min = 1;
      max = parseInt(args[0]);
      break;
    default:
      min = parseInt(args[0]);
      max = parseInt(args[1]);
      if(args.length >= 3) {
        repeat = parseInt(args[2]);
      }
      break;
  }
  var results = [];
  for (var i = 0; i<repeat; i++) {
    results.push(randInt(min, max));
  }
  return results.join('\n');
}

module.exports = tool;