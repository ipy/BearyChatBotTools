var request = require('request');
var Promise = require('bluebird');

var tool = {name: 'ip'};
tool.run = function(ip){
  return new Promise(function(resolve, reject){
    request({
      uri: 'http://apistore.baidu.com/microservice/iplookup',
      qs: {ip: ip}
    }, function(e,r,b){
      if(e||!b) return reject(e);
      b = JSON.parse(b);
      if(b.errNum !== 0) return reject(b.errMsg);
      var d = b.retData;
      return resolve([d.country, d.province, d.city, d.district, d.carrier].join(' '));
    });
  });
};

module.exports = tool;