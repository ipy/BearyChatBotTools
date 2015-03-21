// 在 Cloud code 里初始化 Express 框架
var Promise = require('bluebird');
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

app.get('/*', function (req, res){
  res.end('works.');
});

app.post('/', function(req,res){
  if(!req.body || !req.body.text){
    res.json({text: '请求错误'})
    return;
  }
  console.log(req.body.text);
  tools.
    start(req.body.text.replace(req.body.trigger_word, '').replace(/^\s+/, '')).
    then(function(result){
      res.json({text: result});
    })
    .catch(function(info){
      res.json({text: '执行失败,' + info})
    })
    .finally(function(){
      res.end();
    });
});

app.listen();