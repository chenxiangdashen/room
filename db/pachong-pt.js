var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var roomModle = require('./dbConnect');

// 加载File System读写模块  
var fs = require('fs');  
// 加载编码转换模块  
var iconv = require('iconv-lite');   
  
var file = "d:\\a.json";  



//这个是 测试
exports.get = function(cb) {
	var url = 'http://www.panda.tv/live_lists?status=2&order=person_num&pagenum=120&pageno=1&token=b902c644602f7b1ca7c6b2e0732f0d49&classification=';
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
				url_list.push(url);
				callback();
			});
		},
		T2: function(callback) {
			console.log('正在抓取' + url + '的数据...');
			// request({
			// 	url: url,
			// 	data: {
			// 		pageno: 1
			// 	}
			// }, function(err, data, body) {
			// 	if (err) return console.error(err);
			// 	var roomList = JSON.parse(body).data.items
			// 	for (var i = 0; i < roomList.length; i++) {
			// 		var _this = roomList[i];
			// 		var item = {
			// 			roomName: _this.userinfo.nickName,
			// 			id: _this.id,
			// 			buzz: _this.person_num,
			// 			cate: _this.name,
			// 			image: _this.pictures.img
			// 		}
			
			// 		list.push(item);
			// 	}
			// 	callback();
			// });
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
			console.log(list.length)

            for(var i =0 ; i<list.length;i++){
                roomModle.insertRoom();
            }


            // 
            // var str = JSON.stringify(list);
            // // 把中文转换成字节数组  
            // var arr = iconv.encode(str, 'gbk');  
            // console.log(arr);  
              
            // // appendFile，如果文件不存在，会自动创建新文件  
            // // 如果用writeFile，那么会删除旧文件，直接写新文件  
            // fs.appendFile(file, arr, function(err){  
            //     if(err)  
            //         console.log("fail " + err);  
            //     else  
            //         console.log("写入文件ok");  
            // });      // 
		}
	});	
}