

var express = require('express')



var port = parseInt( process.argv[2] )

for( var pI = 0; pI < 5; pI++ ) {
  launch(port+pI)
}


function launch( port ) {
  var app = express.createServer()

  app.get( '/', function( req, res ){
    setTimeout( function() {
      res.writeHead(200)
      res.end('hello from '+port)
      console.log(port)
    }, Math.floor(5000*Math.random()) )
  })

  console.log('listen on '+port)
  app.listen( port )
}



