'use strict';

(function (window, document) {

  window.movieApp = window.movieApp || {};

  var detailPanel = function(response) {
    var locationDiv = document.getElementById('location_detail');
    if (locationDiv) {
      locationDiv.style.display = 'none';
    }

    var dashboard = document.getElementById('dashboard');
    if (dashboard) {
      dashboard.style.display = 'none';
    }
    var controlText;
    if (!document.getElementById('film_detail')) {
      controlText = window.movieApp.templates.loading(response);
      document.getElementById('bottom_panel').appendChild(controlText);
    } else {
      controlText = window.movieApp.templates.loading(response);
      controlText.style.display = '';
    }
  };

  var setMoveDetail = function(title, director) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var detail = this.response;
      document.getElementById('film_detail').innerHTML = window.movieApp.templates.movie(detail);
    };
    xhr.open('GET', '/movies/content?title=' + encodeURIComponent(title) + '&director=' + encodeURIComponent(director));
    xhr.responseType = 'json';
    xhr.send();
  };

  var zoom = function(detail, location, map) {
    return function() {
      map.zoomView(location.geo.lat, location.geo.lng);
      var locationDiv = window.movieApp.templates.location(location);
      locationDiv.container.style.display = '';

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
          var locationDetail = document.getElementById('location_detail');
          if (locationDetail) {
            locationDetail.style.display = 'none';
          }

          var filmDetail = document.getElementById('film_detail');
          if (filmDetail) {
            filmDetail.style.display = '';
          }
        });

      locationDiv.container.appendChild(locationDiv.sateliteViewButton);
      locationDiv.container.appendChild(locationDiv.streetViewButton);
      locationDiv.container.appendChild(locationDiv.backToFilmButton);

      document.getElementById('film_detail').style.display = 'none';
    };
  };

  window.movieApp.SearchControl = function(controlDiv, map) {
    var clicked = function (item) {
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

    new window.Autocomplete(controlDiv.searchInput, { 
      url: '/movies/search', 
      param: 'q',
      label: 'title',
      value: 'releaseYear',
      select: function(item) { 
        clicked(item);
      }
    });

    map.addView(controlDiv.container, 'TOP_LEFT');
  };
})(window, document);