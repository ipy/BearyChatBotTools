var load = require('cloud/tools/loader').load;

var subToolNames = ['hex2rgb'];
var tool = load('transform', subToolNames);

module.exports = tool;