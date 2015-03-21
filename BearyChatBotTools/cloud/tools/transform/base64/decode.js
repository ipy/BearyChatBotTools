var tool = {name: 'transform base64 decode'};
tool.run = function(text){
  return new Buffer(text, 'base64').toString('utf8')
};

module.exports = tool;