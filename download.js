const fs = require('fs');
module.exports = function (url) {
  const client = /https/.test(url) ? require('https') : require('http');
  client.get(url, (res) => {
    let exist = fs.existsSync('./img/');
    if (!exist) {
      fs.mkdirSync('./img');
    }
    console.log(exist);
    let ext = /.+\.(.+)$/.exec(url);
    let stream = fs.createWriteStream('./img/' + (new Date()).toLocaleString().split(' ')[0] + '.' + ext[1], {
      defaultEncoding: 'binary'
    });
    res.setEncoding('binary');
    res.on('data', (data) => {
      stream.write(data);
      console.log('已下载', stream.bytesWritten/1024, 'KB');
    });
    res.on('end', () => {
      stream.end();
      console.log('下载完成');
    });
  });
};
