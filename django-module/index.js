'use strict';

var util = require('../util'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    format = require('string-format'),
    _ = require('lodash'),
    mkdirp = require('mkdirp');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
    init: function() {
        this.slugifiedName = _.kebabCase(this.name);
        this.camelizedName = _.camelCase(this.slugifiedName);
        this.underscoredName = _.snakeCase(this.camelizedName);
        // check  module does not  exist already
        if (this.slugifiedName === 'settings'){
            throw new Error('module "settings" is protected');
        }
        if (util.listDjangoModules().indexOf(this.underscoredName) !== -1){
            throw new Error(format('module "{}" already exists', this.name));
        }
    },

    askForModuleFolders: function() {
        var done = this.async();

        var prompts = [{
            type: 'checkbox',
            name: 'modules',
            message: 'Which files/folders would you like your module to include?',
            choices: [{
                value: 'addSerializers',
                name: ' serializers/',
                checked: false
            }, {
                value: 'addTemplatetags',
                name: ' templatetags/',
                checked: false
            }, {
                value: 'addManagement',
                name: ' management/',
                checked: false
            }, {
                value: 'addModels',
                name: ' models.py admin.py',
                checked: false
            }, {
                value: 'addTests',
                name: ' tests/',
                checked: true
            }, {
                value: 'addUrls',
                name: ' views/ urls.py',
                checked: false
            }]
        }, {
            type: 'confirm',
            name: 'addToInstalledApps',
            message: 'Do you want to add this module to installed apps?',
            default: true
        }];

        this.prompt(prompts, function(props) {
            this.addSerializers = _.contains(props.modules, 'addSerializers');
            this.addTemplatetags = _.contains(props.modules, 'addTemplatetags');
            this.addTests = _.contains(props.modules, 'addTests');
            this.addUrls = _.contains(props.modules, 'addUrls');
            this.addModels = _.contains(props.modules, 'addModels');
            this.addManagement = _.contains(props.modules, 'addManagement');
            this.addToInstalledApps = props.addToInstalledApps;
            done();
        }.bind(this));
    },

    renderModule: function() {
        // Create module folder
        mkdirp.sync(format('server/{0}', this.underscoredName ));
        this.template('_.__init__.py', format('server/{0}/__init__.py', this.underscoredName));

        // Create module sub-folders
        if (this.addSerializers) {
            mkdirp.sync(format('server/{0}/serializers', this.underscoredName));
            this.template('_.serializers.__init__.py', format('server/{0}/serializers/__init__.py', this.underscoredName));
        }
        if (this.addTemplatetags) {
            mkdirp.sync(format('server/{0}/templatetags', this.underscoredName));
            this.template('_.templatetags.__init__.py', format('server/{0}/templatetags/__init__.py', this.underscoredName));
        }
        if (this.addTests) {
            mkdirp.sync(format('server/{0}/tests', this.underscoredName));
            this.template('_.tests.__init__.py', format('server/{0}/tests/__init__.py', this.underscoredName));
        }
        if (this.addModels) {
            this.template('_.admin.py', format('server/{0}/admin.py', this.underscoredName));
            this.template('_.models.py', format('server/{0}/models.py', this.underscoredName));
        }
        if (this.addManagement) {
            mkdirp.sync(format('server/{0}/management', this.underscoredName));
            this.template('_.management.__init__.py', format('server/{0}/management/__init__.py', this.underscoredName));
            mkdirp.sync(format('server/{0}/management/commands', this.underscoredName));
            this.template('_.management.__init__.py', format('server/{0}/management/commands/__init__.py', this.underscoredName));
        }
        if (this.addUrls) {
            mkdirp.sync(format('server/{0}/views', this.underscoredName));
            this.template('_.views.__init__.py', format('server/{0}/views/__init__.py', this.underscoredName));
            this.template('_.urls.py', format('server/{0}/urls.py', this.underscoredName));
            util.replaceInFile('server/urls.py',
                               util.regexes.leaveMePy,
                               format('    # leave me here #\n    url(r\'^\', include(\'server.{0}.urls\')),', this.underscoredName));

        }

        // add module to installed apps
        if (this.addToInstalledApps) {
            util.replaceInFile(
                'server/settings/base.py',
                util.regexes.installedApps,
                format('INSTALLED_APPS = ($1    \'server.{0}\',\n)', this.underscoredName));
        }
    }
});

module.exports = ModuleGenerator;
