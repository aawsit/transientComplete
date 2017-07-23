const ck = require('chokidar');
const path = require('path');
const fs = require('fs');
var Watcher = {
  watcherList: [],
  createWatcher: function(locationOutPath, locationName) {
    console.log(`Creating Watcher: ${locationName}\n Watching Folder: ${locationOutPath}`);
    this.watcherList.push({
      watcherName: locationName,
      agent: ck.watch(locationOutPath, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
      }).on('raw', (e,p,d) => {
        console.log(`
            Event: ${e},
            Details: ${d},
            Path: ${p}
          `);
      }).on('all', (e, p) =>{
        console.log(`${e}\n${p}`)
      }),
      lastPickup: Date.now(),
      files: [],

    });
  }

};

module.exports = Watcher;
