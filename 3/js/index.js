(function($) {
	var reportController = {
		__name: 'hundson.ReportController',

		__ready: function() {
		},
		
		'input, textarea focusout': function(context, $el) {
		},

		'input[name="img"] change': function(context, $el) {
		},

		'.register click': function(context, $el) {
		},

	};
	
	h5.core.expose(reportController);
})(jQuery);
$(function() {
	h5.core.controller(document.body, hundson.ReportController);
});
