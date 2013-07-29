

var http = require('http');
var sockjs = require('sockjs');

var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.2.min.js"};

var sockjs_echo = sockjs.createServer(sockjs_opts);
sockjs_echo.on('connection', function(conn) {
  conn.on('data', function(message) {
    conn.write(message);
  });
});

var server = http.createServer();

sockjs_echo.installHandlers(server, {prefix:'/echo'});
server.listen(39999);