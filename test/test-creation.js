/*global describe, beforeEach, it*/
'use strict';

var assert = require('yeoman-generator').assert;
var helper = require('./helper');

describe('m-server:app', function () {
  beforeEach(function (done) {

    var answers = {
      name: 'Hello'
    };

    // Creates a generateor with the default options / arguments
    helper.createAppGenerator({
      answers: answers
    }, done);
  });

  it('creates expected files', function () {

    var expectedFiles = [
      'package.json',
      'app.js',
      'routes/index.js',
      'routes/overview.js'
    ];

    assert.file(expectedFiles);
  });

  it('anchors are visible', function () {
    var expectedContent = [
      ['app.js', helper.regExpFromString('//build::require')],
      ['app.js', helper.regExpFromString('//build::middleware')]
    ];

    assert.fileContent(expectedContent);
  });

});
