'use strict';

window.SearchView = Backbone.View.extend({

  template: window.templates.search,

  initialize: function(options) {
    this.map = options.map;
    this.setElement(this.map.getView('TOP_LEFT'));
    this.render();
  },

  render: function() {
    var self = this;
    var el = $(this.template());
    new Autocomplete(el.find('#q')[0], { 
      url: '/movies/search', 
      param: 'q',
      label: 'title',
      value: 'releaseYear',
      select: function(movie) {
        new MovieView({ movie: movie, map: self.map });
      }
    });
    this.$el.html(el);
  }

});