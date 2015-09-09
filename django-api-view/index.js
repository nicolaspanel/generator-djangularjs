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
                value: 'addGet',
                name: ' GET',
                checked: true
            },{
                value: 'addPost',
                name: ' POST',
                checked: false
            },{
                value: 'addPut',
                name: ' PUT',
                checked: false
            },{
                value: 'addDelete',
                name: ' DELETE',
                checked: false
            }]
        }];

        this.prompt(prompts, function(props) {

            this.addGet = _.contains(props.methods, 'addGet');
            this.addPost = _.contains(props.methods, 'addPost');
            this.addPut = _.contains(props.methods, 'addPut');
            this.addDelete = _.contains(props.methods, 'addDelete');

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
            util.appendInFile(pathToViewsInit, format('\nfrom .{0} import {1}View', this.underscoredName, this.classifiedName));
        }

        var pathToUrls = format('server/{0}/urls.py', this.underscoredModuleName);
        if (!fs.existsSync(pathToUrls)){
            // create file from template
            this.template('_.urls.py', pathToUrls);

            // make sure that module urls are registered on the project
            if (util.readFileAsString('server/urls.py').indexOf(format('\'server.{0}.urls\'', this.underscoredName)) === -1) {
                util.replaceInFile('server/urls.py',
                    util.regexes.leaveMePy,
                    format('    # leave me here #\n    url(r\'^\', include(\'server.{0}.urls\')),', this.underscoredModuleName));
            }
        }
        else {
            // add route into urls files
            var newUrls = format('\n\nurlpatterns = [\n' +
                '    url(r\'^{0}/$$\', views.{1}View.as_view()),\n'+
                '    url(r\'^{0}/(?P<pk>[0-9]+)/$$\', views.{1}View.as_view()),' +
                '', this.slugifiedName, this.classifiedName);

            util.replaceInFile(pathToUrls,
                util.regexes.urlpatterns,
                newUrls);
        }

        this.template('_.views.view.py', format('server/{0}/views/{1}.py', this.underscoredModuleName, this.underscoredName));

        var pathToTests = format('server/{0}/tests', this.underscoredModuleName);
        if (!fs.existsSync(pathToTests)){
            mkdirp.sync(pathToTests);
            this.template('_.tests.__init__.py', format('server/{0}/tests/__init__.py', this.underscoredModuleName));
        }
        this.template('_.tests.test.py', format('server/{0}/tests/test_{1}_view.py', this.underscoredModuleName, this.underscoredName));
    }
});

module.exports = ModuleGenerator;
