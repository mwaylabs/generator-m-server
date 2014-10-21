'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var utils = require('./util.js');
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }
  this.appname = this._.slugify(this._.humanize(this.appname));
  this.scriptAppName = this._.camelize(this.appname);

  this.cameledName = this._.camelize(this.name);
  this.classedName = this._.classify(this.name);

  if (typeof this.env.options.appPath === 'undefined') {
    this.env.options.appPath = this.options.appPath;

    if (!this.env.options.appPath) {
      try {
        this.env.options.appPath = require(path.join(process.cwd(), 'package.json')).appPath;
      } catch (e) {}
    }
    this.env.options.appPath = ''; //this.env.options.appPath || 'app';
    this.options.appPath = this.env.options.appPath;
  }

  var sourceRoot = '/templates/';
  this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src + '.js',
    path.join(this.env.options.appPath, dest.toLowerCase()) + '.js'
  ]);
};

Generator.prototype.addRequireToApp = function (script) {
  try {
    var appPath = this.env.options.appPath;
    var fullPath = path.join(appPath, 'app.js');
    utils.rewriteFile({
      file: fullPath,
      needle: '//build::require',
      splicable: [
        'var ' + this.name + ' = require(\'' + script.toLowerCase().replace(/\\/g, '/') + '.js\');'
      ]
    });
  } catch (e) {
    this.log.error(chalk.yellow(
      '\nUnable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n'
    ));
  }
};

Generator.prototype.addMiddlewareToApp = function (script) {
  try {
    var appPath = this.env.options.appPath;
    var fullPath = path.join(appPath, 'app.js');
    utils.rewriteFile({
      file: fullPath,
      needle: '//build::middleware',
      splicable: [
        'app.use(\'/' + this.name.toLowerCase() + '\', ' + this.name + ');'
      ]
    });
  } catch (e) {
    this.log.error(chalk.yellow(
      '\nUnable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n'
    ));
  }
};

Generator.prototype.generateSourceAndTest = function (appTemplate, targetDirectory, skipAdd) {

  this.appTemplate(appTemplate, path.join(targetDirectory, this.name));
  if (!skipAdd) {
    this.addRequireToApp(path.join(targetDirectory, this.name));
    this.addMiddlewareToApp(path.join(targetDirectory, this.name));
  }
};
