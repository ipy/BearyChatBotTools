var base64 = require('base64');

var tool = {name: 'transform base64 encode'};
tool.run = function(text){
  return base64.encode(text);
};

module.exports = tool;