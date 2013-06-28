#!/usr/bin/env node

var common = require('../lib/common');
var main = require('../lib/main');
var express = require('express');
var server = express();

server.disable('x-powered-by');
server.use(express.bodyParser());
server.use(express.logger());

/**
 * API endpoints
 * 
 * COMMANDs		VERBs		URIs				Descriptions
 * 
 * 				GET   		/					Show server banner
 * load			GET			/config/load		Load all apps from file
 * save			PUT			/config/save		Save all apps to file
 * add			POST		/apps				Add an app to run
 * remove		DELETE		/apps				Stop and Remove an app
 * start		POST		/app/start			Start an app
 * startAll		POST		/apps/start			Start all apps
 * stop			POST		/app/stop			Stop an app
 * stopAll		POST		/apps/stop			Stop all apps
 * restart		POST		/app/restart		Restart an app
 * restartAll	POST		/apps/restart		Restart all apps
 * list			POST		/apps/list			Get app state list
 * monit		POST		/apps/monit			Monitor all apps
 * set			POST		/app				Set an app property			
 * get			POST		/app				Get an app property
 */

/**
 * GET /
 */
server.get('/', function(req, res) {  	
	res.end('Supervizer server v' + common.pkg.version);
});

/**
 * POST /apps
 */
server.post('/apps', function(req, res) {  	
		
	console.log( '[request]:\n' + ' - path: /apps\n - receive: ' + JSON.stringify(req.body) + '\n' );
	
	
	
	
	res.end(JSON.stringify(main.add(req.body)));
});


/**
 * POST /apps/list
 */
server.post('/apps/list', function(req, res) {
	
	console.log( '[request]:\n' + ' - path: /apps/list\n - receive: ' + JSON.stringify(req.body) + '\n' );
	
	
	
	
	res.end(JSON.stringify(main.list(req.body)));
});

server.get('*', function(req, res) {
  	res.send('Not Found!', 404);
});

server.use(function(err, req, res, next) {  	
  	res.send('Something broke!', 500);
	console.error(err.stack);
});

server.listen(common.settings.port);
console.log('Supervizer server started.');