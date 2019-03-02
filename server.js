var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userDao = require('./dao/userDao');
 
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 允许所有的请求形式
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));
 
// 设置请求头
// application/json  接口返回json数据
// charset=utf-8 解决json数据中中文乱码
// app.use("*", function(request, response, next) {
//     response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
//     next();
// });

var dataSuccess = {
	status: '1',
	msg: '登陆成功'
}

var dataError = {
	status: '2',
	msg: '账号或密码错误'
}

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/public/" + "index.html");
})


//Mysql增加用户测试
/*app.get('/addUser', function(req, res, next) {
	console.log("mysql路由");
	userDao.add(req, res, next);
})*/

app.post('/process_login',function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    userDao.Search(req, res);
//    if(username === "xiaoqi" && password === "231034") {
//        res.end(JSON.stringify(dataSuccess));
//    } else {
//    	   res.end(JSON.stringify(dataError));
//    }   
})

app.post('/process_register',function (req, res) {
 
   console.log(req.body.username);
   console.log(req.body.password);
   userDao.add(req, res);
     
})
 
var server = app.listen(8888, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})