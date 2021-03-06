'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var temp = require('temp').track();
var format = require('string-format');
var expect = require('expect.js');
var read = require('../util').readFileAsString;
var fs = require('fs');

function runGenerator(generatorType, name, promptAnswers, done) {
    helpers
        .run(path.resolve(__dirname, '../' + generatorType), {tmpdir: false})
        .withArguments([name])
        .withPrompts(promptAnswers)
        .withOptions({
            'skip-welcome-message': true,
            'skip-install': true,
            'skip-message': true,
            'silent': true
        })
        .on('end', done);
}

describe('DjangularJS generator', function() {
    var workspace;
    this.timeout(10000); // for travis

    afterEach(temp.cleanup);

    beforeEach(function (done) {
        workspace = temp.mkdirSync();
        helpers.testDirectory(workspace, done);
    });

    describe('djangularjs:app ', function(){
        beforeEach(function(done) {
            runGenerator('app', '', {appName: 'my app'}, done);
        });

        it('should create expected files', function() {
            assert.file([
                "provisioning/group_vars/all",
                "provisioning/group_vars/dev",
                "provisioning/roles.yml",
                "public/config.js",
                "public/config.scss",
                "public/core/core.module.js",
                "public/core/styles/core.style.scss",
                "public/core/styles/_misc.scss",
                "server/__init__.py",
                "server/urls.py",
                "server/settings/__init__.py",
                "server/settings/base.py",
                ".bowerrc",
                "bower.json",
                "package.json",
                "README.md"
            ]);
        });

        it('should not create unexpected files ', function() {
            assert.noFile([
                "_bower.json",
                "_package.json",
                "_README.md",
                "contributing.md",
                ".git/FETCH_HEAD"
            ]);
        });

        describe('djangularjs:angular-module', function() {

            var moduleName = 'my-module';

            beforeEach(function(done) {
                runGenerator('angular-module', moduleName, {}, done);
            });

            it('should create expected files', function() {
                assert.file([
                    format("public/{0}/styles/{0}.style.scss", moduleName),
                    format("public/{0}/styles/_misc.scss", moduleName),
                    format("public/{0}/{0}.module.js", moduleName)
                ]);
            });

            describe('djangularjs:angular-controller generator ', function() {
                var ctlrName = 'my-ctrl';
                beforeEach(function(done) {
                    runGenerator('angular-controller', ctlrName, {moduleName: moduleName}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("public/{0}/controllers/{0}.{1}.controller.js", moduleName, ctlrName),
                        format("public/{0}/tests/{0}.{1}.controller.spec.js", moduleName, ctlrName)
                    ]);
                });

            });

            describe('djangularjs:angular-directive generator ', function() {
                var directiveName = 'my-directive';

                describe('without template', function() {
                    beforeEach(function(done) {
                        runGenerator('angular-directive', directiveName, {moduleName: moduleName, haveTemplate: false}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("public/{0}/directives/{0}.{1}.directive.js", moduleName, directiveName),
                            format("public/{0}/tests/{0}.{1}.directive.spec.js", moduleName, directiveName)
                        ]);
                    });
                });

                describe('with template', function() {
                    beforeEach(function(done) {
                        runGenerator('angular-directive', directiveName, {moduleName: moduleName, haveTemplate: true}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("public/{0}/directives/{0}.{1}.directive.js", moduleName, directiveName),
                            format("public/{0}/templates/{0}.{1}.template.html", moduleName, directiveName),
                            format("public/{0}/styles/_{1}.template.scss", moduleName, directiveName),
                            format("public/{0}/tests/{0}.{1}.directive.spec.js", moduleName, directiveName)
                        ]);
                    });
                });
            });

            describe('djangularjs:angular-filter generator', function() {
                var filterName = 'my-filter';
                beforeEach(function(done) {
                    runGenerator('angular-filter', filterName, {moduleName: moduleName}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("public/{0}/filters/{0}.{1}.filter.js", moduleName, filterName),
                        format("public/{0}/tests/{0}.{1}.filter.spec.js", moduleName, filterName)
                    ]);
                });
            });

            describe('djangularjs:angular-modal generator', function() {
                var modalName = 'my-modal';
                describe('generation', function() {
                    beforeEach(function(done) {
                        runGenerator('angular-modal', modalName, {moduleName: moduleName}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("public/{0}/modals/{0}.{1}.modal.js", moduleName, modalName),
                            format("public/{0}/templates/{0}.{1}.template.html", moduleName, modalName),
                            format("public/{0}/styles/_{1}.template.scss", moduleName, modalName),
                            format("public/{0}/tests/{0}.{1}-modal.controller.spec.js", moduleName, modalName)
                        ]);
                    });
                });
            });

            describe('djangularjs:angular-route generator', function() {
                var routeName = 'my-route';
                beforeEach(function(done) {
                    runGenerator('angular-route', routeName, {moduleName: moduleName}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("public/{0}/controllers/{0}.{1}.controller.js", moduleName, routeName),
                        format("public/{0}/tests/{0}.{1}.controller.spec.js", moduleName, routeName),
                        format("public/{0}/views/{0}.{1}.view.html", moduleName, routeName),
                        format("public/{0}/styles/_{1}.view.scss", moduleName, routeName)
                    ]);
                });

                it('should have include ref to view styles', function () {
                    expect(read(format("public/{0}/styles/{0}.style.scss", moduleName)))
                        .to.contain('"my-route.view"');
                });

            });

            describe('djangularjs:angular-service generator', function() {
                var serviceName= 'my-service';
                beforeEach(function(done) {
                    runGenerator('angular-service', serviceName, {moduleName: moduleName}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("public/{0}/services/{0}.{1}.service.js", moduleName, serviceName),
                        format("public/{0}/tests/{0}.{1}.service.spec.js", moduleName, serviceName)
                    ]);
                });
            });

        });

        describe('djangularjs:django-module', function () {
            var moduleName = 'my_module';

            describe('without any module', function () {
                beforeEach(function(done) {
                    runGenerator('django-module', moduleName, {modules: [], addToInstalledApps: false}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("server/{0}/__init__.py", moduleName)
                    ]);
                });

                it('should NOT have added new module into INSTALLED_APPS', function () {
                    expect(read('server/settings/base.py'))
                        .to.not.contain('\'server.my_module\',\n');
                });

                describe('djangularjs:django-api-view', function () {
                    var viewName = 'my_view';

                    beforeEach(function(done) {
                        runGenerator('django-api-view', viewName, {moduleName: moduleName, methods: ['addGet', 'addPost', 'addPut', 'addDelete']}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("server/{0}/views/__init__.py", moduleName),
                            format("server/{0}/views/{1}.py", moduleName, viewName),
                            format("server/{0}/tests/test_{1}_view.py", moduleName, viewName),
                        ]);
                    });

                    it('should import view', function () {
                        expect(read(format('server/{0}/views/__init__.py', moduleName)))
                            .to.contain('from .my_view import MyViewView');
                    });

                    it('should include module urls into server/urls.py', function () {
                        expect(read('server/urls.py'))
                            .to.contain(format('url(r\'^\', include(\'server.{0}.urls\')),', moduleName));
                    });
                });

                describe('djangularjs:django-viewset', function () {
                    var viewsetName = 'to_to';

                    beforeEach(function(done) {
                        runGenerator('django-viewset', viewsetName, {
                            moduleName: moduleName,
                            methods: ['addList', 'addRetrieve', 'addCreate', 'addUpdate', 'addDestroy'],
                            routePath: 'totos',
                            lookupField: 'my-pk'
                        }, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("server/{0}/views/__init__.py", moduleName),
                            format("server/{0}/views/{1}.py", moduleName, viewsetName),
                            format("server/{0}/tests/test_{1}_viewset.py", moduleName, viewsetName),
                        ]);
                    });

                    it('should import view', function () {
                        expect(read(format('server/{0}/views/__init__.py', moduleName)))
                            .to.contain('from .to_to import ToToViewSet');
                    });

                    it('should include module urls into server/urls.py', function () {
                        expect(read('server/urls.py'))
                            .to.contain(format('url(r\'^\', include(\'server.{0}.urls\')),', moduleName));
                    });

                    it('should register the viewset', function () {
                        expect(read(format('server/{0}/urls.py', moduleName)))
                            .to.contain('router.register(r\'totos\', views.ToToViewSet, base_name=\'to-to\')');
                    });

                    it('should customize the lookup field', function () {
                        expect(read(format("server/{0}/views/{1}.py", moduleName, viewsetName)))
                            .to.contain('lookup_field = \'my_pk\'');
                    });
                });

                describe('djangularjs:django-templatetag', function () {
                    var templateTagName = 'my_template_tag';

                    beforeEach(function(done) {
                        runGenerator('django-templatetag', templateTagName, {moduleName: moduleName}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("server/{0}/templatetags/__init__.py", moduleName),
                            format("server/{0}/templatetags/{1}.py", moduleName, templateTagName),
                            format("server/{0}/tests/test_{1}_templatetag.py", moduleName, templateTagName),
                        ]);
                    });

                });

                describe('djangularjs:django-filter', function () {
                    var filterName = 'my_filter';

                    beforeEach(function(done) {
                        runGenerator('django-filter', filterName, {moduleName: moduleName}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("server/{0}/templatetags/__init__.py", moduleName),
                            format("server/{0}/templatetags/{1}.py", moduleName, filterName),
                            format("server/{0}/tests/test_{1}_filter.py", moduleName, filterName)
                        ]);
                    });

                });

                describe('djangularjs:django-serializer', function () {
                    var filterName = 'my_serializer';

                    beforeEach(function(done) {
                        runGenerator('django-serializer', filterName, {moduleName: moduleName, haveTest: true}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("server/{0}/serializers/__init__.py", moduleName),
                            format("server/{0}/serializers/{1}.py", moduleName, filterName),
                            format("server/{0}/tests/test_{1}_serializer.py", moduleName, filterName)
                        ]);
                    });

                });
            });

            describe('with serializers', function () {
                beforeEach(function(done) {
                    runGenerator('django-module', moduleName, {modules: ['addSerializers']}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("server/{0}/__init__.py", moduleName),
                        format("server/{0}/serializers/__init__.py", moduleName)
                    ]);
                });

                describe('djangularjs:django-serializer', function () {
                    var serializerName = 'my_serializer';

                    beforeEach(function(done) {
                        runGenerator('django-serializer', serializerName, {moduleName: moduleName, haveTest: false}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("server/{0}/serializers/{1}.py", moduleName, serializerName)
                        ]);
                    });

                    it('should have added the new serializer into the serializers module', function () {
                        expect(read(format("server/{0}/serializers/__init__.py", moduleName)))
                            .to.contain('from .my_serializer import MySerializerSerializer');
                    });

                });
            });

            describe('with templatetags', function () {
                beforeEach(function(done) {
                    runGenerator('django-module', moduleName, {modules: ['addTemplatetags']}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("server/{0}/__init__.py", moduleName),
                        format("server/{0}/templatetags/__init__.py", moduleName)
                    ]);
                });

                it('should have added new module into INSTALLED_APPS', function () {
                    expect(read('server/settings/base.py'))
                        .to.contain('\'server.my_module\',\n');
                });

                describe('djangularjs:django-templatetag', function () {
                    var templateTagName = 'my_template_tag';

                    beforeEach(function(done) {
                        runGenerator('django-templatetag', templateTagName, {moduleName: moduleName}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("server/{0}/templatetags/{1}.py", moduleName, templateTagName),
                            format("server/{0}/tests/test_{1}_templatetag.py", moduleName, templateTagName),
                        ]);
                    });
                });


                describe('djangularjs:django-filter', function () {
                    var filterName = 'my_filter';

                    beforeEach(function(done) {
                        runGenerator('django-filter', filterName, {moduleName: moduleName}, done);
                    });

                    it('should create expected files', function() {
                        assert.file([
                            format("server/{0}/templatetags/{1}.py", moduleName, filterName),
                            format("server/{0}/tests/test_{1}_filter.py", moduleName, filterName)
                        ]);
                    });

                });
            });

            describe('with tests', function () {
                beforeEach(function(done) {
                    runGenerator('django-module', moduleName, {modules: ['addTests']}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("server/{0}/__init__.py", moduleName),
                        format("server/{0}/tests/__init__.py", moduleName)
                    ]);
                });
            });

            describe('with urls', function () {
                beforeEach(function(done) {
                    runGenerator('django-module', moduleName, {modules: ['addUrls']}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("server/{0}/__init__.py", moduleName),
                        format("server/{0}/views/__init__.py", moduleName),
                        format("server/{0}/urls.py", moduleName)
                    ]);
                });
                it('should have updated server/urls.py files', function () {
                    expect(read('server/urls.py')).to.contain('url(r\'^\', include(\'server.my_module.urls\')),\n');
                });

            });

            describe('with admin.py and models.py', function () {
                beforeEach(function(done) {
                    runGenerator('django-module', moduleName, {modules: ['addModels']}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("server/{0}/__init__.py", moduleName),
                        format("server/{0}/admin.py", moduleName),
                        format("server/{0}/models.py", moduleName)
                    ]);
                });

            });

            describe('with management stuffs', function () {
                beforeEach(function(done) {
                    runGenerator('django-module', moduleName, {modules: ['addManagement']}, done);
                });

                it('should create expected files', function() {
                    assert.file([
                        format("server/{0}/management/__init__.py", moduleName),
                        format("server/{0}/management/commands/__init__.py", moduleName)
                    ]);
                });

            });

        });
    });
});

