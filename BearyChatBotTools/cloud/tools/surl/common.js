var Promise = require('bluebird');
var request = require('request');

function requestWrap (reqOpts) {
  return new Promise(function(resolve, reject){
    request(reqOpts, function(e, r, b) {
      if (e || !b) return reject(e);
      return resolve(b);
    });
  });
}

exports.requestWrap = requestWrap;