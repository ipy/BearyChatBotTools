var load = require('cloud/tools/loader').load;

var subToolNames = ['int', 'select', 'uuid'];
var tools = load('random', subToolNames)

tools.run = function (text){
  return tools['int'].run(text);
}

module.exports = tools;