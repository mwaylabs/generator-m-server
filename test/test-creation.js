/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var os = require('os');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('mcap-project:app', function () {
  beforeEach(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './tmp')) // create new dir
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

  it('creates files', function () {

    var expectedFiles = [
      'package.json',
      'app.js',
      'routes/index.js',
      'routes/overview.js'
    ];

    assert.file(expectedFiles);
  });
});
