var Promise = require('bluebird');

module.exports = {
  usage: '数值之间的转换',
  sub: {
    'hex2rgb': {
      usage: '将 16 进制颜色值转为 RGB 表示',
      parser: function(args) {
        var hex;
        if(!args || args.length === 0 || !(hex = args[0])
          || typeof hex !== 'string'
          || !hex.match(/^#?(([0-9a-fA-F]{1}){3}|([0-9a-fA-F]{2}){3})$/)) {
          throw new Error();
        }
        if (hex[0] === '#') hex = hex.slice(1);
        var step = hex.length / 3;
        var result = [];
        for(var i = 0; i<hex.length; i = i+step) {
          var x = hex.slice(i, i + step);
          if (step === 1) x = x + x;
          result.push(x);
        }
        return result.map(function(x){
          return parseInt(x, 16);
        });
      },
      func: function() {
        return 'rgb(' + Array.prototype.join.call(arguments, ',') + ')';
      }
    }
  }
}