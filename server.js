var app, port, cluster, CONFIG, bodyParser;

cluster = require('cluster');

CONFIG = require('config').BASE;

// Code to run if we're in the master process
if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = CONFIG.CPU_COUNT;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on('exit', function (worker) {
    // Replace the dead worker
    cluster.fork();
  });
} else {
  app = require('./app');

  port = process.env.PORT || app.port;

  app.listen(port, function() {
    return console.log("Listening on " + port + "\nPress CTRL-C to stop server.");
  });
}