var randInt = require('cloud/tools/random/common').randInt;

var tool = {name: 'random select'};

tool.run = function(text){
  var args = text.split(/\s+/);
  var index = randInt(0, args.length);
  return args[index];
};

module.exports = tool;