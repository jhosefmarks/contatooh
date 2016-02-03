/*global angular */

angular.module('meusComponentes', [])
    .directive('meuPainel', function () {
        'use strict';

        var directive = {};

        directive.restrict = "EA";

        directive.scope = {
            titulo: '@'
        };

        directive.transclude = true;

        directive.templateUrl = 'js/directives/meus-componentes/meu-painel.html';

        /*directive.template =
            '<div class="panel panel-default">' +
            ' <div class="panel-heading">' +
            ' <h3 class="panel-title">{{titulo}}</h3>' +
            ' </div>' +
            ' <div ng-transclude class="panel-body">' +
            ' </div>' +
            '</div>';*/

        return directive;
    })
    .directive('meuBotaoAviso', function () {
        'use strict';

        var directive = {};

        directive.restrict = 'E';

        directive.scope = {
            nome : '@',
            acao : '&'
        };

        directive.template = '<button ng-click="acao()" class="btn btn-warning">{{nome}}</button>';

        return directive;
    })
    .directive('meuFocus', function () {
        'use strict';

        var directive = {};

        directive.restrict = 'A';

        directive.scope = {
            //focus: '='
            evento: '@'
        };
    
        directive.link = function (scope, element) {
            /*scope.$watch('focus', function () {
                if (scope.focus) {
                    element[0].focus();
                    scope.focus = false;
                }
            });*/

            scope.$on(scope.evento, function () {
                element[0].focus();
            });
        };

        return directive;
    });