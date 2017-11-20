var express = require('express'); //获取express构造函数
var querystring = require("querystring");
var bodyParser = require('body-parser'); //作为express的插件
var fs = require("fs");
var app = express();

app.use(express.static('assets')) //指定静态资源路径

app.use(bodyParser.json()) //告诉express你使用了插件
app.use(bodyParser.urlencoded({

	extended: true
})) //处理通过表单提交的数据，放到req对象上面去了

//将文本写入数据库
app.post("/api/address", function(req, res) {
	fs.readFile("assets/address.json", function(err, data) {
		if(err) {
			return console.error(err);
		}
		var txt = data.toString();
		var obj = JSON.parse(txt);
		res.json({
			data: obj
		})
	})

})
app.post("/api/jobs_data", function(req, res) {
	fs.readFile("assets/JobsData.json", function(err, data) {
		if(err) {
			return console.error(err);
		}
		var page = req.body.page;
		var txt = data.toString();
		var obj = JSON.parse(txt);
		if(page !== "0") {
			var obj2 = obj.content.data.page.result.slice((page - 1) * 10, page * 10);
			res.json(obj2)
		} else if(page === "0") {
			res.json(obj.content.data.page.result)

		}
	})
})

app.listen(7777, function() {
	console.log("创建成功！")
})