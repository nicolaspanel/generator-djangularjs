'use strict';

(function() {
	describe('<%= classifiedControllerName %> Controller Tests', function() {

		var <%= classifiedControllerName %>Controller, scope, $httpBackend;

		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _<%= camelizedModuleName %>FakeData_) {
			scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			<%= classifiedControllerName %>Controller = $controller('<%= classifiedControllerName %>Controller', {
				$scope: scope
			});
		}));

        it('should be testable', function() {
            expect(<%= classifiedControllerName %>Controller).toBeDefined();
        });

	});
}());
