'use strict';

//
// Require all dependencies.
//
// Argh is an light weight argument parser that we use in this example to change
// between parsers and transformers. The following CLI arguments are accepted:
//
// --transformer <value>  (the name of the transformer we want to use)
// --parser <value>       (the name of the parser we want to use)
// --port <value>         (the port number we want to listen to)
//
  var Primus = require('primus')
  , http = require('http')
  , fs = require('fs')
  , staticServer = require('node-static')
  , port = +process.env.PORT || 8080
  , setPrimusHandlers = require('./handlers')
  , server
  ;

var file = new staticServer.Server('./public');

//
// Create a basic server that will send the compiled library or a basic HTML
// file which we can use for testing.
//
server = http.createServer(function server(req, res) {
  req.addListener('end', function () {
      file.serve(req, res);
  }).resume();
});

//
// Now that we've setup our basic server, we can setup our Primus server.
//
setPrimusHandlers(server);

//
// Everything is ready, listen to a port number to start the server.
//
server.listen(port, function(){
  console.info('Server is listening on ' + port)
});
