var service = require('node-windows').Service;

var svc = new service({
  name: 'Transient Server 1.1',
  description: 'The Simple File transfer utility in Node.',
  script: 'index.js'
});
svc.on('install', ()=> {
  svc.start();
});

svc.install();
