'use strict';

(function (window, document) {

  window.movieApp = window.movieApp || {};

  window.movieApp.DetailControl = function(map) {

    var view;

    var getView = function() {

      if (!view) {
        view = {
          locationDiv: window.movieApp.initView('location_detail'),
          dashboardDiv: window.movieApp.initView('dashboard'),
          filmDetailDiv: window.movieApp.initView('film_detail')
        };
      }

      return view;
    };
   
    var detailPanel = function(response) {
      
      getView().locationDiv.hide();
      getView().dashboardDiv.hide();
   
      // TODO: not ideal
      var controlText = window.movieApp.templates.loading(response);
      document.getElementById('bottom_panel').appendChild(controlText);      
      
      getView().filmDetailDiv.show();
    };

    var setMoveDetail = function(title, director) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var detail = this.response;
        getView().filmDetailDiv.setText(window.movieApp.templates.movie(detail));
      };
      xhr.open('GET', '/movies/content?title=' + encodeURIComponent(title) + '&director=' + encodeURIComponent(director));
      xhr.responseType = 'json';
      xhr.send();
    };

    var zoom = function(detail, location, map) {
      return function() {
        map.zoomView(location.geo.lat, location.geo.lng);
        var locationDiv = window.movieApp.templates.location(location);
        
        getView().locationDiv.hide();
        getView().filmDetailDiv.hide();

        document.getElementById('bottom_panel').appendChild(locationDiv.container);

        locationDiv.sateliteViewButton.addEventListener('click', function() {
          if (this.value === 'Satelite View') {
            map.sateliteView(location.geo.lat, location.geo.lng);
            this.value = 'Back to Roadmap';
          } else {
            map.roadmapView(location.geo.lat, location.geo.lng);
            this.value = 'Satelite View';
          }
        });

        locationDiv.streetViewButton.addEventListener('click', function() {
          map.streetView(location.geo.lat, location.geo.lng);
        });

        locationDiv.backToFilmButton.addEventListener('click', function() {
            map.reset();
            getView().locationDiv.hide();
            getView().filmDetailDiv.show(); 
          });

        locationDiv.container.appendChild(locationDiv.sateliteViewButton);
        locationDiv.container.appendChild(locationDiv.streetViewButton);
        locationDiv.container.appendChild(locationDiv.backToFilmButton);
      };
    };

    return function clicked(item) {
      map.clearMarkers();
      map.setOptions({ streetViewControl: false, zoomControl: true });

      detailPanel(item.title);
      setMoveDetail(item.title, item.director);

      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var response = this.response;
        for (var i = 0; i < response.locations.length; i++) {
          map.plotLocation(
            response.locations[i].geo.lat, 
            response.locations[i].geo.lng, 
            zoom(response, response.locations[i], map));
        }
      };
      xhr.open('GET', '/movies/locations?title=' + encodeURIComponent(item.title) + '&director=' + encodeURIComponent(item.director));
      xhr.responseType = 'json';
      xhr.send();
    };
  };

})(window, document);