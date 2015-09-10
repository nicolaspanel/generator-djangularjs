'use strict';

var util = require('../util'),
	fs = require('fs'),
	yeoman = require('yeoman-generator'),
    format = require('string-format'),
    _ = require('lodash'),
    render = require('ejs').render;



var ViewGenerator = yeoman.generators.NamedBase.extend({
	askModule: function() {
		var done = this.async();

		var prompts = [{
			type: 'list',
			name: 'moduleName',
			default: 'core',
			message: 'Which module does this route belongs to?',
			choices: util.listAngularModules()
		}];

		this.prompt(prompts, function(props) {
			this.moduleName = props.moduleName;
			this.controllerName = props.controllerName;

			this.slugifiedModuleName = _.kebabCase(this.moduleName);
            this.camelizedModuleName = _.camelCase(this.slugifiedModuleName);

			this.slugifiedName = _.kebabCase(this.name);
            this.camelizedName = _.camelCase(this.slugifiedName);
			this.classifiedName = _.capitalize(this.camelizedName);

			done();
		}.bind(this));
	},

	askRouteDetails: function() {
		var done = this.async();

		var prompts = [{
			name: 'routePath',
			message: 'What do you want your route path to be?',
			default: this.slugifiedName
		}, {
			name: 'viewName',
			message: 'What do you want to call your view?',
			default: this.slugifiedName
		}, {
			name: 'controllerName',
			message: 'What do you want to call your controller?',
			default: this.classifiedName
		}];

		this.prompt(prompts, function(props) {
			this.routePath = props.routePath;
			this.viewName = props.viewName;
			this.controllerName = props.controllerName;

			this.slugifiedRoutePath = _.kebabCase(this.routePath);

			this.slugifiedViewName = _.kebabCase(this.viewName);

			this.slugifiedControllerName = _.kebabCase(this.controllerName);
            this.camelizedControllerName = _.camelCase(this.slugifiedControllerName);
			this.classifiedControllerName = _.capitalize(this.camelizedControllerName);

			done();
		}.bind(this));
	},

	renderFiles: function() {
		var coreConfigFile = format('{0}/public/core/core.module.js', process.cwd());
        if (fs.existsSync(coreConfigFile)) {
            // Read the source routes file content
            var coreConfigContent = util.readFileAsString(coreConfigFile)
                .replace('/* leave me here */', render(this.read('add-route.js'), this));

            // Save route file
            util.writeFileFromString(coreConfigContent, coreConfigFile);
        }
        var moduleStyleFile = format('{0}/public/{1}/styles/{1}.style.scss', process.cwd(), this.slugifiedModuleName);
        if (fs.existsSync(moduleStyleFile)) {
            // Read the source routes file content
            var moduleStyleContent = util.readFileAsString(moduleStyleFile)
                .replace('/* leave me here */', format(',\n        "{0}.view"/* leave me here */', this.slugifiedViewName));

            // Save route file
            util.writeFileFromString(moduleStyleContent, moduleStyleFile);
        }
        else {
            this.template('_.style.scss', moduleStyleFile);
        }
        this.template('_.controller.js', format('public/{0}/controllers/{0}.{1}.controller.js', this.slugifiedModuleName, this.slugifiedControllerName));
        this.template('_.controller.spec.js', format('public/{0}/tests/{0}.{1}.controller.spec.js', this.slugifiedModuleName, this.slugifiedControllerName));
        this.template('_.view.html', format('public/{0}/views/{0}.{1}.view.html', this.slugifiedModuleName, this.slugifiedViewName));
        this.template('_.view.style.scss', format('public/{0}/styles/_{1}.view.scss', this.slugifiedModuleName, this.slugifiedViewName));
	}
});

module.exports = ViewGenerator;

