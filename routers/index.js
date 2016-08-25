var userModal = require('../db/dbConnect');

// var config = require('../config.json');

var dy = require('../db/pachong-dy');
var pt = require('../db/pachong-pt');


module.exports = function(app) {
	var data = {
			title: '首页'
		};
	app.get('/', function(req, res) {
		
		if (req.session.user) {
			data.username = req.session.user.username;
			data.isLogin = true;
		}

		dy.get(function(list) {
			data.list = list;
			res.render('index', data)
		});
		

	});

	// app.get('/pandaTv', function(req, res) {
	// 	pt.get(function(list) {
	// 		data.link='http://www.panda.tv';
	// 		data.list = list;
	// 		res.render('index', data)
	// 	});
	// });

	// app.get('/douyuTv', function(req, res) {
	// 	dy.get(function(list) {
	// 		data.link='http://www.douyu.com';
	// 		data.list = list;
	// 		res.render('index', data)
	// 	});
	// });



	app.get('/login', function(req, res) {
		res.render('login', {
			title: '登陆'
		})
	});

	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '注册'
		})
	});

	app.get('/logout', function(req, res) {
		req.session.user = null;
		res.redirect('/'); //登陆成功后跳转到主页
	});

	app.post('/login', function(req, res) {

		client = userModal.connect();

		userModal.selectFun(client, req.body.username, function(result) {
			if (result[0] === undefined) {
				res.json({
					success: false,
					message: '没有该用户'
				})
			} else {
				if (req.body.password == result[0].password) {
					req.session.user = {
						username: req.body.username
					}
					res.redirect('/'); //登陆成功后跳转到主页
				}
			}
		});

		//		res.redirect('/'); //登陆成功后跳转到主页

	});
}

//
//app.get('/reg', checkNotLogin);
//app.get('/reg', function (req, res) {
//  res.render('reg', {
//    title: '注册',
//    user: req.session.user,
//    success: req.flash('success').toString(),
//    error: req.flash('error').toString()
//  });
//});