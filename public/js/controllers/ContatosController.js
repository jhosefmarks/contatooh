/*global angular, console */

angular.module('contatooh').controller('ContatosController', function ($scope, Contato) {
    'use strict';

    $scope.contatos = [];

    $scope.filtro = '';

    $scope.mensagem = {texto: ''};

    /*$http.get('/contatos')
        .success(function (data) {
            $scope.contatos = data;
        })
        .error(function (statusText) {
            console.log("Não foi possível obter a lista de contatos");
            console.log(statusText);
        });*/

    function buscaContatos() {
        Contato.query(
            function (contatos) {
                $scope.contatos = contatos;
                $scope.mensagem = {};
            },
            function (erro) {
                console.log(erro);
                $scope.mensagem = {
                    texto: 'Não foi possível obter a lista'
                };
            }
        );
    }

    buscaContatos();

    $scope.remove = function (contato) {
        Contato['delete']({_id: contato._id},
            buscaContatos,
            function (erro) {
                console.log(erro);
                $scope.mensagem = {
                    texto: 'Não foi possível remover o contato'
                };
            });
    };

});