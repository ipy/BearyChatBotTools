var tools = require('cloud/tools');

module.exports = {
  usage: '输入 “触发词 工具名” 查看使用方法',
  func: function() {
    var args = Array.prototype.slice.call(arguments);
    var tool = args.length === 0
      ? this
      : tools.tryRequire(arguments[0]);
    return tools.getToolUsage(tool, Array.prototype.slice.call(arguments, 1));
  }
}