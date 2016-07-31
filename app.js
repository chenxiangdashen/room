var app = require('express')();
var express= require('express');
var path = require('path');


var http = require('http').Server(app);


var hbs = require('hbs');
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static('public'));

var bodyParser = require('body-parser');

var multer = require('multer');

var session = require('express-session');

app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*10 //过期时间设置(单位毫秒)
  }
}));
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());

 var routes = require('./routers/index');


routes(app);


http.listen(8080, function(){
	console.log('listen on the 8080')
});