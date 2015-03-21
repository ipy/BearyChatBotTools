var uuid = require('uuid');

var tool = {name: 'random uuid'};

tool.run = function(version){
  if (version === '1'){
    return uuid.v1();
  } else {
    return uuid.v4();
  }
};

module.exports = tool;