

var request = require('request')
var _ = require('underscore')
var WebSocketClient = require('websocket').client;


var hosts
var client
var connection

var id = Math.random()


function parseargs() {
  hosts = process.argv.splice(3)

  hosts = hosts.map(function(item){
    return 'http://'+item+'/'
  })
  console.log(hosts)
}


function nexthost() {
  var hI = Math.floor(hosts.length*Math.random())
  return hosts[hI]
}


function timehost( host, cb ) {
  var start = new Date().getTime()
  request.get( host, function( err, res, body ) {
    var end = new Date().getTime()
    cb(err,end-start);
  })
}


function pinghost() {
  var host = nexthost()
  timehost( host, function( err, time ) {
    var desc = host+':'+time
    if( err ) return console.log( desc+': '+err);
    reportping({h:host,t:time,id:id})
  } )
}


function reportping(data) {
  var sent = false
  if( connection && connection.connected) {
    var msg = JSON.stringify(data)
    connection.sendUTF( msg );
    console.log('report '+msg)
  }

}


function connectclient( server ) {
  client = new WebSocketClient();

  client.on('connect', function(c) {
    connection = c
    console.log('connect')
  });

  client.connect(server, 'report');
}

parseargs()
connectclient( process.argv[2] )
setInterval(pinghost,1000)