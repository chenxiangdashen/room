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

function deleteRoom (client , callback){
	client.query('delete from room',function(err,results,fields){
		if(err) throw err;
		callback(results)
	})
}

var pool = mysql.createPool({
		host: 'localhost',
		user: 'test',
		password: '',
		database: 'test'
	});


																						
function insertRoom(room, callback) {
	pool.getConnection(function(err, connection) {
		if (err) throw err;														
		var roomAddSql = 'INSERT INTO room(roomId,roomName,cate,buzz,image) VALUES(?,?,?,?,?)';
		var roomAddSql_Params = [room.id, room.roomName, room.cate, room.buzz, room.image];
		// 执行sql
		connection.query(roomAddSql, roomAddSql_Params, function(err, result) {
			
			if (err) {
				console.log('[INSERT ERROR] - ', err.message);
				return;
			}else{
				
				callback(result)
			}

			connection.release();
			
		});
	});
}

function updateRoom(room, callback) {
	pool.getConnection(function(err, connection) {
		if (err) throw err;																																
		var roomUpdateSql = "UPDATE room SET cate=?, buzz=? , image =? WHERE roomId =?";
		var roomUpdateSql_Params = [room.cate,room.buzz,room.image,room.id]
		// 执行sql
		connection.query(roomUpdateSql, roomUpdateSql_Params, function(err, result) {
			
			if (err) {
				console.log('[UPDATE ERROR] - ', err.message);
				return;
			}else{
				
				callback(result)
			}

			connection.release();
			
		});
	});
}

exports.connect = connectServer;
exports.deleteRoom = deleteRoom;
exports.selectFun = selectFun;
exports.insertRoom = insertRoom;
exports.updateRoom = updateRoom;