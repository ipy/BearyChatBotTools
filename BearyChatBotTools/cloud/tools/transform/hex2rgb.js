var tool = {name: 'transform hex2rgb'};
tool.run = function(hex){
  var hex;
  if(!hex.match(/^#?(([0-9a-fA-F]{1}){3}|([0-9a-fA-F]{2}){3})$/)) {
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
  var args = result.map(function(x){
    return parseInt(x, 16);
  });
  return 'rgb(' + args.join(',') + ')';
};

module.exports = tool;