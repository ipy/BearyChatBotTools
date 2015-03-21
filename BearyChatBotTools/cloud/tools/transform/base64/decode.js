var base64 = require('base64');

var tool = {name: 'transform base64 decode'};
tool.run = function(text){
  return base64.decode(text);
};

module.exports = tool;