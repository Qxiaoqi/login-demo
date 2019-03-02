//dao/userDao.js
//实现与Mysql交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./userSql');

// var connection = mysql.createConnection($conf.mysql);
var pool = mysql.createPool( $conf.mysql );
//向前端返回结果
var jsonWrite = function(res, ret) {
	if(typeof ret === 'undefined') {
		console.log("ret === undefined");
		console.log("ret =" + ret);
		res.end(JSON.stringify({
			status: '2',
			msg: '操作失败'
		}));
	} else {
		console.log("ret !== undefined");
		console.log(ret);
		res.end(JSON.stringify(ret));
	}
};

module.exports = {
	add: function(req, res) {
		console.log("add方法运行");
		pool.getConnection(function(err, connection) {
			if(err) {
				// console.log("pool报错");
				throw err;
			}
			var param = req.body;
			connection.query($sql.insert, [param.username, param.password], function(err, result) {
				if(result) {
					result = {
						status: 200,
						msg: '增加成功'
					};
				}

				//以json形式，把操作结果返回给前端
				jsonWrite(res, result);

				// 释放连接 
				connection.release();
			})
		})
	},

	Search: function(req, res) {
		console.log("Search方法运行");
		pool.getConnection(function(err, connection) {
			if(err) {
				throw err;
			}
			var param = req.body;
			connection.query($sql.queryByName, [param.username], function(err, result) {
				console.log(result.length);
				if(result) {
					if(result.length !== 0) {
						if(result[0].password === param.password) {
							result = {
								status: 200,
								msg: '密码正确'
							};
						} else {
							result = {
								status: 200,
								msg: '密码错误'
							};
						}
					} else {
						result = {
							status: 500,
							msg: '查询出错'
						};
					}
				}

				//以json形式，把操作结果返回给前端
				jsonWrite(res, result);

				// 释放连接 
				connection.release();
			})
		})
	}
}