

var appdispatch = require('seneca')().client(10101)

appdispatch.act('role:dispatch,cmd:add,item:server',{id:'aaa',host:'localhost',port:8090})
appdispatch.act('role:dispatch,cmd:add,item:route',{pattern:{url:'/aaa/echo',domain:'localhost'},server:'aaa'})




 
