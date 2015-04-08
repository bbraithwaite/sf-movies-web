'use strict';

window.LocationView = Backbone.View.extend({
  
  template: window.templates.location,

  initialize: function(options) {
    this.map = options.map;
    this.setElement(this.map.getView('BOTTOM_CENTER'));
    this.location = options.location;
    this.movie = options.movie;
    this.movieView = options.movieView;
    this.render();
  },

  events: {
    'click #sateliteView': 'sateliteViewClick',
    'click #roadmapView': 'roadmapViewClick',
    'click #streetView': 'streetViewClick',
    'click #filmView': 'filmViewClick'
  },

  sateliteViewClick: function() {
    this.map.sateliteView(this.location.geo.lat, this.location.geo.lng);
    this.$el.find('#sateliteView').hide();
    this.$el.find('#roadmapView').show();
  },

  roadmapViewClick: function() {
    this.map.roadmapView(this.location.geo.lat, this.location.geo.lng);
    this.$el.find('#sateliteView').show();
    this.$el.find('#roadmapView').hide();
  },

  streetViewClick: function() {
    this.map.streetView(this.location.geo.lat, this.location.geo.lng);
  },

  filmViewClick: function() {
    this.map.reset();
    this.movieView.render();    
  },

  render: function() {
    this.map.zoomView(this.location.geo.lat, this.location.geo.lng);
    this.$el.empty().html(this.template(this.location, this.movie));
  }

});