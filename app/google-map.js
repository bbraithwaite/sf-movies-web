'use strict';

window.GoogleMap = function(mapDiv) {

  var g = window.google;
  var markers = [];
  var sanFrancisco = new g.maps.LatLng(37.7577, -122.4376);

  var mapOptions = {
    center: sanFrancisco,
    zoom: 11,
    mapTypeControl: false,
    streetViewControl: false,
    streetViewControlOptions: {
      position: g.maps.ControlPosition.RIGHT_CENTER
    },
    overviewMapControl: false,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: g.maps.ControlPosition.RIGHT_CENTER
    }
  };

  var mapInstance = new g.maps.Map(mapDiv, mapOptions);
  var views = [];

  return { 
    addView: function(view, position) {
      // if there is already a view in this position?
      if (views[position]) {
        views[position].forEach(function(v) {
          v.visible(false);
        });
      } else {
        views[position] = [];
      }

      var newView = true;
      views[position].forEach(function(v) {
        if (v.id === view.id) {
          newView = false;
        }
      });

      if (newView) {
        views[position].push(view);
        mapInstance.controls[g.maps.ControlPosition[position]]
          .push(view.container);
      } else {
        console.log(view.container);
      }

      view.visible(true);
    },
    clearMarkers: function() {
      markers.forEach(function(m) {
        m.setMap(null);
      });
      markers = [];
    },
    plotLocation: function(lat, lng, clickHandler) {
      var pos = new g.maps.LatLng(lat, lng);
      var marker = new g.maps.Marker({
        position: pos,
        map: mapInstance,
        animation: g.maps.Animation.DROP
      });

      markers.push(marker);

      if (clickHandler) {
        g.maps.event.addListener(marker, 'click', clickHandler);
      }
    }
  };
};
