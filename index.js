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
var argh = require('argh').argv
  , Primus = require('primus')
  , http = require('http')
  , fs = require('fs')
  , staticServer = require('node-static')
  , port = +argh.port || 8080
  , server
  , primus;

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
primus = new Primus(server, {
  transformer: argh.transformer || 'websockets',
  pathname: argh.pathname || '/primusexample',
  parser: argh.parser
});

//
// Listen for new connections and send data
//
primus.on('connection', function connection(spark) {
  console.log('new connection');

  spark.on('data', function data(packet) {
    if (!packet) return;

    console.log('incoming:', packet);

    //
    // Close the connection.
    //
    if (packet === 'end') spark.end();

    //
    // Echo the responses.
    //
    if (packet.echo) spark.write(packet.echo);

    //
    // Pipe in some data.
    //
    if (packet.pipe) fs.createReadStream(__dirname + '/public/index.html').pipe(spark, {
      end: false
    });

  });
});

//
// Everything is ready, listen to a port number to start the server.
//
server.listen(port, function(){
  console.info('Server is listening on ' + port)
});
