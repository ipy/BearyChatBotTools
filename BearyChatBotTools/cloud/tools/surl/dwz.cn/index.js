var Promise = require('bluebird');
var requestWrap = require('cloud/tools/surl/common').requestWrap;
var load = require('cloud/tools/loader').load;

var subToolNames = ['origin'];
var tool = load('surl/dwz.cn', subToolNames);

tool.run = function(text){
  var form = {};
  if(text.slice(0,4).toLowerCase() === 'http' || text.search(/\s/) < 0){
    form.url = text;
  } else {
    var args = text.split(/\s+/);
    form.alias = args[0];
    form.url = args[1];
  }
  return requestWrap({
    method: 'POST',
    url: 'http://dwz.cn/create.php',
    form: form
  }).then(function(obj){
    if (typeof obj === 'string') {
      obj = JSON.parse(obj);
    }
    if(obj.tinyurl){
      return Promise.resolve(obj.tinyurl);
    } else {
      return Promise.reject(obj.err_msg);
    }
  });
};

module.exports = tool;