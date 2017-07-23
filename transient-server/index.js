//Imports Only

const express = require('express');
const path = require('path');
const bp = require('body-parser');
const cp = require('cookie-parser');
const UL = require('express-fileupload');
const fs = require('fs');
const ck = require('chokidar');
const si = require('serve-index');
const morgan = require('morgan');
var watcher = require('./watcher.js');
var config = require('./transient-config.js');

//Initialize the Express Session
var app = express();
var configPath = path.join(__dirname, 'transient-config');
var watcherList = [];

//Get the defined port to listen for requests.
var port = process.env.PORT || 3000;
for(let location of config.locations){
  watcher.createWatcher(location.outGoing, location.location);
}


//Middleware

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined',{stream: accessLogStream}));
app.use(UL());
app.use(bp.json());
app.use(bp.urlencoded());
app.use(cp());
app.set('views', 'views');
app.set('view engine', 'pug');

//static file shares
app.use('/shares', si(path.join(__dirname, 'shares'), {'icons': true}));
app.use('/shares', express.static(path.join(__dirname, 'shares')));
//routes

app.get('/',(req, res)=> {
  var loc = req.query.location;
  var trans = req.query.transmission;

  for(let watch in watcherList){
    if(watch.watcherName === loc){
      if(watch.files.length > 0){
        var filePath = watch.files[0].filePath;
        var filearr = filePath.split('\\');
        var fileName = filearr[-1];
        res.sendFile(filePath, fileName);
      }else{
        res.send('Sorry there are no files to pick up....');
      }
    }
  }




  // var file = '';
//   var fPath = '';
//   for(let location of config.locations){
//     if(location === loc){
//
//     }
//   }
//   console.log(`${req.query.location} \n${req.query.transmission}`);
//   if((loc === 'CA') &&(trans === 'receive')){
//       // console.log('got Canada');
//       fPath = config.locations[2].canada.outGoing;
//       // console.log(file);
//   }else if((loc==='CA')&&(trans === 'send')){
//       fPath = config.locations[2].canada.inComing;
//   }else if((loc==='NY')&&(trans === 'receive')){
//     fPath = config.locations[0].newYork.outGoing;
//   }else if((loc === 'NY')&&(trans === 'send')){
//     fPath = config.locations[0].newYork.inComing;
//   }else if((loc === 'KC')&&(trans === 'receive')){
//     fPath = config.locations[1].kansasCity.outGoing;
//   }else if((loc === 'KC')&&(trans === 'send')){
//     fPath = config.locations[1].kansasCity.inComing;
//  }else if((loc === 'FT')&&(trans === 'receive')){
//     fPath = config.locations[3].forTest.outGoing;
// }else if((loc === 'FT')&&(trans === 'send')){
//   fPath = config.locations[3].forTest.inComing;
// }
//   var filename = '';
//   var today = new Date();
//   var mm = today.getMonth()+1;
//   var dd = today.getDate();
//   var yy = today.getYear();
//   console.log(`${mm}-${dd}-${yy}`);
//   if(mm<10){
//     mm = '0' + mm;
//   }
//   if(dd<10){
//     dd = '0' + dd;
//   }
//   if(yy>100){
//     yy -= 100;
//   }
//   console.log(`${mm}${dd}${yy}`);
//   if(loc === 'CA'){
//     filename = mm + dd + yy + '08.exp';
//   }else if(loc==='KC'){
//     filename = mm + dd + yy + '01.exp';
//   }else if(loc === 'NY'){
//     filename = mm + dd + yy + '05.exp';
//   }else if(loc === 'FT'){
//     filename = mm + dd + yy + '02.exp';
//   }
//   console.log(fPath);
//   console.log(filename);
//   var thisPath = path.join(fPath, filename);
//   if(trans === 'receive'){
//     res.setHeader('content-type', 'application/text');
//     res.download(thisPath, `${filename}`);
//
//  }else{
//   res.end(`${req.query.location} \n${req.query.transmission}\nWas not found.`);
//  }
  // console.log(config.locations[0][0]);
  // var loc = req.query.location;
  // var sendinglocation;
  // fPath = '';
  // for(var i=0;i<config.locations.length;i++) {
  //   console.log(config.locations[0][i]);
  //   var tempLoc = config.locations[0][i];
  //   console.log(tempLoc) ;
    // console.log(`Location in Config: ${config.locations[0][i].locCode}\nLocation in URL: ${loc}`)
    // if(config.locations[0][i].locCode === loc){
    //   sendinglocation = config.locations[i];
    //   break;
    // }
  // }
  // console.log(sendinglocation);
  // res.send('all good bro');
});
app.post('/', (req, res) => {
  console.log(`Got a Request to save a file: ${req.files.responseFile.name}`);
  var filePath = '';
  if(req.query.location === 'CA') {
    filePath = config.locations[2].canada.inComing;
  }else if(req.query.location === 'NY') {
    filePath = config.locations[0].newYork.inComing;
  }else if(req.query.location === 'KC') {
    filePath = config.locations[1].kansasCity.inComing;
  }else if(req.query.location === 'FT') {
    filePath = config.locations[3].forTest.inComing;
  }
  filePath = path.join(filePath, req.files.responseFile.name);
  fs.writeFile(filePath, req.files.responseFile.data, (err)=> {
    if(err){
      console.error(`There was an issue with the file with an error code of: ${err}`);
    }
    res.send('File Send successful');
  });
});



//Launches the server and begins listening.
app.listen(port, (err)=>{
  if(err){
    console.log(err.toString());
  }
  console.log(`Transient Running and Listening for requests on port:${port}`);
});
