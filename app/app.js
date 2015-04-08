var AppView = Backbone.View.extend({
	tagName: 'body',
	initialize: function() {
		this.map = new GoogleMap(google, document.getElementById('map_canvas'));
	}
});