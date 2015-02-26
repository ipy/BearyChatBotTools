module.exports = {
  usage: '获取随机内容',
  func: function() {
    return Math.random();
  },
  sub: {
    'int': {
      usage: '随机产生一个整数。默认为 1 到 100. ' +
        '若输入一个数字，范围为 1 到该数字；' +
        '若输入两个数字，范围为这两个数字；' +
        '若输入三个数字，第三个数字为重复次数。',
      func: function (min, max, repeat) {
        var results = [];
        for (var i = 0; i<repeat; i++) {
          results.push(randInt(min, max));
        }
        return results.join('\n');
      },
      parser: function(args){
        var min, max, repeat;
        repeat = 1;
        switch (args.length) {
          case 0:
            min = 1;
            max = 100;
            break;
          case 1:
            min = 1;
            max = parseInt(args[0]);
            break;
          default:
            min = parseInt(args[0]);
            max = parseInt(args[1]);
            if(args.length >= 3) {
              repeat = parseInt(args[2]);
            }
            break;
        }
        console.log(min, max ,repeat);
        return [min, max, repeat];
      }
    },
    'select': {
      usage: '从空格分隔的选项中随机选取一个',
      func: randSelect
    }
  }
}

function randInt(min, max) {
  var range = max - min;
	var rand = Math.floor(Math.random() * (range + 1));
	return min + rand;
}

function randSelect() {
  switch (arguments.length) {
    case 0:
      return;
    case 1:
      return arguments[0];
    default:
      return arguments[randInt(0, arguments.length)];
  }
}