var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var roomModle = require('./dbConnect');

exports.get = function() {
	var url = 'http://www.panda.tv/live_lists?status=2&order=person_num&pagenum=120&token=b902c644602f7b1ca7c6b2e0732f0d49&classification=';
	var url_list = [];
	var list = [];

	async.series({
		T1: function(callback) {
			request({
				url: url,
				data: {
					pageno: 1
				}
			}, function(err, data, body) {
				if (err) return console.error(err);
				var total = JSON.parse(body).data.total;

				for (var a = 1; a <= total / 120; a++) {
					var uu = 'http://www.panda.tv/live_lists?status=2&order=person_num&pagenum=120&token=b902c644602f7b1ca7c6b2e0732f0d49&classification=&pageno=' + a;
					url_list.push(uu);
				}

				callback();
			});
		},
		T2: function(callback) {
			async.eachSeries(url_list, function(arr_url, callback) {
				console.log('正在抓取' + arr_url + '的数据...');
				request({
					url: arr_url
				}, function(err, data, body) {
					if (err) return console.error(err);
					var roomList = JSON.parse(body).data.items
					for (var i = 0; i < roomList.length; i++) {
						var _this = roomList[i];
						var item = {
							roomName: _this.userinfo.nickName,
							id: _this.id,
							buzz: _this.person_num,
							cate: _this.name,
							image: _this.pictures.img
						}

						list.push(item);
					}
					callback(err, list);
				});

			}, function(err) {
				if (err) return console.error(err.stack);
				
				callback();
			});
			
		},
		T3:function(callback){
			
			for ( var i =0 ; i<list.length;i++ ){
				console.log('正在写入第 ----'+ i+'--------------' + list[i].roomName + '的数据...');
				
					roomModle.insertRoom(list[i], function(result) {
						if (result.affectedRows == 1) {
							
						}
					});
			}
			
//				async.eachSeries(list, function(room, callback2) {
////					console.log('正在写入' + room.roomName + '的数据...');
//					roomModle.insertRoom(room, function(result) {
//						if (result.affectedRows == 1) {
//							callback2();
//						}
//					});
//				}, function(err) {
//					if (err) return console.error(err.stack);
//					console.log('处理成功！');
//				});
		}
		
		
	});

//	async.eachSeries([url], function(arr_url, callback) {
//		request({
//			url: arr_url,
//			data: {
//				pageno: 1
//			}
//		}, function(err, data, body) {
//			if (err) return console.error(err);
//			var total = JSON.parse(body).data.total;
//
//			for (var a = 1; a <= total / 120; a++) {
//				var uu = 'http://www.panda.tv/live_lists?status=2&order=person_num&pagenum=120&token=b902c644602f7b1ca7c6b2e0732f0d49&classification=&pageno=' + a;
//				url_list.push(uu);
//			}
//
//			callback(err, url_list);
//		});
//	}, function(err) {
//		if (err) return console.error(err.stack);
//		async.eachSeries(url_list, function(arr_url, callback) {
//			console.log('正在抓取' + arr_url + '的数据...');
//			request({
//				url: arr_url
//			}, function(err, data, body) {
//				if (err) return console.error(err);
//				var roomList = JSON.parse(body).data.items
//				for (var i = 0; i < roomList.length; i++) {
//					var _this = roomList[i];
//					var item = {
//						roomName: _this.userinfo.nickName,
//						id: _this.id,
//						buzz: _this.person_num,
//						cate: _this.name,
//						image: _this.pictures.img
//					}
//
//					list.push(item);
//				}
//				console.log(list)
//				callback(err, list);
//			});
//
//		}, function(err) {
//			async.eachSeries(list, function(room, callback) {
//				console.log('正在写入' + room.roomName + '的数据...');
//				roomModle.insertRoom(room, function(result) {
//					if (result.affectedRows == 1) {
//						callback(err);
//					}
//				});
//			}, function(err) {
//				if (err) return console.error(err.stack);
//				console.log('处理成功！');
//			});
//		});
//	});
}