# Node.js-instagram
Hexo个人博客进阶-相册，使用nodejs拉取ins上的图片并保存json数据。
## 安装Node.js
http://nodejs.org/download/
## 安装依赖包
npm install
## 运行程序
node app.js

## 如果请求超时


打开app.js  

找到该行
``` javascript
//发送请求
request({uri: baseUrl}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let resData = JSON.parse(body).data;
```

打开你的代理软件查看你的代理端口，以ss为例

![ss](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524073641501&di=9aa9d7a7c1c65e2758e8413cf9780903&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170411%2Ff9736b7bbc6442568b7b803ce7360f5e_th.png)

修改代码为：

``` javascript
//发送请求
request({uri: baseUrl,'proxy':'http://localhost:1080'}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let resData = JSON.parse(body).data;

```

以及

```
//下载方法
var download = function (url, dir, filename) {
  request.head(url, function (err, res, body) {
    request({uri: url,'proxy':'http://localhost:1080'}).pipe(fs.createWriteStream(dir + "/" + filename + ".jpg"));
  });
};
```

由于超时的情况不是所有人都有发生，并且代理端口号根据代理软件的不同也可能不同因此不能直接修改代码，只能视情况添加


