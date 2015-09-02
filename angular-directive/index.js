'use strict';

var util = require('../util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
    format = require('string-format'),
    _ = require('lodash'),
    render = require('ejs').render;


var DirectiveGenerator = yeoman.generators.NamedBase.extend({
	askUser: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this directive belongs to?',
			choices: util.listAngularModules()
		}, {
			type: 'confirm',
			name: 'haveTemplate',
			default: 'true',
			message: 'Does it require a dedicated template?'
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
            this.haveTemplate = props.haveTemplate;
			this.slugifiedModuleName = _.kebabCase(this.moduleName);

			this.slugifiedName = _.kebabCase(this.name);
			this.camelizedName = _.camelCase(this.slugifiedName);

			done();
		}.bind(this));
	},

	renderFiles: function() {
		this.template('_.directive.js', format('public/{0}/directives/{0}.{1}.directive.js', this.slugifiedModuleName, this.slugifiedName));
        if (this.haveTemplate) {
            this.template('_.directive.template.html', format('public/{0}/templates/{0}.{1}.template.html', this.slugifiedModuleName, this.slugifiedName));
            this.template('_.directive.style.scss', format('public/{0}/styles/_{1}.template.scss', this.slugifiedModuleName, this.slugifiedName));

            var moduleStyleFile = format('{1}/public/{0}/styles/{0}.style.scss', this.slugifiedModuleName, process.cwd());
            if (fs.existsSync(moduleStyleFile)) {
                var moduleStyleContent = util.readFileAsString(moduleStyleFile)
                    .replace('/* leave me here */', render(this.read('add-style.scss'), this));
                util.writeFileFromString(moduleStyleContent, moduleStyleFile);
            }
        }
		this.template('_.directive.spec.js', format('public/{0}/tests/{0}.{1}.directive.spec.js', this.slugifiedModuleName, this.slugifiedName));
	}
});

module.exports = DirectiveGenerator;
