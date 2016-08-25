var mysql = require('mysql');

function connectServer() {
	var client = mysql.createConnection({
		host: 'localhost',
		user: 'test',
		password: '',
		database: 'test'
	});
	return client;
}

function selectFun(client, username, callback) {
	//client为一个mysql连接对象
	client.query('select password from users where name="' + username + '"', function(err, results, fields) {
		if (err) throw err;

		callback(results);
	});
}

function insertRoom(room, callback) {

	//	var connection = mysql.createConnection({
	//		host: 'localhost',
	//		user: 'test',
	//		password: '',
	//		database: 'test'
	//	});

	var pool = mysql.createPool({
		host: 'localhost',
		user: 'test',
		password: '',
		database: 'test'
	});

	pool.getConnection(function(err, connection) {
		if (err) throw err;

		connection.connect();
		var roomAddSql = 'INSERT INTO room(roomId,roomName,cate,buzz,image) VALUES(?,?,?,?,?)';
		var roomAddSql_Params = [room.id, room.roomName, room.cate, room.buzz, room.image];
		// 执行sql
		connection.query(roomAddSql, roomAddSql_Params, function(err, result) {
			connection.release();
			connection.end();
			if (err) {
				console.log('[INSERT ERROR] - ', err.message);
				return;
			}
			//	       console.log('-------INSERT----------');
			//console.log('INSERT ID:',result.insertId);       
			//	       console.log('INSERT ID:',result);       
			//	       console.log('#######################'); 
			callback(result)
		});
		// 释放此连接
		
		
	});

//	connection.connect();
//	var roomAddSql = 'INSERT INTO room(id,roomName,cate,buzz,image) VALUES(?,?,?,?,?)';
//	var roomAddSql_Params = [room.id, room.roomName, room.cate, room.buzz, room.image];
//	//增 add
//	// client.connect();
//	connection.query(roomAddSql, roomAddSql_Params, function(err, result) {
//		if (err) {
//			console.log('[INSERT ERROR] - ', err.message);
//			return;
//		}
//		//	       console.log('-------INSERT----------');
//		//console.log('INSERT ID:',result.insertId);       
//		//	       console.log('INSERT ID:',result);       
//		//	       console.log('#######################'); 
//		callback(result)
//	});
//	connection.end();

}

exports.connect = connectServer;
exports.selectFun = selectFun;
exports.insertRoom = insertRoom;