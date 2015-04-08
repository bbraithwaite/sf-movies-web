'use strict';

window.GoogleMap = function(google, mapDiv) {

  var markers = [];
  var sanFrancisco = new google.maps.LatLng(37.7577, -122.4376);

  var mapOptions = {
    center: sanFrancisco,
    zoom: 11,
    mapTypeControl: false,
    streetViewControl: false,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    overviewMapControl: false,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    }
  };

  var mapInstance = new google.maps.Map(mapDiv, mapOptions);
  var views = [];

  return {
    addView: function(view, position) {
      // if there is already a view in this position?
      if (views[position]) {
        views[position].forEach(function(v) {
          v.style.display = 'none';
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
        mapInstance.controls[google.maps.ControlPosition[position]]
          .push(view);
      }

      view.style.display = '';
    },
    setOptions: function(opts) {
      mapInstance.setOptions(opts);
    },
    zoomView: function(lat, lng) {
      var pos = new google.maps.LatLng(lat, lng);
      mapInstance.setCenter(pos);
      mapInstance.setZoom(14);
    },
    roadmapView: function(lat, lng) {
      var pos = new google.maps.LatLng(lat, lng);
      mapInstance.setCenter(pos);
      mapInstance.setZoom(14);
      mapInstance.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    },
    sateliteView: function(lat, lng) {
      var pos = new google.maps.LatLng(lat, lng);
      mapInstance.setCenter(pos);
      mapInstance.setZoom(20);
      mapInstance.setMapTypeId(google.maps.MapTypeId.SATELLITE);
      mapInstance.setTilt(45);
      mapInstance.setHeading(90);
    },
    streetView: function(lat, lng) {
      var panorama = mapInstance.getStreetView();
      panorama.setPosition({lat: lat, lng: lng});
      panorama.setVisible(true);
    },
    clearMarkers: function() {
      // map.setCenter(sanFran);
      // map.setZoom(11);
      markers.forEach(function(m) {
        m.setMap(null);
      });
      markers = [];
    },
    reset: function() {
      mapInstance.setZoom(11);
      mapInstance.setCenter(sanFrancisco);
      mapInstance.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    },
    plotLocation: function(lat, lng, clickHandler) {
      var pos = new google.maps.LatLng(lat, lng);
      var marker = new google.maps.Marker({
        position: pos,
        map: mapInstance,
        animation: google.maps.Animation.DROP
      });

      markers.push(marker);

      if (clickHandler) {
        google.maps.event.addListener(marker, 'click', clickHandler);
      }
    }
  };
};