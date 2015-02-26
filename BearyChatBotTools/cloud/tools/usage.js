var tools = require('../tools');

module.exports = tool;

var tool = {
  usage: '',
  func: function() {
    if (arguments.length === 0) {
      return this.usage;
    } else {
      var tool = tools.tryRequire(arguments[0]);
      return tools.getToolUsage(tool, Array.prototype.slice.call(arguments, 1));
    }
  }
}