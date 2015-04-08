'use strict';

window.HomeView = Backbone.View.extend({
  
  template: window.templates.home,

  initialize: function(options) {
    this.map = options.map;
    this.setElement(this.map.getView('BOTTOM_CENTER'));
    this.map.clearMarkers();
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
  }

});