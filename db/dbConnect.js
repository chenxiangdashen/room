var mysql=require('mysql');

function connectServer(){
	var client = mysql.createConnection({
		host:'localhost',
		user:'test',
		password:'',
		database:'test'
	});
	return client;
}


 function  selectFun(client,username,callback){
     //client为一个mysql连接对象
    client.query('select password from users where name="'+username+'"',function(err,results,fields){
         if(err) throw err;

         callback(results);
     });
 }

exports.connect = connectServer;
exports.selectFun = selectFun;