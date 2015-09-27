'use strict';

var Primus = require('primus');

module.exports = function(server) {

  var primus = new Primus(server, {
    transformer: 'websockets',
    pathname: '/primusexample',
  });

  //
  // Listen for new connections and send data
  //
  primus.on('connection', function connection(spark) {
    console.log('new connection');

    spark.on('data', function data(packet) {
      if (!packet) return;

      console.log('incoming:', packet);


    });
  });

  return primus;
};