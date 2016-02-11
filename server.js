/*globals require, console */

var http = require('http'),
    app = require('./config/express')(),
    config = require('./config/config')();

require('./config/passport')();
require('./config/database')(config.db);

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
/*http.createServer(app).listen(app.get('port'), function () {
    'use strict';

    console.log('Express Server escutando na porta ' + app.get('port'));
});*/

/* 4ºpasso alterando a criação do servidor */
http.createServer(app).listen(config.port, config.address, function (){
    console.log('Express Https Server ' + config.address + ' (' + config.env + ') escutando na porta ' + config.port);
});