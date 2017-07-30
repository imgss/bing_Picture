var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: false });
var fs = require('fs');
var https = require('https');

nightmare
  .goto('https://cn.bing.com')
  .wait(1000)
  .evaluate(function () {
    return getComputedStyle(document.querySelector('#bgDiv')).backgroundImage;
  })
  .end()
  .then(function (result) {
    console.log(result);
    let re = /url\("(.+?)\"\)/
    re.test(result)
    https.get(RegExp.$1,(res) => {
      let chunk = '',
        stream = fs.createWriteStream('./img/' + (new Date()).toLocaleString().split(' ')[0] + '.jpg',{
        defaultEncoding : 'binary'
      } )
      res.setEncoding("binary"); 
      res.on('data',(data) => {
        stream.write(data);
        //chunk+=data
      })
      res.on('end', () => {
        stream.end()
        // fs.writeFile(Date.now() + '.jpg', chunk, "binary", (err)=>{
        //   console.log('ok')
        // })
      })
    })
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });