/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 2017/2/7
 * Time: 上午10:53
 */

//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');

//目标网址
//在此处替换你的user_id，和token
var baseUrl = 'https://api.instagram.com/v1/users/5966266014/media/recent/?access_token=5966266014.5de2ba7.11c7d8b7da5b4587b9843e25c5f535be';

//本地存储目录
//注意，我的最终目录是在source目录底下
var dir = 'F:/Blog/blog-backups/hushhw.github.io/source/assets/img/photo';

//创建目录
mkdirp(dir, function (err) {
  if (err) {
    console.log(err);
  }
});

//发送请求
request({uri: baseUrl,'proxy':'http://localhost:9667'}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let resData = JSON.parse(body).data;

    resData.forEach(function (value, index) {
    	let i=0;
    	let imgCar = value.carousel_media;
    	if(imgCar){
    		imgCar.forEach(function (value1, index) {
    		let imgSrc = value1.images.standard_resolution.url;
      		console.log('正在下载原图' + imgSrc);
      		download(imgSrc, dir, value.id+'_'+i);
      		i++;
      		console.log('下载完成');
    		});
    	} else {
    		let imgSrc = value.images.standard_resolution.url;
      		console.log('正在下载原图' + imgSrc);
      		download(imgSrc, dir, value.id+'_'+i);
      		console.log('下载完成');
    	}
    });

    resData.forEach(function (value, index) {
    	let j=0;
    	let imgCar = value.carousel_media;
    	if(imgCar){
    		imgCar.forEach(function (value1, index) {
    		let thumbnailSrc = value1.images.thumbnail.url;

      		console.log('正在下载压缩图' + thumbnailSrc);
      		download(thumbnailSrc, dir, value.id +'_' + j + '.min');
      		j++;
      		console.log('下载完成');
      		});
    	} else {
    		let thumbnailSrc = value.images.thumbnail.url;

      		console.log('正在下载压缩图' + thumbnailSrc);
      		download(thumbnailSrc, dir, value.id +'_' + j + '.min');
      		console.log('下载完成');
    	}
    	
    });

    //获取的json数据保存到本地备用
    fs.writeFile('F:/Blog/blog-backups/hushhw.github.io/source/instagram/ins.json',body,function(err){
      if(err) throw err;
      console.log('write JSON into TEXT');
    });
  }
});

/*
//发送请求
request({uri: baseUrl,'proxy':'http://localhost:9667'}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let resData = JSON.parse(body).data;

    resData.forEach(function (value, index) {
      let imgSrc = value.images.standard_resolution.url;

      console.log('正在下载原图' + imgSrc);
      download(imgSrc, dir, value.id);
      console.log('下载完成');
    });

    resData.forEach(function (value, index) {
      let thumbnailSrc = value.images.thumbnail.url;

      console.log('正在下载压缩图' + thumbnailSrc);
      download(thumbnailSrc, dir, value.id + '.min');
      console.log('下载完成');
    });

    //获取的json数据保存到本地备用
    fs.writeFile('F:/Blog/blog-backups/hushhw.github.io/source/instagram/ins.json',body,function(err){
      if(err) throw err;
      console.log('write JSON into TEXT');
    });
  }
});
*/


//下载方法
var download = function (url, dir, filename) {
  request.head(url, function (err, res, body) {
    request({uri: url,'proxy':'http://localhost:9667'}).pipe(fs.createWriteStream(dir + "/" + filename + ".jpg"));
  });
};
