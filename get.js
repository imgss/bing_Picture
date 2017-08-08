var fs = require('fs');
var https = require('https');
var http = require('http');
//有水印
https.get('https://cn.bing.com/cnhp/coverstory/', (res) => {
  let info = '';
  res.on('data',(data) =>{
    info += data;
  });
  res.on('end',() => {
    let data = JSON.parse(info);
    console.log(data.imageUrl);
    http.get(data.imageUrl, (res) =>{
      let exist = fs.existsSync('./img/');
      if (!exist) {
        fs.mkdirSync('./img');
      }
      let stream = fs.createWriteStream('./img/' + (new Date()).toLocaleString().split(' ')[0] + 'waterMark.jpg', {
        defaultEncoding: 'binary'
      });
      res.setEncoding('binary');
      res.on('data', (data) => {
        stream.write(data);
      });
      res.on('end', () => {
        stream.end();
        console.log('水印美图下载完成');
      });
    });
  });
});
