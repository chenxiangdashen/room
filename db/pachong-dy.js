var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var roomModle = require('./dbConnect');

exports.get = function(cb) {
	var url = 'http://www.douyu.com/directory/columnRoom/game?page=1&isAjax=1';
	var url_list = [];
	var list = [];

	async.series({
		T1: function(callback) {
			console.log('正在抓取' + url + '的数据...');
			request(url, function(err, data) {
				if (err) return console.error(err);
				var $ = cheerio.load(data.body.toString());
				$('li').each(function() {
					var $me = $(this);
					var item = {
						roomName: $me.find('.mes-tit h3').text(),
						id: $me.attr('data-rid'),
						buzz: $me.find('.dy-num').text(),
						cate: $me.find('.mes-tit span').text(),	
						image: $me.find('img').attr('src')
					}
					list.push(item);
				});
				callback();
			});
		},
		T2: function(callback) {
			cb(list);
		}
	});
}