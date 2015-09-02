'use strict';

var util = require('../util'),
	yeoman = require('yeoman-generator'),
    format = require('string-format'),
    _ = require('lodash');


var FilterGenerator = yeoman.generators.NamedBase.extend({
	askUser: function() {
		var modulesFolder = process.cwd() + '/public/';
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this filter belongs to?',
			choices: util.listAngularModules()
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.slugifiedModuleName = _.kebabCase(this.moduleName);

			this.slugifiedName = _.kebabCase(this.name);
			this.camelizedName = _.camelCase(this.slugifiedName);
			done();
		}.bind(this));
	},

	renderFile: function() {
		this.template('_.filter.js', format('public/{0}/filters/{0}.{1}.filter.js', this.slugifiedModuleName, this.slugifiedName));
		this.template('_.filter.spec.js', format('public/{0}/tests/{0}.{1}.filter.spec.js', this.slugifiedModuleName, this.slugifiedName));
	}
});

module.exports = FilterGenerator;
