var Promise = require('bluebird');
var requestWrap = require('cloud/tools/surl/common').requestWrap;

var tool = {name: 'surl dwz.cn origin'};

tool.run = function(url){
  return requestWrap({
    method: 'POST',
    url: 'http://dwz.cn/query.php',
    form: {tinyurl: url}
  }).then(function(obj){
    if (typeof obj === 'string') {
      obj = JSON.parse(obj);
    }
    if(obj.longurl){
      return Promise.resolve(obj.longurl);
    } else {
      return Promise.reject(obj.err_msg);
    }
  });
};

module.exports = tool;