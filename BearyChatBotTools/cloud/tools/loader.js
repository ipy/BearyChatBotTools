var path = require('path');

function load(base, subToolNames){
  var tools = {name: base.replace('/', ' ')};
  subToolNames.forEach(function(name){
    tools[name] = require(path.join("cloud/tools/", base, name));
  });
  return tools;
}

exports.load = load;