/*global require, module */

var passport = require('passport');

module.exports = function (app) {

    'use strict';

    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', {successRedirect: '/'}));

    app.get('/logout', function (req, res) {
        req.logOut(); // exposto pelo passport
        res.redirect('/');
    });

};