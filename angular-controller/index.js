'use strict';

var util = require('../util'),
	yeoman = require('yeoman-generator'),
    format = require('string-format'),
    _ = require('lodash');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
	askUser: function() {

		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this controller belongs to?',
			choices: util.listAngularModules()
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.slugifiedModuleName = _.kebabCase(this.moduleName);
            this.camelizedModuleName = _.camelCase(this.slugifiedModuleName);

			this.slugifiedControllerName = _.kebabCase(this.name);
            this.camelizedControllerName = _.camelCase(this.slugifiedControllerName);
			this.classifiedControllerName = _.capitalize(this.camelizedControllerName);

			done();
		}.bind(this));
	},

	renderFiles: function() {
		this.template('_.controller.js', format('public/{0}/controllers/{0}.{1}.controller.js', this.slugifiedModuleName, this.slugifiedControllerName));
		this.template('_.controller.spec.js', format('public/{0}/tests/{0}.{1}.controller.spec.js', this.slugifiedModuleName, this.slugifiedControllerName));
	}
});

module.exports = ControllerGenerator;
