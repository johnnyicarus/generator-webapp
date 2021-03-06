'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('general', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        features: [],
        framework: []
      })
      .withGenerators([
        [helpers.createDummyGenerator(), 'mocha:app']
      ])
      .on('end', done);
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    require('../app');
  });

  it('creates expected files', function () {
    assert.file([
      'bower.json',
      'package.json',
      'gulpfile.babel.js',
      '.babelrc',
      '.editorconfig',
      '.bowerrc',
      '.gitignore',
      '.gitattributes',
      'app/favicon.ico',
      'app/apple-touch-icon.png',
      'app/robots.txt',
      'app/index.html',
      'app/js/main.js',
      'app/css/main.scss',
      'app/img',
      'app/fnt',
      'test'
    ]);
  });
});
