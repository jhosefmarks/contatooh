/*global angular */

angular.module('contatooh').factory('Contato', function ($resource) {
    'use strict';

    return $resource('/contatos/:_id');
});