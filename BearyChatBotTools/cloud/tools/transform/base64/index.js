var load = require('cloud/tools/loader').load;

var subToolNames = ['encode', 'decode'];
var tools = load('transform/base64', subToolNames)

tools.run = function (text){
  return tools['encode'].run(text);
}

module.exports = tools;