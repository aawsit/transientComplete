//Imports Only

const express = require('express');
const bp = require('body-parser');
const cp = require('cookie-parser');
const UL = require('express-fileupload');
var config = require('./transient-config');
const path = require('path');
const fs = require('fs');

//Initialize the Express Session
var app = express();

//Get the defined port to listen for requests.
var port = process.env.PORT || 5000;



//Middleware
app.use(UL());
app.use(bp.json());
app.use(bp.urlencoded());
app.use(cp());


//routes

app.get('/',(req, res)=> {
  var loc = req.query.location;
  var trans = req.query.transmission;
  // var file = '';
  var fPath = '';
  console.log(`${req.query.location} \n${req.query.transmission}`);
  if((loc === 'CA') &&(trans === 'receive')){
      // console.log('got Canada');
      fPath = config.locations[2].canada.outGoing;
      // console.log(file);
  }else if((loc==='CA')&&(trans === 'send')){
      fPath = config.locations[2].canada.inComing;
  }else if((loc==='NY')&&(trans === 'receive')){
    fPath = config.locations[0].newYork.outGoing;
  }else if((loc === 'NY')&&(trans === 'send')){
    fPath = config.locations[0].newYork.inComing;
  }else if((loc === 'KC')&&(trans === 'receive')){
    fPath = config.locations[1].kansasCity.outGoing;
  }else if((loc === 'KC')&&(trans === 'send')){
    fPath = config.locations[1].kansasCity.inComing;
 }else if((loc === 'FT')&&(trans === 'receive')){
    fPath = config.locations[3].forTest.outGoing;
}else if((loc === 'FT')&&(trans === 'send')){
  fPath = config.locations[3].forTest.inComing;
}
  var filename = '';
  var today = new Date();
  var mm = today.getMonth()+1;
  var dd = today.getDate();
  var yy = today.getYear();
  console.log(`${mm}-${dd}-${yy}`);
  if(mm<10){
    mm = '0' + mm;
  }
  if(dd<10){
    dd = '0' + dd;
  }
  if(yy>100){
    yy -= 100;
  }
  console.log(`${mm}${dd}${yy}`);
  if(loc === 'CA'){
    filename = mm + dd + yy + '08.exp';
  }else if(loc==='KC'){
    filename = mm + dd + yy + '01.exp';
  }else if(loc === 'NY'){
    filename = mm + dd + yy + '05.exp';
  }else if(loc === 'FT'){
    filename = mm + dd + yy + '02.exp';
  }
  console.log(fPath);
  console.log(filename);
  var thisPath = path.join(fPath, filename);
  if(trans === 'receive'){
    res.setHeader('content-type', 'application/text');
    res.download(thisPath, `${filename}`);

 }else{
  res.end(`${req.query.location} \n${req.query.transmission}\nWas not found.`);
 }
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
  filePath = path.join(filePath, req.files.upFile.name);
  var ws = fs.createWriteStream(filePath);
  req.files.upFile.pipe(ws)
                  .on('error', (e)=> console.error(e))
                  .on('close', () => console.log(`file was saved to ${filePath}`));
  // console.log(req.files.upFile);
  res.end();
});



//Launches the server and begins listening.
app.listen(port, (err)=>{
  if(err){
    console.log(err.toString());
  }
  console.log(`Transient Running and Listening for requests on port:${port}`);
});
