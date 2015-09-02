'use strict';

(function() {
	describe('<%= camelizedName %> Service Spec', function() {
		// Initialize global variables
		var <%= camelizedName %>;

		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function(_<%= camelizedName %>_) {
            <%= camelizedName %> = _<%= camelizedName %>_;
		}));

		it('should be usable', inject(function() {
			// The test logic
			expect(<%= camelizedName %>).toBeDefined();
		}));
	});
}());
