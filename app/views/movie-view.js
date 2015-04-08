'use strict';

window.MovieView = Backbone.View.extend({
 
  template: window.templates.movie,
  
  initialize: function(options) {
    this.map = options.map;
    this.setElement(this.map.getView('BOTTOM_CENTER'));
    this.movie = options.movie;
    this.render();
    this.plotLocations();
    this.loadContent();
  },

  render: function() {
    this.$el.empty().html(this.template(this.movie));
  },

  loadContent: function() {
    var self = this;
    var params = {
      title: this.movie.title,
      year: parseInt(this.movie.releaseYear, 10)
    };

    window.omdb.get(params, function(err, content) {
      if (!err) {
        self.movie.poster = content.Poster;
        self.movie.plot = content.Plot;
        self.movie.poster = content.Poster;
        self.movie.genre = content.Genre;
        self.movie.actors = content.Actors;
        self.movie.rating = content.imdbRating;
        self.render();
      }
    });
  },

  plotLocations: function() {
    var self = this;
    self.map.clearMarkers();
    self.map.setOptions({ streetViewControl: false, zoomControl: true });
    
    var markerClick = function(location) {
      return function callback() {
        var locationView = new LocationView({ 
          map: self.map, 
          location: location,
          movie: self.movie,
          movieView: self
        });
      };
    };

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var response = this.response;
      for (var i = 0; i < response.locations.length; i++) {
        self.map.plotLocation(
          response.locations[i].geo.lat, 
          response.locations[i].geo.lng,
          markerClick(response.locations[i]));
      }
    };

    xhr.open('GET', '/movies/locations?title=' + 
      encodeURIComponent(self.movie.title) + 
      '&director=' + 
      encodeURIComponent(self.movie.director));
    xhr.responseType = 'json';
    xhr.send();
  }

});