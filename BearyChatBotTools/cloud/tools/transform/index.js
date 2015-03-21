var load = require('cloud/tools/loader').load;

var subToolNames = ['hex2rgb', 'md5', 'base64'];
var tool = load('transform', subToolNames);

module.exports = tool;