'use strict';

window.templates = window.templates || {};

window.templates.topPanel = function topPanel() {
  return '<div id="top_panel" class="top_panel"></div>';
};

window.templates.bottomPanel = function topPanel() {
  return '<div id="bottom_panel" class="bottom_panel"></div>';
};

window.templates.home = function homeTemplate() {
  var buf = [];
  buf.push('<div>');
  buf.push('<h2>SF Movies</h2>');
  buf.push('<p>See film locations for all movies filmed in San Fransisco. <strong>Click on a marker to see more information about a location.</strong>.</p>');
  buf.push('<p>This is a sample project from <a href="http://www.bradoncode.com">Bradley Braithwaite</a>.</p>');
  buf.push('</div>');
  return buf.join('');
};

window.templates.movie = function movieTemplate(movie) {
  var buf = [];
  buf.push('<div style="overflow: scroll; height:135px;">');
  buf.push('<img ');
  if (movie.poster) {
    buf.push('src="');
    buf.push(movie.poster);
    buf.push('" ');
  }
  buf.push('alt="poster" align="right" width="80" height="119" style="padding:10px 5px;">');
  buf.push('<h2>'); 
  buf.push(movie.title);
  buf.push('</h2>');
  buf.push(movie.releaseYear);
  buf.push('</em>, Director: ');
  buf.push('<em>');
  buf.push(movie.director);
  buf.push('</em><br><br>');
  buf.push('Staring: ');
  buf.push(movie.actors);
  buf.push('<br><br>');
  buf.push('Rating: ');
  buf.push(movie.rating);
  buf.push('<br><br>');
  buf.push('Genre: ');
  buf.push(movie.genre);
  buf.push('<br><br>');
  buf.push('<br>Plot: ');
  buf.push(movie.plot);
  buf.push('</div>');
  return buf.join('');
};

window.templates.search = function() {
  var buf = [];
  buf.push('<div>');
  buf.push('<input type="search" id="q" name="q" placeholder="Enter film title...">');
  buf.push('</div>');
  return buf.join('');
};

window.templates.location = function(location, movie) {
  var buf = [];
  buf.push('<div>');
  buf.push('<h2>');
  buf.push(location.location);
  buf.push(' (');
  buf.push(movie.title);
  buf.push(', ');
  buf.push(movie.releaseYear);
  buf.push(')');
  buf.push('</h2>');
  buf.push('<input type="button" id="sateliteView" value="Satelite View">');
  buf.push('<input type="button" id="roadmapView" value="Roadmap View" style="display:none;">');
  buf.push('<input type="button" id="streetView" value="Street View">');
  buf.push('<input type="button" id="filmView" value="Back to Film">');
  buf.push('<img src="https://maps.googleapis.com/maps/api/streetview?size=120x120&location=');
  buf.push(location.geo.lat);
  buf.push(',');
  buf.push(location.geo.lng);
  buf.push('" align="right">');
  buf.push('</div>');
  return buf.join('');
};
