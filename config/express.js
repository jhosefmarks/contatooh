/*globals require, module */

var express = require('express'),
    //home = require('../app/routes/home');
    load = require('express-load'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    helmet = require('helmet');

module.exports = function () {
    'use strict';

    var app = express();

    // configuração de ambiente
    app.set('port', 3000);

    // middlewares
    app.use(express['static']('./public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    // templates engine e views
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(cookieParser());
    app.use(session({
        secret: 'teste com o contatooh',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(helmet());
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.disable('x-powered-by');

    // carregamento de rotas
    //home(app);
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes/auth')
        .then('routes')
        .into(app);

    app.get('*', function (req, res) {
        res.status(404).render('404');
    });

    return app;
};