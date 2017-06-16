// Import Modules
var fs = require('fs');
var ck = require('chokidar');
var http = require('http');
var sa = require('superagent');
var path = require('path');
var url = require('url');
var del = require('del');
var config = require('./transient-config');

//process mode of application
var mode = process.argv[2];
if (mode === 'w') {
  //provide chokidar code to watch for the file
  var watcher = ck.watch(config.watch.folder, {
    ignored: /[\/\\]\./,
    persistent: true
  });
  watcher.on('add', (fpath) => {
    sa.post(config.watch.transUrl).attach('responseFile', fpath, `${fpath}`).end((res) => {
      console.log(res);
    });
  });

} else if (mode === 'r') {
  var file_url = `${config.poll.transUrl}/?location=${config.location}&transmission=${config.poll.transmission}`;
  var download_path = config.poll.folder;
  var filename = setFileName();
  http.get(file_url, (res) => {
  const filePath = path.join(download_path, filename);
  const writeStream = fs.createWriteStream(filePath);
  res.pipe(writeStream)
    .on('error', (e) => console.error(e))
    .on('close', () => console.log(`file was saved to ${filePath}`));
  });
  // var file_url = `${config.poll.transUrl}/?location=${config.location}&transmission=${config.poll.transmission}`;
  // console.log(file_url);
  // var download_path = config.poll.folder;
  // var fileContent = '';
  // var filename = setFileName();
  // var fileStream = fs.createWriteStream(path.join(download_path , filename));
  // http.get(file_url, (res) => {
  //   res.on('data', (data) => {
  //     fileContent += data.toString();
  //   }).on('end', () => {
  //     fs.writeFile(path.join(download_path, filename), fileContent, (err) => {
  //       if (err) {
  //         return console.error(err);
  //       }
  //       console.log('file was saved');
  //     });
  //   });
  //   //provide code to process the API call
  //   //provide code to place file in the appropriate spot
  //   //provide code to call API to delete the file
  // });
}
function setFileName() {
  var filename = '';
  var today = new Date();
  var mm = today.getMonth() + 1;
  var dd = today.getDate();
  var yy = today.getYear();
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (yy > 100) {
    yy -= 100;
  }
  if (config.location === 'CA') {
    filename = mm + dd + yy + '08.exp';
  } else if (config.location === 'KC') {
    filename = mm + dd + yy + '01.exp';
  } else if (config.location === 'NY') {
    filename = mm + dd + yy + '05.exp';
  }else if (config.location === 'FT'){
    filename = mm + dd + yy + '02.exp';
  }
  return filename;
}
