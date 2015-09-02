'use strict';

var util = require('../util'),
	yeoman = require('yeoman-generator'),
    format = require('string-format'),
    _ = require('lodash');


var ServiceGenerator = yeoman.generators.NamedBase.extend({
	askUser: function() {
		var modulesFolder = process.cwd() + '/public/';
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this service belongs to?',
			choices: util.listAngularModules()
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.slugifiedModuleName = _.kebabCase(this.moduleName);

			this.slugifiedName = _.kebabCase(this.name);
            this.camelizedName = _.camelCase(this.slugifiedName);
			this.classifiedName = _.capitalize(this.camelizedName);

			done();
		}.bind(this));
	},

	renderFiles: function() {
		this.template('_.service.js', format('public/{0}/services/{0}.{1}.service.js', this.slugifiedModuleName, this.slugifiedName));
		this.template('_.service.spec.js', format('public/{0}/tests/{0}.{1}.service.spec.js', this.slugifiedModuleName, this.slugifiedName));
	}
});

module.exports = ServiceGenerator;
