'use strict';

var templates = {};

templates.mapCanvas = function mapCanvasTemplate() {
  return document.getElementById('map-canvas');
};

templates.home = function homeTemplate() {
  var buf = [];
  buf.push('<h2>SF Movies</h2>');
  buf.push('<div>See film locations for all movies filmed in San Fransisco.'); 
  buf.push('<strong>');
  buf.push('Click on a marker to see more information about a location.');
  buf.push('</strong>');
  buf.push('</div>');
  buf.push('<p>This is a sample project from' );
  buf.push('<a href="http://www.bradoncode.com">Bradley Braithwaite</a>');
  buf.push('</p>');
  return buf.join('');
};

templates.loading = function loadingTemplate(response) {
  var buf = [];
  buf.push('<h2>');
  buf.push(response);
  buf.push('</h2><br><em>Loading locations and content...</em>');
  return buf.join('');
};

templates.movie = function movieTemplate(detail) {
  var buf = [];
  buf.push('<img src="');
  buf.push(detail.poster);
  buf.push('" alt="poster" align="right" width="80" height="119" />');
  buf.push('<div class="movie_detail">');
  buf.push('<h2>'); 
  buf.push(detail.title);
  buf.push('</h2>');
  buf.push(detail.releaseYear);
  buf.push('</em>, Director: ');
  buf.push('<em>');
  buf.push(detail.director);
  buf.push('</em><br><br>');
  buf.push('Staring: ');
  buf.push(detail.actors);
  buf.push('<br><br>');
  buf.push('Rating: ');
  buf.push(detail.rating);
  buf.push('<br><br>');
  buf.push('Genre: ');
  buf.push(detail.genre);
  buf.push('<br><br>');
  buf.push('<br>Plot: ');
  buf.push(detail.plot);
  buf.push('<br><br></div>');
  return buf.join('');
};

templates.location = function locationTemplate(location) {
  var buf = [];
  buf.push('<h2>');
  buf.push(location.location);
  buf.push('</h2>');
  buf.push('<img src="https://maps.googleapis.com/maps/api/streetview?size=120x120&location='); // jshint ignore:line
  buf.push(location.geo.lat);
  buf.push(',');
  buf.push(location.geo.lng);
  buf.push('" align="right">');
  return buf.join('');
};
