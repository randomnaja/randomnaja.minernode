'use strict'
 
const Hapi = require('hapi');
const Request = require('request');
const Vision = require('vision');
const Handlebars = require('handlebars');
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');
const Inert = require('inert');
const Superchild = require('superchild');
 
const server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: 10000
});

server.register(Inert, () => {});
 
// Register vision for our views
server.register(Vision, (err) => {
    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: './views',
    });
});
 
server.start((err) => {
    if (err) {
        throw err;
    }
 
    console.log(`Server running at: ${server.info.uri}`);
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index', {});
        /*Request.get('http://api.football-data.org/v1/competitions/438/leagueTable', function (error, response, body) {
            if (error) {
                throw error;
            }
 
            const data = JSON.parse(body);
            reply.view('index', { result: data });
        });*/
    }
});

server.route({
	method : 'GET',
	path : '/{button}',
   handler: function (request, reply) {
      console.log('[GET] ' + request);
	}
});

server.route({
	method : 'GET',
	path : '/getlog',
   handler: function (request, reply) {
      var allLog = '';
      logArr.forEach(function(item,index){
         allLog += item + '\n';
      });
      reply(allLog);
	}
});
 
server.route({
    method: 'GET',
    path: '/js/{param*}',
    handler: {
        directory: {
            path: 'js'
        }
    }
});

var logArr = [];

var child = Superchild('ping -c 30 -i 1 192.168.1.99');
child.on('stdout_line', function(lineStr) {
	logArr.push(lineStr);
});
child.on('exit', function(code,signal){
   console.log('[child] exit with code=' + code + ', signal=' + signal);
});

