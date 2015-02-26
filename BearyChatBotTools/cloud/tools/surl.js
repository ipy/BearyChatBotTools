var request = require('request');
var Promise = require('bluebird');

module.exports = {
  usage: '生成短链接。默认使用 t.cn',
  func: function(url) {
    return this.sub['url.cn'].func.call(this.sub['t.cn'], url);
  },
  sub: {
    't.cn': {
      usage: '新浪微博短网址服务',
      func: function(url) {
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
      }
    },
    'dwz.cn': {
      usage: '百度短网址服务',
      func: function(url) {
        return requestWrap({
          method: 'POST',
          url: 'http://dwz.cn/create.php',
          form: {url: url}
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
      },
      sub: {
        'origin': {
          usage: '将百度短链还原成原地址',
          func: function(url) {
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
          }
        },
        'alias': {
          usage: '自定义别名',
          func: function(alias, url) {
            return requestWrap({
              method: 'POST',
              url: 'http://dwz.cn/create.php',
              form: {url: url, alias: alias}
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
          }
        }
      }
    }
  }
}

function requestWrap (reqOpts) {
  return new Promise(function(resolve, reject){
    request(reqOpts, function(e, r, b) {
      if (e || !b) return reject(e);
      return resolve(b);
    });
  });
}