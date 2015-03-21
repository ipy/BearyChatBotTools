var request = require('request');
var Promise = require('bluebird');

var tool = {name: 'domain'};
tool.run = function(host){
  var arr = host.split('.');
  var domain = arr.shift();
  var suffix = arr.join('.');
  return new Promise(function(resolve, reject){
    request({
      uri: 'http://www.yumingco.com/api',
      qs: {
        domain: domain,
        suffix: suffix
      }
    }, function(e,r,b){
      if(e||!b) return reject(e);
      b = JSON.parse(b);
      if(!b.status) return reject('查询失败');
      return resolve(b.available ? '可注册' : '不可注册');
    });
  });
};

module.exports = tool;