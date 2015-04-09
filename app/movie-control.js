function showMovieDetail(item) {
  displayLoadingPanel(item.title);
  getMoveDetail(item.title, item.director);
  plotLocations(item);
} 

function plotLocations(item) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var response = this.response;
    for (var i = 0; i < response.locations.length; i++) {
      map.plotLocation(
        response.locations[i].geo.lat, 
        response.locations[i].geo.lng, 
        showLocation(response, response.locations[i]));
    };
  }
  xhr.open("GET", "/movies/locations?title=" + encodeURIComponent(item.title) + '&director=' + encodeURIComponent(item.director));
  xhr.responseType = "json";
  xhr.send();
}

function displayLoadingPanel(response) {
  var locationDiv = document.getElementById('location_detail');
  if (locationDiv) {
    locationDiv.style.display = 'none';
  }

  var dashboard = document.getElementById('dashboard');
  if (dashboard) {
    dashboard.style.display = 'none';
  }

  if (!document.getElementById('film_detail')) {

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.id = 'film_detail';
    controlText.className = 'film_detail';
    controlText.innerHTML = templates.loading(response);

    document.getElementById('bottom_panel').appendChild(controlText);

  } else {

    var controlText = document.getElementById('film_detail');
    controlText.innerHTML = templates.loading(response);;
    controlText.style.display = '';

  }
}

function getMoveDetail(title, director) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var detail = this.response;
    
    document.getElementById('film_detail').innerHTML = templates.movie(detail);
  }
  xhr.open("GET", "/movies/content?title=" + encodeURIComponent(title) + '&director=' + encodeURIComponent(director));
  xhr.responseType = "json";
  xhr.send();
}
