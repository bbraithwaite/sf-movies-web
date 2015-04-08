'use strict';

var AppView = Backbone.View.extend({
  el: '#map_canvas',

  initialize: function(google) {
    this.map = new GoogleMap(google, this.el);
    this.render();
    this.homeView = new HomeView({ map: this.map });
    this.searchView = new SearchView({ map: this.map });
  },

  render: function() {
    this.map.addView($('<div id="bottom_panel" class="bottom_panel"></div>')[0], 'BOTTOM_CENTER');
    this.map.addView($('<div id="top_panel" class="top_panel"></div>')[0], 'TOP_LEFT');
  }

});