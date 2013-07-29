"use strict";


var _ = require('underscore')
var request = require('request')


module.exports = function( options ) {
  var seneca = this
  var name   = 'appmap'




  options = seneca.util.deepextend({

  },options)
  


  var router = seneca.util.router()
  var appmap = seneca.make('farm','appmap')


  seneca.add({role:name,cmd:'register'},register)



  function register( args, done ) {
    var seneca = this

    var account = args.account
    var appname = args.appname

    var key = account+'/'+appname


    var host    = args.host
    var patterns = args.patterns

    
    appmap.make$({
      id$:key,
      account:  account,
      appname:  appname,
      patterns: args.patterns
    }).save$()
    

    _.each( patterns, function( pattern ){
      var pat = _.extend(pattern,{_account:account,_appname:appname})
      seneca.add(pat,function( args, done ){
        var reqopts = {
          url:'http://localhost:3001'+'/act',
          json:args
        }

        request.post(reqopts,function(err,response){
          done(err, response.body)
        })
      })
    })

    done(null,key)
  }



  seneca.add({init:name},function(args,done){
    appmap.list$({}, function(err,all){
      if(err) return done(err);

      _.each( all, function( reg ) {
        seneca.act(_.extend(reg,{role:name,cmd:'register'}))
      })
    })
  })

  

  return {
    name: name
  }
}
