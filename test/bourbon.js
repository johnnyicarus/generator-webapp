'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('Bourbon feature', function () {
  describe('on', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withOptions({'skip-install': true})
        .withPrompts({
          features: [
            'includeStyleFramework'
          ],
          framework: 'includeBourbon'
        })
        .on('end', done);
    });

    it('should add Bourbon as dependency', function () {
      assert.fileContent('bower.json', '"bourbon"');
    });

    it('should add Neat as a dependency', function () {
      assert.fileContent('bower.json', '"neat"');
    });

    it('should include bourbon\/neat properly at the top of main.scss', function () {
      assert.fileContent('app/css/main.scss', /@import(.*?)bower_components\/bourbon\/app\/assets\/stylesheets\/bourbon/);
      assert.fileContent('app/css/main.scss', /@import(.*?)base\/grid-settings/);
      assert.fileContent('app/css/main.scss', /@import(.*?)bower_components\/neat\/app\/assets\/stylesheets\/neat/);
      assert.fileContent('app/css/main.scss', /@import(.*?)base\/base/);
    });

    it('should include bitter files', function() {
      assert.file([
        'app/css/base/_base.scss',
        'app/css/base/_buttons.scss',
        'app/css/base/_forms.scss',
        'app/css/base/_grid-settings.scss',
        'app/css/base/_lists.scss',
        'app/css/base/_tables.scss',
        'app/css/base/_typography.scss',
        'app/css/base/_variables.scss'
      ]);
    });

    it('should have corect path to neat-helpers in _grid-settings.scss', function () {
      assert.fileContent('app/css/base/_grid-settings.scss', /@import(.*?)bower_components\/neat\/app\/assets\/stylesheets\/neat-helpers/)
    })
  });

  describe('off', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, 'temp'))
        .withOptions({'skip-install': true})
        .withPrompts({
          features: []
        })
        .on('end', done);
    });

    it('shouldn\'t add Bourbon as dependency', function () {
      assert.noFileContent('bower.json', '"bourbon"');
    });

    it('shouldn\'t add Neat as a dependency', function () {
      assert.noFileContent('bower.json', '"neat"');
    });

    it('shouldn\'t include bitter files', function() {
      assert.noFile([
        'app/css/base/_base.scss',
        'app/css/base/_buttons.scss',
        'app/css/base/_forms.scss',
        'app/css/base/_grid-settings.scss',
        'app/css/base/_lists.scss',
        'app/css/base/_tables.scss',
        'app/css/base/_typography.scss',
        'app/css/base/_variables.scss'
      ]);
    });

    it('shouldn\'t include bourbon related includes at the top of main.scss', function () {
      assert.noFileContent('app/css/main.scss', /@import(.*?)bower_components\/bourbon\/app\/assets\/stylesheets\/bourbon/);
      assert.noFileContent('app/css/main.scss', /@import(.*?)base\/grid-settings/);
      assert.noFileContent('app/css/main.scss', /@import(.*?)bower_components\/neat\/app\/assets\/stylesheets\/neat/);
      assert.noFileContent('app/css/main.scss', /@import(.*?)base\/base/);
    });

  });

});
