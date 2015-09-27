var primus;

function log(name, header, message) {
  var div = document.createElement('div');
  div.className = 'output output-'+ name;

  div.innerHTML = [
    '<h4>'+ header +'</h4>',
    message ? '<p>'+ message +'</p>' : ''
  ].join('');

  document.getElementById('output').appendChild(div);
  window.scroll(0, document.body.offsetHeight);
}

(function connect() {
  if (primus) primus.end();

  primus = new Primus();

  primus.on('reconnect', function reconnect(opts) {
    log('reconnect', 'Reconnecting', 'We are <strong>scheduling</strong> a new reconnect attempt. This is attempt <strong>'+ opts.attempt +'</strong> and will trigger a reconnect operation in <strong>'+ opts.scheduled +'</strong> ms.');
  });

  primus.on('reconnect', function reconnect() {
    log('reconnect', 'Reconnect', 'Starting the reconnect attempt, hopefully we get a connection!');
  });

  primus.on('online', function online() {
    log('network', 'Online', 'We have regained control over our internet connection.');
  });

  primus.on('offline', function offline() {
    log('network', 'Offline', 'We lost our internet connection.');
  });

  primus.on('open', function open() {
    log('open', 'Open', 'The connection has been established.');
  });

  primus.on('error', function error(err) {
    log('error', 'Erorr', 'An unknown error has occured <code>'+ err.message +'</code>');
  });

  primus.on('data', function incoming(data) {
    log('data', 'Received data', 'string' === typeof data ? data : '<pre><code>'+ JSON.stringify(data, null, 2) +'</code></pre>');
  });

  primus.on('end', function end() {
    log('end', 'End', 'The connection has ended.');
  });

  primus.on('close', function end() {
    log('close', 'close', 'We\'ve lost the connection to the server.');
  });
})();