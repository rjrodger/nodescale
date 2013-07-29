
"use strict";


var http = require('http')


var seneca = require('seneca')()


seneca.use('level-store',{ folder:'./app-master-db' })


seneca.use('webmap', {
  wrap: function(gen,req,requrl) {
    var args = gen(req,requrl)
    
    var m = /\/([0-9a-z]+)\/([0-9a-z]+)\//.exec(requrl.pathname)
    args._account = m[1]
    args._appname = m[2]

    console.log('acc='+args._account+' appname='+args._appname)

    return args
  }
})




seneca.act({role:'webmap',cmd:'define',map:{
  GET: {
    '/ac1/ap1/echo':'gen'
  }
}})



seneca.use('appmap')


/*
seneca.act('role:appmap,cmd:register',{
  account:'ac1',
  appname:'ap1',
  patterns:[
    {role:'echo'}
  ]
})
*/






var web = seneca.export('web')


http.createServer(function (req, res) {
  web(req,res,function(err){
    err&&console.log('web:'+err)
    res.writeHead(err?500:404)
    res.end(err?''+err:'')
  })
}).listen(8090)


console.log('listen 8090')


seneca.listen()
