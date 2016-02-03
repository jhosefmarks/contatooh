/*global angular, console */
angular.module('contatooh').controller('ContatoController', function ($scope, $routeParams, Contato) {
    'use strict';

    if ($routeParams.contatoId) {
        Contato.get({"_id": $routeParams.contatoId},
            function (contato) {
                $scope.contato = contato;
            },
            function (erro) {
                $scope.mensagem = {
                    texto: 'Contato não existe. Novo contato.'
                };
            });
    } else {
        $scope.contato = new Contato();
    }

    $scope.salva = function () {
        $scope.contato.$save().then(function () {
            $scope.mensagem = {
                texto: 'Salvo com sucesso'
            };

            // limpa o formulário
            $scope.contato = new Contato();
            
            //$scope.btnBackFocus = true;
            $scope.$broadcast('contatoSalvo');
        }).catch(function (erro) {
            $scope.mensagem = {
                texto: 'Não foi possível salvar'
            };
        });
    };

    Contato.query(function (contatos) {
        $scope.contatos = contatos;
    });
});