'use strict';

(function() {
	describe('<%= classifiedControllerName %> Controller Tests', function() {
		// Initialize global variables
		var <%= classifiedControllerName %>Controller, scope, $httpBackend;

		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _<%= camelizedModuleName %>FakeData_) {
			// Set a new global scope
			scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			<%= classifiedControllerName %>Controller = $controller('<%= classifiedControllerName %>Controller', {
				$scope: scope
			});
		}));

		describe('scope', function () {
		    it('should be usable', function() {
                expect(scope).toBeDefined();
            });
        });

		describe('controller', function () {
		    it('should be usable', function() {
                expect(<%= classifiedControllerName %>Controller).toBeDefined();
            });
        });
	});
}());
