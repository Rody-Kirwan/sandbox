var express = require('express')
var path = require('path')

let app
let server

module.exports = {
  start
}

function setup() {
  app = express()

  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.use(function (req, res) {
    // Prevent cacheing
    res.set({
      'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': 0,
      'Surrogate-Control': 'no-store'
    })
    
    res.render('index.html');
  })

}

function start(done) {
  setup()
  server = app.listen(3000, function () {
  })

  server.once('listening', function () {
    if(done)
      done()
  })
}

// start();