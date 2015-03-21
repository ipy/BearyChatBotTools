var request = require('request');
var Promise = require('bluebird');

var tool = {name: 'weather'};
tool.run = function(citypinyin){
  return new Promise(function(resolve, reject){
    request({
      uri: 'http://apistore.baidu.com/microservice/weather',
      qs: {citypinyin: citypinyin}
    }, function(e,r,b){
      if(e||!b) return reject(e);
      b = JSON.parse(b);
      if(b.errNum !== 0) return reject(b.errMsg);
      var d = b.retData;
      return resolve([
        '城市: ' + d.city,
        '时间: ' + d.date + ' ' + d.time,
        '天气: ' + d.weather,
        '温度: ' + d.temp + '℃',
        '最低: ' + d.l_tmp + '℃',
        '最高: ' + d.h_tmp + '℃',
        '风向: ' + d.WD + ' ' + d.WS,
        '日出: ' + d.sunrise,
        '日落: ' + d.sunset
      ].join('\n'));
    });
  });
};

module.exports = tool;