/*global module, require, process */

module.exports = function () {
    'use strict';

    return require('./env/' + process.env.NODE_ENV + '.js');
};