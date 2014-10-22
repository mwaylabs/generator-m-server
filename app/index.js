'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {

    // tell yeoman we're doing asynchronous stuff here
    // so it can wait with subsequent tasks
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name'
      }
    ];

    this.prompt(prompts, function (answers) {
      this.name = answers.name;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_package.json', 'package.json');
    },

    projectfiles: function () {
      this.src.copy('app.js', 'app.js');
      this.src.copy('routes/index.js', 'routes/index.js');
      this.src.copy('routes/overview.js', 'routes/overview.js');
    }
  },

  end: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
