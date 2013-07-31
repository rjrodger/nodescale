
"use strict";


var http = require('http')


var argv = require('optimist').argv
var dispatchport = argv.d || 8001
var senecaport   = argv.s || 10101

var seneca = require('seneca')()



seneca.use('level-store',{ folder:'./app-dispatch-db' })


seneca.use('data-editor',{admin:{local:true}})


seneca.use('dispatch',{ pattern: function( req ) {
  var pat = {}
  pat.url    = req.url

  var host = req.headers['host']
  var c = host.indexOf(':')
  var domain = c < 0 ? host : host.substring(0,c)

  pat.domain = domain

  var m = /^\/([^\/]+)\/([^\/]+)\/([^\/]+)/.exec(req.url)
  if( m ) {
    pat.account = m[1]
    pat.appname = m[2]
    pat.version = m[3]
  }

  return pat
}})







seneca.ready(function(err){
  if(err) return console.log(err);

  var web = seneca.export('web')

  http.createServer(function (req, res) {
    web(req,res,function(){
      res.writeHead(404)
      res.end()
    })
  }).listen( dispatchport )

  seneca.log.info('dispatch','listen',dispatchport)


  seneca.listen( senecaport )
})
