var tool = {name: 'transform base64 encode'};
tool.run = function(text){
  return new Buffer(text).toString('base64');
};

module.exports = tool;