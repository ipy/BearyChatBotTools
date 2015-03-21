var Promise = require('bluebird');
var load = require('cloud/tools/loader').load;

var subToolNames = ['random', 'surl', 'transform', 'caniuse', 'ip', 'weather', 'domain'];
var tools = load('', subToolNames)

function getTool(tool, text) {
  if(text){
    var action = text.split(/\s+/)[0];
    var param = text.replace(new RegExp(action + '\\s*'), '');
    if (tool[action]){
      return getTool(tool[action], param);
    }
  } else {
    text = '';
  }
  return Promise.resolve([tool, text]);
}

function run(tool, param) {
  return getTool(tool, param).then(function(toolAndText){
    return toolAndText[0].run(toolAndText[1]);
  });
}

function start(text) {
  var action = text.split(/\s+/)[0];
  var param = text.replace(new RegExp(action + '\\s*'), '') || '';
  var tool = tools[action];
  if(tool){
    return Promise.resolve(run(tool, param));
  } else {
    return Promise.resolve('usage')
  }
}

exports.start = start;