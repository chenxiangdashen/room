var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var roomModle=require('./dbConnect');

exports.get = function() {
    var url = 'http://www.panda.tv/all';
    var url_list = [];
    var list = [];



    url_list.push(url);
    
    async.eachSeries(url_list, function(arr_url, callback) {
       console.log('正在抓取' + arr_url + '的数据...');
        request(arr_url, function(err, data) {
            if (err) return console.error(err);
            var $ = cheerio.load(data.body.toString());
            $('#later-play-list .video-list-item').each(function() {
                var $me = $(this);
                var item = {
                    roomName : $me.find('.video-title').text(),
                    id : $me.attr('data-id'),
                    buzz :$me.find('.video-number').text(),
                    cate :$me.find('.video-cate').text(),
                    image :$me.find('.video-img').attr('src')
                }
                list.push(item);
            });
            callback(err, list);
        });
    }, function(err) {
        if (err) return console.error(err.stack);
        /*写入数据库*/
        async.eachSeries(list, function(room, callback) {
            console.log('正在写入' + room.roomName + '的数据...');
            var sql = 'insert into ...';
           roomModle.insertRoom(room,function(result){
                if (result.affectedRows == 1) {
                    callback(err);
                }

           });
        }, function(err) {
            if (err) return console.error(err.stack);
            console.log('处理成功！');
        });
    });
}
