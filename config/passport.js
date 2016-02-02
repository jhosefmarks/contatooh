/*global require, module, console */
var mongoose = require('mongoose'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy;

module.exports = function () {

    'use strict';

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'f8de71919a892aba1100',
        clientSecret: '22891ca0d7854667afb4261afc934f782bff0bde',
        callbackURL: 'http://localhost:3000/auth/github/callback'
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