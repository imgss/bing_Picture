const fs = require('fs');
module.exports = function (url) {
  require('https').get(url, (res) => {
    let exist = fs.existsSync('./img/');
    if (!exist) {
      fs.mkdirSync('./img');
    }
    let ext = /.+\.(.+)$/.exec(url);
    let stream = fs.createWriteStream('./img/' + (new Date()).toLocaleString().split(' ')[0] + ext[1], {
      defaultEncoding: 'binary'
    });
    res.setEncoding('binary');
    res.on('data', (data) => {
      stream.write(data);
    });
    res.on('end', () => {
      stream.end();
      console.log('下载完成');
    });
  });
};
