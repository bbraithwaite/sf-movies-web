'use strict';

// Route /
window.HomeController = function(map) {
  return {
    route: '/',
    render: function() {
      map.addView(this.view, 'BOTTOM_CENTER');
    }
  };
};

window.SearchController = function(map) {
  var $ = this;

  return {
    viewModel: {
      query: document.getElementById('query')
    },
    route: '/',
    init: function() {
      new window.Autocomplete(this.viewModel.query, { 
        url: '/movies/search', 
        param: 'q',
        label: 'title',
        value: 'releaseYear',
        select: function(item) { 
          $.navigateTo('/film', { 
            title: item.title, 
            director: item.director 
          });
        }
      });
    },
    render: function() {
      map.addView(this.view, 'TOP_LEFT');
    }
  };
};

// Route /film
window.FilmController = function(map, http) {
  return {
    route: '/film',
    render: function(args) {
      var filmUrl = '/movies/content?title=' + 
        encodeURIComponent(args.title) + 
        '&director=' + 
        encodeURIComponent(args.director);
      var view = this.view;
      http.get(filmUrl, function(err, data) {
        view.setModel(data);
        map.addView(view, 'BOTTOM_CENTER');
      });
    }
  };
};

window.LocationsController = function(map, http) {
  return {
    route: '/film',
    render: function(args) {
      var locationUrl = '/movies/locations?title=' + 
        encodeURIComponent(args.title) + 
        '&director=' + 
        encodeURIComponent(args.director);

      map.clearMarkers();

      http.get(locationUrl, function(err, data) {
        
        data.locations.forEach(function(l) {
          map.plotLocation(l.geo.lat, l.geo.lng);
        });

      });
    }
  };
};
