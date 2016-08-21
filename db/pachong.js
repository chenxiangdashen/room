var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var roomModle = require('./dbConnect');

exports.get = function(cb) {
	var url = 'http://www.panda.tv/live_lists?status=2&order=person_num&pagenum=120&pageno=1&token=b902c644602f7b1ca7c6b2e0732f0d49&classification=';
	var url_list = [];
	var list = [];

	async.series({
//		T1: function(callback) {
//			request({
//				url: url,
//				data: {
//					pageno: 1
//				}
//			}, function(err, data, body) {
//				if (err) return console.error(err);
//				var total = JSON.parse(body).data.total;
//
////				for (var a = 1; a <= total / 120; a++) {
////					var uu = 'http://www.panda.tv/live_lists?status=2&order=person_num&pagenum=120&token=b902c644602f7b1ca7c6b2e0732f0d49&classification=&pageno=' + a;
////					url_list.push(uu);
////				}
//				url_list.push(url);
//				callback();
//			});
//		},
		T1: function(callback) {
			console.log('正在抓取' + url + '的数据...');
			request({
				url: url,
				data: {
					pageno: 1
				}
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
				callback();
			});
//			async.eachSeries(url_list, function(arr_url, callback) {
//				console.log('正在抓取' + arr_url + '的数据...');
//				request({
//					url: arr_url
//				}, function(err, data, body) {
//					if (err) return console.error(err);
//					var roomList = JSON.parse(body).data.items
//					for (var i = 0; i < roomList.length; i++) {
//						var _this = roomList[i];
//						var item = {
//							roomName: _this.userinfo.nickName,
//							id: _this.id,
//							buzz: _this.person_num,
//							cate: _this.name,
//							image: _this.pictures.img
//						}
//
//						list.push(item);
//					}
//					callback(err, list);
//				});
//
//			}, function(err) {
//				if (err) return console.error(err.stack);
//				
//				callback();
//			});
			
		},
		T2:function(callback){
			cb(list);
		}
	});	
}