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
            message: 'Which module does this serializer belongs to?',
            choices: util.listDjangoModules()
        },{
            type: 'confirm',
            name: 'haveTest',
            default: false,
            message: 'Do you want to create a test for this serializer?'
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

            this.haveTest = props.haveTest;

            done();
        }.bind(this));
    },

    renderModule: function() {
        var pathToSerializers = format('server/{0}/serializers', this.underscoredModuleName);
        var pathToSerializersInit = format('server/{0}/serializers/__init__.py', this.underscoredModuleName);
        if (!fs.existsSync(pathToSerializers)){
            mkdirp.sync(pathToSerializers);
            this.template('_.serializers.__init__.py', pathToSerializersInit);
        }
        if (!fs.existsSync(pathToSerializersInit)){
            this.template('_.serializers.__init__.py', pathToSerializersInit);
        }
        else {
            util.appendInFile(pathToSerializersInit, format('\nfrom .{0} import {1}Serializer', this.underscoredName, this.classifiedName));
        }
        this.template('_.serializers.serializer.py', format('server/{0}/serializers/{1}.py', this.underscoredModuleName, this.underscoredName));

        if (!this.haveTest){
            return;
        }
        var pathToTests = format('server/{0}/tests', this.underscoredModuleName);
        if (!fs.existsSync(pathToTests)){
            mkdirp.sync(pathToTests);
            this.template('_.tests.__init__.py', format('server/{0}/tests/__init__.py', this.underscoredModuleName));
        }
        this.template('_.tests.serializer.py', format('server/{0}/tests/test_{1}_serializer.py', this.underscoredModuleName, this.underscoredName));
    }
});

module.exports = ModuleGenerator;
