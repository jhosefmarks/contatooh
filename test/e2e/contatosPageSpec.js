/*global require, describe, beforeEach, browser, it, element, by, expect */

var ContatosPage = require('./pages/contatosPage');

describe('Página principal', function () {
    'use strict';

    var pagina = new ContatosPage();

    beforeEach(function () {
        //browser.get('http://localhost:3000/#/contatos');
        pagina.visitar();
    });

    it('Deve estar logado', function () {
        /*element(by.id('usuario-logado')).getText()
            .then(function (texto) {
                expect(texto.trim().length).toBeGreaterThan(0);
            });*/
        pagina.obterUsuarioLogado().then(function (texto) {
            expect(texto.trim().length).toBeGreaterThan(0);
        });
    });

    it('Deve remover um contato da lista', function () {
        var totalAntes,
            totalDepois;

        /*totalAntes = element.all(by.repeater('contato in contatos')).count();

        element(by.repeater('contato in contatos').row(0)).element(by.css('.btn')).click();

        totalDepois = element.all(by.repeater('contato in contatos')).count();*/

        totalAntes = pagina.obterTotalDeItensDaLista();

        pagina.removerPrimeiroItemDaLista();

        totalDepois = pagina.obterTotalDeItensDaLista();

        expect(totalDepois).toBeLessThan(totalAntes);
    });

});