var Promise = require('bluebird');
var toolsConfig = require('cloud/toolsConfig');

function tryRequire (name) {
  if (!name) return undefined;
  var moduleName = 'cloud/tools/' + name;
  try {
    return require(moduleName);
  } catch (e) {
    var aliases = toolsConfig.alias[name];
    if (aliases) {
      if (typeof aliases === 'string') {
        aliases = [aliases];
      }
      for (var i = 0; i < aliases.length; i++) {
        var requiredModule = tryRequire(aliases[i]);
        if (requiredModule) return requiredModule;
      }
    }
    return undefined;
  }
}

function runTool (tool, args) {
  args = args || [];
  if (tool.sub && args.length > 0) {
    for (var subTool in tool.sub) {
      if (subTool === args[0]) {
        return runTool(tool.sub[subTool], args.splice(1));
      }
    }
  }
  if (typeof tool.parser === 'function') {
    try {
      args = tool.parser(args);
    } catch (e) {
      return Promise.reject('参数错误')
    }
  }
  if (typeof tool.func === 'function') {
    return Promise.resolve(tool.func.apply(tool, args));
  } else {
    return Promise.resolve(getToolUsage(tool, args));
  }
};

function getToolUsage (tool, args) {
  tool = tool || {
    usage: '使用 “触发词 usage 工具名” 命令查看用法',
    sub: toolsConfig.tools.reduce(function(seed, toolName){
      seed[toolName] = require('cloud/tools/' + toolName);
      return seed;
    }, {})
  };
  args = args || [];
  if (tool.sub && args.length > 0) {
    for (var subTool in tool.sub) {
      if (subTool === args[0]) {
        return getToolUsage(tool.sub[subTool], args.splice(1));
      }
    }
  }

  var contents = [];
  contents.push(tool.usage + '\n');
  if (tool.sub) {
    contents.push('子方法：');
    Object.keys(tool.sub).forEach(function (key) {
      contents.push('    * ' + key + (tool.sub[key].usage
        ? ('：' + tool.sub[key].usage)
        : ''));
    });
  }
  return contents.join('\n');
};

exports.tryRequire = tryRequire;
exports.runTool = runTool;
exports.getToolUsage = getToolUsage;