/*globals require, console */

var http = require('http'),
    app = require('./config/express')();

require('./config/passport')();
require('./config/database')('mongodb://localhost/contatooh');

/* 1º Passo
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Sou um servidor criado pelo Node.js!\n');
}).listen(3000, '127.0.0.1');
*/

/* 2º Passo - Demonstração
http.createServer('Aqui entra os middlewares').listen(3000, 'localhost');
*/

/* 3º Passo com expresse agora */
http.createServer(app).listen(app.get('port'), function () {
    'use strict';

    console.log('Express Server escutando na porta ' + app.get('port'));
});