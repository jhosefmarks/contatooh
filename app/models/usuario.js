/*global require, module */

var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate');

module.exports = function () {
    'use strict';

    var schema;

    schema = mongoose.Schema({
        login: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        nome: {
            type: String,
            required: true
        },
        inclusao: {
            type: Date,
            'default': Date.now
        }
    });

    schema.plugin(findOrCreate);

    return mongoose.model('Usuario', schema);
};