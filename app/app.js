var AppView = Backbone.View.extend({
	el: $('#app'),
	initialize: function() {
		var self = this;

		new GoogleMap(google, document.getElementById('map_canvas'));
		console.log($('#map_canvas').is(':visible'));
	}
});