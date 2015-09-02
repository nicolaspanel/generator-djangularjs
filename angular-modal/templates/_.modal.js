'use strict';

angular.module('<%= slugifiedModuleName %>')
	.factory('<%= camelizedName %>Modal', function ($modal, staticPath) {

        function <%= classifiedName %>Modal(){}

        <%= classifiedName %>Modal.open = function (options) {
            return $modal.open(angular.extend({
            templateUrl: staticPath('<%= slugifiedModuleName %>/templates/<%= slugifiedModuleName %>.<%= slugifiedName %>.template.html'),
                controller: '<%= classifiedName %>ModalController',
                controllerAs: 'ctrl',
                size: '<%= modalSize %>'
            }, options || {}));
        };

        return <%= classifiedName %>Modal;
    })
	.controller('<%= classifiedName %>ModalController', function ($scope, $modalInstance) {
        // TODO: add your custom logic here
    });
