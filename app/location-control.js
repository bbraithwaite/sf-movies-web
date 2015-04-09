function showLocation(detail, location, map) {
  return function() {
    map.zoomView(location.geo.lat, location.geo.lng);

    var locationDiv = document.getElementById('location_detail');

    if (!locationDiv) {
      locationDiv = document.createElement('div');
       document.getElementById('bottom_panel').appendChild(locationDiv);
    }

    locationDiv.id = 'location_detail';
    locationDiv.className = 'location_detail';
    locationDiv.style.display = '';
    locationDiv.innerHTML = templates.location(location);

    var sateliteViewButton = document.createElement('input');
    sateliteViewButton.type = 'button';
    sateliteViewButton.value = 'Satelite View';

    sateliteViewButton.addEventListener('click', function() {

      if (this.value === 'Satelite View') {
        map.sateliteView(location.geo.lat, location.geo.lng);
        this.value = 'Back to Roadmap'
      } else {
        map.roadmapView(location.geo.lat, location.geo.lng);
        this.value = 'Satelite View'
      }
      
    });

    locationDiv.appendChild(sateliteViewButton);

    var streetViewButton = document.createElement('input');
    streetViewButton.type = 'button';
    streetViewButton.value = 'Street View';

    streetViewButton.addEventListener('click', function() {
      map.streetView(location.geo.lat, location.geo.lng);
    });

    locationDiv.appendChild(streetViewButton);

    var backToFilm = document.createElement('input');
    backToFilm.type = 'button';
    backToFilm.value = 'Back to Film';

    backToFilm.addEventListener('click', function() {
        map.reset();
        var location_detail = document.getElementById('location_detail');
        if (location_detail) {
          location_detail.style.display = 'none';
        }

        var film_detail = document.getElementById('film_detail');
        if (film_detail) {
          film_detail.style.display = '';
        }
    });

    locationDiv.appendChild(backToFilm);

    document.getElementById('film_detail').style.display = 'none';
  };
}