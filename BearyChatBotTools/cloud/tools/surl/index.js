var load = require('cloud/tools/loader').load;

var subToolNames = ['t.cn', 'dwz.cn'];
var tools = load('surl', subToolNames);

tools.run = function (text){
  return tools['t.cn'].run(text);
}

module.exports = tools;