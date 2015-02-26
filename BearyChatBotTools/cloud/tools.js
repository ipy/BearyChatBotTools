var toolsConfig = require('./toolsConfig');

exports.tryRequire = function tryRequire (name) {
  if (!name) return undefined;
  var moduleName = 'tools/' + name;
  try {
    return require(name);
  } catch (e) {
    var aliases = toolsConfig.alias[name];
    if (typeof aliases === 'string') {
      aliases = [aliases];
    }
    for (var i = 0; i < aliases.length; i++) {
      var requiredModule = tryRequire(aliases[i]);
      if (requiredModule) return requiredModule;
    }
    return undefined;
  }
}

exports.runTool = function runTool (tool, args) {
  args = args || [];
  if (tool.sub && args.length > 0) {
    for (var subTool in tool.sub) {
      if (subTool === args[0]) {
        return runTool(tool.sub[subTool], args.splice(1));
      }
    }
  }
  if (typeof tool.parser === 'function') {
    args = tool.parser(args);
  }
  if (typeof tool.func === 'function') {
    return tool.func.apply(tool, args);
  }
}

exports.getToolUsage = function getToolUsage (tool, args) {
  args = args || [];
  if (tool.sub && args.length > 0) {
    for (var subTool in tool.sub) {
      if (subTool === args[0]) {
        return getToolUsage(tool.sub[subTool], args.splice(1));
      }
    }
  }
  return tool.usage;
}