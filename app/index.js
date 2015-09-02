'use strict';

var util = require('../util'),
	path = require('path'),
	yeoman = require('yeoman-generator'),
	chalk = require('chalk'),
    format = require('string-format'),
    uuid = require('node-uuid'),
    _ = require('lodash');

var MeanGenerator = yeoman.generators.Base.extend({
	init: function() {
        this.secretKey = uuid.v4();
        this.log(this.yeoman);
        this.log(chalk.magenta('You\'re using the official DjangularJS generator.'));
	},
	askForApplicationDetails: function() {
		var done = this.async();

		var prompts = [{
			name: 'appName',
			message: 'What would you like to call your application?',
			default: path.basename(process.cwd())
		}];

		this.prompt(prompts, function(props) {
			this.appName = props.appName;
			this.slugifiedAppName = _.kebabCase(this.appName);
			done();
		}.bind(this));
	},

	copyApplicationFolder: function() {
        var blacklist = ['contributing.md', 'README.md', 'package.json', 'bower.js', 'Vagrantfile'];
        var rendered = {
            'provisioning/group_vars/dev':  'provisioning/group_vars/dev',
            'public/config.js':  'public/config.js',
            '_README.md': 'README.md',
            '_bower.json': 'bower.json',
            '_package.json': 'package.json',
            '_Vagrantfile': 'Vagrantfile'
        };
        util.readdirrecSync(this.sourceRoot()).forEach(function (file) {
            var relativePath = file.replace(this.sourceRoot()+'/','');
            if (_.contains(blacklist, relativePath)){
                return;
            }
            if (rendered[relativePath]){
                this.template(relativePath, rendered[relativePath]);
            }
            else {
                this.bulkCopy(relativePath, relativePath);
            }
        }.bind(this));
	}
});

module.exports = MeanGenerator;
