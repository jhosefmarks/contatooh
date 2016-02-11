/*global require, module, console */
var mongoose = require('mongoose'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    config = require('./config')();

module.exports = function () {

    'use strict';

    var Usuario = mongoose.model('Usuario'),
        githubCallback;

    if (config.port !== 8080) {
        githubCallback = 'http://' + config.domain + ':' + config.port + '/auth/github/callback';
    } else {
        githubCallback = 'http://' + config.domain + '/auth/github/callback';
    }
    console.log('githubCallback: ', githubCallback);

    passport.use(new GitHubStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        //callbackURL: 'http://localhost:3000/auth/github/callback'
        callbackURL: githubCallback
    }, function (accessToken, refreshToken, profile, done) {

        Usuario.findOrCreate({
            "login": profile.username
        }, {
            "nome": profile.username
        }, function (erro, usuario) {
            if (erro) {
                console.log(erro);
                return done(erro);
            }
        
            return done(null, usuario);
        });

    }));

    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec().then(function (usuario) {
            done(null, usuario);
        });
    });
};