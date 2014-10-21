'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
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
