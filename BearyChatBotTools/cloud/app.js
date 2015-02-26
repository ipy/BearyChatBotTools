// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();
var tools = require('cloud/tools')

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/', main);

app.post('/', main);

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();

function main (req, res) {
  var args = req.body.text
    .replace(req.body.trigger_word, '')
    .replace(/^\s+/, '')
    .replace(/\s+$/, '')
    .split(/\s+/);
  var tool = tools.tryRequire(args[0]);
  if (tool) {
    var text = tools.runTool(tool, args.splice(1));
    if (!text) {
      text = '无返回结果';
    }
    res.json({text: text.toString()});
    return;
  }
  res.json({text: '未找到该功能'});
}

