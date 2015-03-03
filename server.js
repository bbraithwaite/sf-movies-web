'use strict';

/**
 * Module dependencies.
 */

var restify = require('restify');
var packageConfig = require('./package');
var port = (process.env.PORT || 4000);

/**
 * Create server object.
 **/
var server = restify.createServer({
  name: packageConfig.name,
  version: packageConfig.version
});

/**
 * Register static resources.
 **/
server.get(/\/*/, restify.serveStatic({
  directory: './app/',
  default: 'index.html'
}));

/**
 * Start listening on server.
 **/
server.listen(port, function listen() {
	console.log('Server running at http://127.0.0.1:' + port);	
});
