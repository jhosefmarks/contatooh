/*globals module, console */

//var model = require('../models/contato');
var sanitize = require('mongo-sanitize');

/*var contatos = [
    {id: 1, nome: 'Contato Exemplo 1', email: 'cont1@empresa.com.br'},
    {id: 2, nome: 'Contato Exemplo 2', email: 'cont2@empresa.com.br'},
    {id: 3, nome: 'Contato Exemplo 3', email: 'cont3@empresa.com.br'},
    {id: 4, nome: 'Contato Exemplo 4', email: 'cont4@empresa.com.br'},
    {id: 5, nome: 'Contato Exemplo 5', email: 'cont5@empresa.com.br'}
];

var ID_CONTATO_INC = 5;*/

module.exports = function (app) {
    'use strict';

    var controller = {},
        Contato;

    Contato = app.models.contato;

    controller.listaContatos = function (req, res) {
        //res.send(contatos);
        
        //var promise = Contato.find().exec();

        Contato.find().populate('emergencia').exec().then(
            function (contatos) {
                res.json(contatos);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };

    controller.obtemContato = function (req, res) {
        /*var idContato = req.params.id,
            contato;

        console.log(req.params.id);

        contato = contatos.filter(function (contato) {
            return contato.id === parseInt(idContato, 10);
        })[0];

        return contato ? res.json(contato) : res.status(404).send('Contato não encontrado');*/

        var _id = sanitize(req.params.id);

        Contato.findById(_id).exec().then(
            function (contato) {
                if (!contato) {
                    throw new Error("Contato não encontrado");
                }

                res.json(contato);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
        );
    };
    
    controller.removeContato = function (req, res) {
        /*var idContato = req.params.id;

        contatos = contatos.filter(function (contato) {
            return contato.id !== parseInt(idContato, 10);
        });

        res.status(204).end();*/

        var _id = sanitize(req.params.id);

        Contato.remove({"_id" : _id}).exec().then(
            function () {
                res.status(204).end();
            },
            function (erro) {
                return console.error(erro);
            }
        );
    };

    /*function adiciona(contatoNovo) {
        ID_CONTATO_INC += 1;

        contatoNovo.id = ID_CONTATO_INC;

        contatos.push(contatoNovo);

        return contatoNovo;
    }

    function atualiza(contatoAlterar) {
        contatos = contatos.map(function (contato) {

            if (contato.id === contatoAlterar.id) {
                contato = contatoAlterar;
            }

            return contato;
        });
        
        return contatoAlterar;
    }*/

    controller.salvaContato = function (req, res) {
        /*var contato = req.body;

        contato = contato.id ? atualiza(contato) : adiciona(contato);

        res.json(contato);*/

        var _id = sanitize(req.body._id);

        // testando por undefined
        //req.body.emergencia = req.body.emergencia || null;
        
        /*
            Independente da quantidade de parâmetros,
            apenas selecionamos o nome, email e emergencia:
        */
        var dados = {
            "nome": req.body.nome,
            "email": req.body.email,
            "emergencia": req.body.emergencia || null
        };

        if (_id) {
            Contato.findByIdAndUpdate(_id, dados).exec().then(
                function (contato) {
                    res.json(contato);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
        } else {
            Contato.create(dados).then(
                function (contato) {
                    res.status(201).json(contato);
                },
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                }
            );
        }
    };

    return controller;
};