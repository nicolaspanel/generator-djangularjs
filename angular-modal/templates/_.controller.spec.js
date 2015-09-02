'use strict';

(function() {
	describe('<%= classifiedName %> Modal Controller Tests', function() {

		var ctrl, scope, fakeModal, $httpBackend;

		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $fakeModal, _<%= camelizedModuleName %>FakeData_) {
			scope = $rootScope.$new();
            fakeModal = $fakeModal.$new();
			$httpBackend = _$httpBackend_;
			ctrl = $controller('<%= classifiedName %>ModalController', {
				$scope: scope,
				$modalInstance: fakeModal
			});
		}));

        describe('scope', function () {
            it('should be usable', function() {
                expect(scope).toBeDefined();
            });
        });

        describe('modal', function () {
            it('should be usable', function() {
                expect(fakeModal).toBeDefined();
            });
        });

        describe('controller', function () {
            it('should be usable', function() {
                expect(ctrl).toBeDefined();
            });
        });

	});
}());
