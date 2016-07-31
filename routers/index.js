var user=require('../db/dbConnect');


module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index', {
			title: '首页'
		})
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

	app.post('/login', function(req, res) {

		client = user.connect();
		
		user.selectFun(client,req.body.username,function(result){
			if(result[0] === undefined){
				res.json({success:false,message:'没有该用户'})
			}else{
				
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