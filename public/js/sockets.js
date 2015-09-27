var primus;

angular.module('myApp.services', []).service('sockets', function(){
  if (primus) primus.end();

  primus = new Primus('http://localhost:8080/primusexample/');

  primus.on('reconnect', function reconnect(opts) {
    console.log('reconnect', 'Reconnecting', 'We are scheduling a new reconnect attempt. This is attempt '+ opts.attempt +' and will trigger a reconnect operation in '+ opts.scheduled +' ms.');
  });

  primus.on('open', function open() {
    console.log('open', 'Open', 'The connection has been established.');
  });

  primus.on('error', function error(err) {
    console.log('error', 'Erorr', 'An unknown error has occured '+ err.message);
  });

  primus.on('data', function incoming(data) {
    console.log('data', 'Received data', data);
  });

  primus.on('end', function end() {
    console.log('end', 'End', 'The connection has ended.');
  });

  primus.on('close', function end() {
    console.log('close', 'close', 'We\'ve lost the connection to the server.');
  });

  return primus
});

