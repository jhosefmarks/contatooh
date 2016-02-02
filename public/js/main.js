/*globals angular */

angular.module('contatooh', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider, $httpProvider) {
        'use strict';

        $httpProvider.interceptors.push('meuInterceptor');

        $routeProvider.when('/auth', {
            templateUrl: 'partials/auth.html'
        });

        $routeProvider.when('/contatos', {
            templateUrl: 'partials/contatos.html',
            controller: 'ContatosController'
        });

        $routeProvider.when('/contato', {
            templateUrl: 'partials/contato.html',
            controller: 'ContatoController'
        });

        $routeProvider.when('/contato/:contatoId', {
            templateUrl: 'partials/contato.html',
            controller: 'ContatoController'
        });

        $routeProvider.otherwise({redirectTo: '/contatos'});
    });