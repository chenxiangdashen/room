var userModal = require('../db/dbConnect');
var pc = require('../db/pachong-dy');

module.exports = function(app) {

	app.get('/', function(req, res) {
		var data = {
			title: '首页'
		};
		if (req.session.user) {
			data.username = req.session.user.username;
			data.isLogin = true;
		}

			pc.get(function(list) {
				data.list = list;
				req.session.list = list;
				res.render('index', data)
			});
		

	});

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