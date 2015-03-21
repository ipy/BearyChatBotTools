var md5 = require('MD5');

var tool = {name: 'transform md5'};
tool.run = function(text){
  return md5(text);
};

module.exports = tool;