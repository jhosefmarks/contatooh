/*global require, describe, beforeEach, browser, it, element, by, expect */

var ContatoPage = require('./pages/contatoPage');

describe('Cadastro de contatos', function () {
    'use strict';

    var pagina = new ContatoPage();

    beforeEach(function () {
        //browser.get('http://localhost:3000/#/contato');
        pagina.visitar();
    });

    it('Deve cadastrar um contato', function () {
        var aleatorio = Math.floor((Math.random() * 10000000) + 1),
            nome = 'teste' + aleatorio,
            email = 'teste' + aleatorio + '@email.com';

        /*element(by.model('contato.nome')).sendKeys(nome);
        element(by.model('contato.email')).sendKeys(email);
        element(by.css('option[value="?"]')).click();
        element(by.css('.btn-primary')).click();
        expect(element(by.binding('mensagem.texto'))
            .getText())
            .toContain('sucesso');*/

        pagina.digitarNome(nome);
        pagina.digitarEmail(email);
        pagina.selecionarPrimeiraEmergenciaDaLista();
        pagina.salvar();
        expect(pagina.obterMensagem()).toContain('sucesso');
    });
});