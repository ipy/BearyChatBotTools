var Promise = require('bluebird');
var requestWrap = require('cloud/tools/surl/common').requestWrap;

var tool = {name: 'surl t.cn'};
tool.run = function(url){
  if(url.slice(0,4).toLowerCase() !== 'http'){
    url = 'http://' + url;
  }
  return requestWrap({
    method: 'GET',
    url: 'http://api.t.sina.com.cn/short_url/shorten.json',
    qs: {
      source: 4208038691,
      url_long: url          }
  }).then(function(obj){
    if (typeof obj === 'string') {
      obj = JSON.parse(obj);
    }
    if (obj && obj.length > 0 && obj[0].url_short) {
      return Promise.resolve(obj[0].url_short);
    } else if (obj && obj.length > 0) {
      return Promise.reject(obj[0].error);
    } else {
      return Promise.reject();
    }
  });
};

module.exports = tool;