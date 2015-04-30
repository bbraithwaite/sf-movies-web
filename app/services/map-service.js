'use strict';

angular.module('sfMovies').service('mapService', function() {
  var markers = [];
  var sanFrancisco;
  var mapOptions;
  var mapInstance;
  var googleMaps;

  return {
    initialize: function(GoogleMaps, mapDiv) {
      googleMaps = GoogleMaps;
      sanFrancisco = new GoogleMaps.LatLng(37.7577, -122.4376);
      mapOptions = {
        center: sanFrancisco,
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false,
        streetViewControlOptions: {
          position: GoogleMaps.ControlPosition.RIGHT_CENTER
        },
        overviewMapControl: false,
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: GoogleMaps.ControlPosition.RIGHT_CENTER
        }
      };
      mapInstance = new GoogleMaps.Map(mapDiv, mapOptions); 
    },
    addControl: function(control, position) {
      if (!mapInstance) throw 'map is not initialized';
      mapInstance.controls[googleMaps.ControlPosition[position]].push(control);
    },
    setOptions: function(opts) {
      mapInstance.setOptions(opts);
    },
    clearMarkers: function() {
      markers.forEach(function(m) {
        m.setMap(null);
      });
      markers = [];
    },
    plotLocation: function(lat, lng, clickHandler) {
      var pos = new googleMaps.LatLng(lat, lng);
      var marker = new googleMaps.Marker({
        position: pos,
        map: mapInstance,
        animation: googleMaps.Animation.DROP
      });

      markers.push(marker);

      if (clickHandler) {
        googleMaps.event.addListener(marker, 'click', clickHandler);
      }
    },
    zoomView: function(lat, lng) {
      mapInstance.setCenter(new googleMaps.LatLng(lat, lng));
      mapInstance.setZoom(14);
    },
    streetView: function(lat, lng) {
      var panorama = mapInstance.getStreetView();
      panorama.setPosition({lat: lat, lng: lng});
      panorama.setVisible(true);
    },
    roadmapView: function(lat, lng) {
      mapInstance.setCenter(new googleMaps.LatLng(lat, lng));
      mapInstance.setZoom(14);
      mapInstance.setMapTypeId(googleMaps.MapTypeId.ROADMAP);
    },
    sateliteView: function(lat, lng) {
      mapInstance.setCenter(new googleMaps.LatLng(lat, lng));
      mapInstance.setZoom(20);
      mapInstance.setMapTypeId(googleMaps.MapTypeId.SATELLITE);
      mapInstance.setTilt(45);
      mapInstance.setHeading(90);
    },
    reset: function() {
      mapInstance.setZoom(11);
      mapInstance.setCenter(sanFrancisco);
      mapInstance.setMapTypeId(googleMaps.MapTypeId.ROADMAP);
    }
  };
});