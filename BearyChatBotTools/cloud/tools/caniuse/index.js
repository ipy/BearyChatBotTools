// https://github.com/skylerzhang/yong
var yargs = require('yargs');
var request = require('request');
var Promise = require('bluebird');

var tool = {name: 'caniuse'};
tool.run = function(text){
  var argv = yargs
    .alias('b', 'browser')
    .parse(text.split(/\s+/));

  var keywords = argv._;
  var url = 'http://caniuse.jd-app.com/caniuse?keyword='+keywords;
  if(argv.browser) {
    url = url + '&browser=' + argv.browser;
  }

  return new Promise(function(resolve, reject){
    request({
      method:'GET',
      headers:{
        'User-Agent':''
      },
      url: url
    },function(err, res, body){
      if(!err && res.statusCode == 200){
        var json = JSON.parse(body);
        if(json['err'] !== undefined){
          return resolve('无此属性');
        }
        var result = '';
        for(var css in json){
          result += '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\n';
          result += '  (种类:'+json[css].categories+')\n';

          var bro = json[css].stats;
          for(var browser in bro){
            result += ('~' + browser + '\n');

            var ver = json[css]['stats'][browser];

            for(var version in ver){
              if(ver[version] == 'y'){
                result += (' √'+version+':'+ver[version]+'  ');
              } else if (ver[version] == 'n'){
                result += (' ×'+version+':'+ver[version]+'  ');
              } else {
                result += (' -'+version+':'+ver[version]+'  ');
              }
            }
            result += ' \n';
          }
          result += '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n';
          result += ' \n';
        }
        return resolve(result);
      } else if (err){
        return reject(err);
      }
    });
  });
};

module.exports = tool;