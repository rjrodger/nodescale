

var port = parseInt(process.argv[2]) || 3001

require('seneca')()
  .use('echo',{inject:{port:port}})
  .listen(port)



 
