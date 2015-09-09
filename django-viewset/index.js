'use strict';

var util = require('../util'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    format = require('string-format'),
    _ = require('lodash'),
    mkdirp = require('mkdirp');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
    askModule: function() {
        var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'moduleName',
            default: 'core',
            message: 'Which module does this APIView belongs to?',
            choices: util.listDjangoModules()
        }];

        this.prompt(prompts, function(props) {
            this.moduleName = props.moduleName;
            this.slugifiedModuleName = _.kebabCase(this.moduleName);
            this.camelizedModuleName = _.camelCase(this.slugifiedModuleName);
            this.underscoredModuleName = _.snakeCase(this.camelizedModuleName);

            this.slugifiedName = _.kebabCase(this.name);
            this.camelizedName = _.camelCase(this.slugifiedName);
            this.classifiedName = _.capitalize(this.camelizedName);
            this.underscoredName = _.snakeCase(this.camelizedName);

            done();
        }.bind(this));
    },

    askForRouteDetails: function() {
        var done = this.async();

        var prompts = [{
            type: 'checkbox',
            name: 'methods',
            message: 'Which methods would you like to include?',
            choices: [{
                value: 'addList',
                name: ' list',
                checked: true
            },{
                value: 'addRetrieve',
                name: ' retrieve',
                checked: true
            },{
                value: 'addCreate',
                name: ' create',
                checked: false
            },{
                value: 'addUpdate',
                name: ' update',
                checked: false
            },{
                value: 'addDestroy',
                name: ' destroy',
                checked: false
            }]
        }, {
            name: 'routePath',
            message: 'What do you want your route path to be?',
            default: this.slugifiedName + 's'
        }];

        this.prompt(prompts, function(props) {

            this.addList = _.contains(props.methods, 'addList');
            this.addRetrieve = _.contains(props.methods, 'addRetrieve');
            this.addCreate = _.contains(props.methods, 'addCreate');
            this.addUpdate = _.contains(props.methods, 'addUpdate');
            this.addDestroy = _.contains(props.methods, 'addDestroy');

            this.routePath = props.routePath;
            this.slugifiedRoutePath = _.kebabCase(this.routePath);

            done();
        }.bind(this));
    },

    askForLookupField: function () {

        var done = this.async();
        this.prompt([{
            name: 'lookupField',
            message: 'What do you want your lookup_field to be?',
            default: 's'
        }], function(props) {
            this.lookupField = props.lookupField;
            this.underscoredLookupField =_.snakeCase(this.lookupField);
            done();
        }.bind(this));

    },

    renderModule: function() {
        var pathToViews = format('server/{0}/views', this.underscoredModuleName);
        var pathToViewsInit = format('server/{0}/views/__init__.py', this.underscoredModuleName);
        if (!fs.existsSync(pathToViews)){
            mkdirp.sync(pathToViews);
            this.template('_.views.__init__.py', pathToViewsInit);
        }
        if (!fs.existsSync(pathToViewsInit)){
            this.template('_.views.__init__.py', pathToViewsInit);
        }
        else {
            // we assume init file exists too
            util.appendInFile(pathToViewsInit, format('\nfrom .{0} import {1}ViewSet', this.underscoredName, this.classifiedName));
        }

        var pathToUrls = format('server/{0}/urls.py', this.underscoredModuleName);
        if (!fs.existsSync(pathToUrls)){
            // create file from template
            this.template('_.urls.py', pathToUrls);

            // make sure that module urls are registered on the project
            if (util.readFileAsString('server/urls.py').indexOf(format('\'server.{0}.urls\'', this.underscoredName)) === -1) {
                util.replaceInFile('server/urls.py',
                    util.regexes.leaveMePy,
                    format('\n    # leave me here #\n    url(r\'^\', include(\'server.{0}.urls\')),', this.underscoredModuleName));
            }
        }
        else {
            // add route into urls files
            util.replaceInFile(pathToUrls,
                util.regexes.urlpatterns,
                format('\nrouter.register(r\'{0}\', views.{2}ViewSet, base_name=\'{1}\')\n\nurlpatterns = [', this.slugifiedRoutePath, this.slugifiedName, this.classifiedName));
        }

        this.template('_.views.viewset.py', format('server/{0}/views/{1}.py', this.underscoredModuleName, this.underscoredName));

        var pathToTests = format('server/{0}/tests', this.underscoredModuleName);
        if (!fs.existsSync(pathToTests)){
            mkdirp.sync(pathToTests);
            this.template('_.tests.__init__.py', format('server/{0}/tests/__init__.py', this.underscoredModuleName));
        }
        this.template('_.tests.test.py', format('server/{0}/tests/test_{1}_viewset.py', this.underscoredModuleName, this.underscoredName));
    }
});

module.exports = ModuleGenerator;
