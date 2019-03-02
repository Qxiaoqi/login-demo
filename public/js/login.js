var showRegister = function() {
	console.log("s");
	$(".overlay").css("display","block");
	$(".register-box").css("display","block");
}

var closeRegister = function() {
	$(".overlay").css("display","none");
	$(".register-box").css("display","none");
}

var loginAjax = function() {
	var username = $("#Username").val();
	var password = $("#Password").val();
	var userData = {
		"username": username,
		"password": password
	}
	userData = JSON.stringify(userData);
	$.ajax({
		url: "http://127.0.0.1:8888/process_login",
		type: "POST",
		datatype: "JSON",
		contentType: "application/json; charset=utf-8",
		data: userData,
		success: function(data, status) {
			console.log(data);
			if(data.status === "1") {
				alert("登陆成功");	
			} else if(data.status === "2") {
				alert("账号或密码错误");
			}
		}
	})
}

var registerAjax = function(username, password) {
	var registerUser = {
		"username": username,
		"password": password
	}
	registerUser = JSON.stringify(registerUser);
	$.ajax({
		url: "http://127.0.0.1:8888/process_register",
		type: "POST",
		datatype: "JSON",
		contentType: "application/json; charset=utf-8",
		data: registerUser,
		success: function(data, status) {
			console.log(data);
		}
	})
}

var registerCheck = function() {
	var username = $("#register-username").val();
	var password1 = $("#register-password").val();
	var password2 = $("#register-repassword").val();
	if(password1 === password2) {
		registerAjax(username, password1);
	} else {
		alert("两次输入密码不一致");
	}
}

$(document).ready(function() {
	$("#login-button").click(function() {
		loginAjax();
	});
	$("#register-new").click(function() {
		showRegister();
	});
	$(".close-box").click(function() {
		closeRegister();
	})
	$(".register-button").click(function() {
		registerCheck();
	})
});