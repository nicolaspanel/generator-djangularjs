'use strict';

var util = require('../util'),
	yeoman = require('yeoman-generator'),
    fs = require('fs'),
    format = require('string-format'),
    _ = require('lodash'),
    mkdirp = require('mkdirp'),
    render = require('ejs').render;


var ModuleGenerator = yeoman.generators.NamedBase.extend({
	init: function() {
		this.slugifiedName = _.kebabCase(this.name);
        this.camelizedName = _.camelCase(this.slugifiedName);
        // check  module does not  exist already
        if (this.slugifiedName === '_'){
            throw new Error('module "_" is protected');
        }
        if (util.listAngularModules().indexOf(this.slugifiedName) !== -1){
            throw new Error(format('module "{}" already exists', this.name));
        }
	},

	askForModuleFolders: function() {
		var done = this.async();

		var prompts = [{
			type: 'checkbox',
			name: 'folders',
			message: 'Which folders would you like your module to include?',
			choices: [{
				value: 'addConstantsFolder',
				name: 'constants',
				checked: false
			}, {
				value: 'addControllersFolder',
				name: 'controllers',
				checked: false
			}, {
				value: 'addDirectivesFolder',
				name: 'directives',
				checked: true
			}, {
				value: 'addFiltersFolder',
				name: 'filters',
				checked: false
			}, {
				value: 'addImagesFolder',
				name: 'img',
				checked: false
			}, {
				value: 'addModalsFolder',
				name: 'modals',
				checked: false
			}, {
				value: 'addServicesFolder',
				name: 'services',
				checked: false
			}, {
				value: 'addTemplatesFolder',
				name: 'templates',
				checked: false
			}, {
				value: 'addViewsFolder',
				name: 'views',
				checked: false
			}]
		}];

		this.prompt(prompts, function(props) {
			this.addConstantsFolder = _.contains(props.folders, 'addConstantsFolder');
			this.addControllersFolder = _.contains(props.folders, 'addControllersFolder');
			this.addDirectivesFolder = _.contains(props.folders, 'addDirectivesFolder');
			this.addFiltersFolder = _.contains(props.folders, 'addFiltersFolder');
			this.addImagesFolder = _.contains(props.folders, 'addImagesFolder');
			this.addServicesFolder = _.contains(props.folders, 'addServicesFolder');
			this.addTemplatesFolder = _.contains(props.folders, 'addTemplatesFolder');
			this.addViewsFolder = _.contains(props.folders, 'addViewsFolder');
			this.addModalsFolder = _.contains(props.folders, 'addModalsFolder');

			done();
		}.bind(this));
	},

	renderModule: function() {
		// Create module folder
		mkdirp.sync(format('public/{0}', this.slugifiedName ));

		// Create module sub-folders
		if (this.addConstantsFolder) mkdirp.sync(format('public/{0}/constants', this.slugifiedName));
		if (this.addControllersFolder) mkdirp.sync(format('public/{0}/controllers', this.slugifiedName));
		mkdirp.sync(format('public/{0}/styles', this.slugifiedName));
		if (this.addDirectivesFolder) mkdirp.sync(format('public/{0}/directives', this.slugifiedName));
		if (this.addFiltersFolder) mkdirp.sync(format('public/{0}/filters', this.slugifiedName));
		if (this.addImagesFolder) mkdirp.sync(format('public/{0}/img', this.slugifiedName));
		if (this.addServicesFolder) mkdirp.sync(format('public/{0}/services', this.slugifiedName));
		if (this.addTemplatesFolder) mkdirp.sync(format('public/{0}/templates', this.slugifiedName));
		mkdirp.sync(format('public/{0}/tests', this.slugifiedName));
		if (this.addViewsFolder) mkdirp.sync(format('public/{0}/views', this.slugifiedName));
		if (this.addModalsFolder) mkdirp.sync(format('public/{0}/modals', this.slugifiedName));

		// Render angular module definition
		this.template('_.module.js', format('public/{0}/{0}.module.js', this.slugifiedName));
		this.template('_.fake-data.js', format('public/{0}/tests/{0}.fake-data.js', this.slugifiedName));
        this.template('_.style.scss', format('public/{0}/styles/{0}.style.scss', this.slugifiedName));
        this.template('_._misc.scss', format('public/{0}/styles/_misc.scss', this.slugifiedName));

        // include module`s style into app`s style
        var stylesFilePath = format('{0}/{1}', process.cwd(), 'public/config.scss');
        if (fs.existsSync(stylesFilePath)) {
            // Read the source routes file content
            var stylesFileContent = util.readFileAsString(stylesFilePath)
                .replace('/* leave me here */', render(this.read('add-style.scss'), this));

            // Save route file
            util.writeFileFromString(stylesFileContent, stylesFilePath);
        }
	}
});

module.exports = ModuleGenerator;
