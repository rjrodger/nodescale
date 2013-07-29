

var appmaster = require('seneca')().client()

appmaster.act('role:appmap,cmd:register',{
  account:'ac1',
  appname:'ap1',
  patterns:[
    {role:'echo'}
  ]
})

appmaster.act('role:appmap,cmd:register',{
  account:'ac1',
  appname:'ap2',
  patterns:[
    {role:'echo'}
  ]
})





 
