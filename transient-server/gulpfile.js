
//Imports only
var g = require('gulp');
var jsh = require('gulp-jshint');
var nm = require('gulp-nodemon');

//global variables
var jsf = ['*.js'];

//gulp tasks
g.task('default', ['serve']);
g.task('lint', ()=>{
  return g.src(jsf).pipe(jsh());
});

g.task('serve', ['lint'],()=>{
  var options = {
    script: 'index.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: [jsf]
  }
  return nm(options)
          .on('restart', (env)=>{
            console.log(`Restarting....... on port: ${env.PORT}`);
          })
});
