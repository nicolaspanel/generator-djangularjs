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
            message: 'Which module does this templatetag belongs to?',
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

    renderModule: function() {
        var pathToTemplateTags = format('server/{0}/templatetags', this.underscoredModuleName);
        if (!fs.existsSync(pathToTemplateTags)){
            mkdirp.sync(pathToTemplateTags);
            this.template('_.templatetags.__init__.py', format('server/{0}/templatetags/__init__.py', this.underscoredModuleName));
        }
        this.template('_.templatetags.templatetag.py', format('server/{0}/templatetags/{1}.py', this.underscoredModuleName, this.underscoredName));
        var pathToTests = format('server/{0}/tests', this.underscoredModuleName);
        if (!fs.existsSync(pathToTests)){
            mkdirp.sync(pathToTests);
            this.template('_.tests.__init__.py', format('server/{0}/tests/__init__.py', this.underscoredModuleName));
        }
        this.template('_.tests.templatetag.py', format('server/{0}/tests/test_{1}_templatetag.py', this.underscoredModuleName, this.underscoredName));
    }
});

module.exports = ModuleGenerator;
