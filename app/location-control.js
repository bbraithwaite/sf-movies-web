'use strict';

window.showLocation = function(detail, location) {
  return function() {
    window.map.zoomView(location.geo.lat, location.geo.lng);

    var locationDiv = document.getElementById('location_detail');

    if (!locationDiv) {
      locationDiv = document.createElement('div');
      document.getElementById('bottom_panel').appendChild(locationDiv);
    }

    locationDiv.id = 'location_detail';
    locationDiv.className = 'location_detail';
    locationDiv.style.display = '';
    locationDiv.innerHTML = window.templates.location(location);

    var sateliteViewButton = document.createElement('input');
    sateliteViewButton.type = 'button';
    sateliteViewButton.value = 'Satelite View';

    sateliteViewButton.addEventListener('click', function() {

      if (this.value === 'Satelite View') {
        window.map.sateliteView(location.geo.lat, location.geo.lng);
        this.value = 'Back to Roadmap';
      } else {
        window.map.roadmapView(location.geo.lat, location.geo.lng);
        this.value = 'Satelite View';
      }
      
    });

    locationDiv.appendChild(sateliteViewButton);

    var streetViewButton = document.createElement('input');
    streetViewButton.type = 'button';
    streetViewButton.value = 'Street View';

    streetViewButton.addEventListener('click', function() {
      window.map.streetView(location.geo.lat, location.geo.lng);
    });

    locationDiv.appendChild(streetViewButton);

    var backToFilm = document.createElement('input');
    backToFilm.type = 'button';
    backToFilm.value = 'Back to Film';

    backToFilm.addEventListener('click', function() {
        window.map.reset();
        var locationDetail = document.getElementById('location_detail');
        if (locationDetail) {
          locationDetail.style.display = 'none';
        }

        var filmDetail = document.getElementById('film_detail');
        if (filmDetail) {
          filmDetail.style.display = '';
        }
      });

    locationDiv.appendChild(backToFilm);

    document.getElementById('film_detail').style.display = 'none';
  };
};