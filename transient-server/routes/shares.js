var express = require('express');
var fs = require('fs'), path = require('path');
var configPath = path.join(__dirname, '../transient-config');
var config = require(configPath);

var shareRouter = express.Router();
var shares = config.shares;

var router = (shares) => {
  for(let share of shares){
    shareRouter.route(`/${share.name}`)
    .get((req, res) => {
      var fileList = [];
      fs.readdir(share.location, (err, files) => {
        for(file in files){
          fileList.push(file);
          shareRouter.route(`/${file}`)
                      .get((req, res) => {
                        var filePath = path.join(share.location, file);
                        res.download(filePath, `${file}`);
                      });
        }
      }).then(()=>{
        res.render('shareFiles', fileList);
      });
    });
  }
};
module.exports = router;
