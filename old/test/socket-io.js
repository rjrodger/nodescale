
var io = require('socket.io').listen(39999);

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data);
  });
});