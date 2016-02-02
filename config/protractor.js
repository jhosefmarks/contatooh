/*global exports, browser, by */

exports.config = {
    specs: ['../test/e2e/**/*.js'],
    onPrepare: function () {
        'use strict';

        browser.get('http://localhost:3000').then(function () {
            browser.driver.findElement(by.id('entrar')).click();
            browser.driver.findElement(by.id('login_field'))
                .sendKeys('pg.troia2@gmail.com');
            browser.driver.findElement(by.id('password'))
                .sendKeys('github2016');
            browser.driver.findElement(by.name('commit')).click();
        });
    }
};