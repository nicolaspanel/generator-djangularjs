'use strict';

angular.module('<%= slugifiedModuleName %>').directive('<%= camelizedName %>',
	function(staticPath) {
		return {<% if (haveTemplate) { %>
            templateUrl: staticPath('<%= slugifiedModuleName %>/templates/<%= slugifiedModuleName %>.<%= slugifiedName %>.template.html'),
            restrict: 'EA',
            replace: true, <% } else { %>
            restrict: 'A',<% } %>
			link: function postLink(scope, element, attrs) {
				// Add directive's logic here
				// ...
			}
		};
	});
