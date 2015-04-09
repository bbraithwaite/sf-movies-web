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
    this.map.addView($(window.templates.topPanel())[0], 'TOP_LEFT');
    this.map.addView($(window.templates.bottomPanel())[0], 'BOTTOM_CENTER');
  }

});