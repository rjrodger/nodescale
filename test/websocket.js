
var WebSocketServer = require('websocket').server;
var http = require('http');
var url = require('url');
var fs = require('fs');


var port = parseInt( process.argv[2], 10);


var server = http.createServer(function(request, response) {
  response.writeHead(404);
  response.end();
});
server.listen(port);


var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true
});

wsServer.on('connect', function(connection) {
  console.log('connect')
  connection.on('message', function(message) {
    console.log(message.utf8Data)
  });
});

