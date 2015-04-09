'use strict';

window.SearchControl = function(controlDiv) {
  var movieClicked = function(item) {
    window.map.clearMarkers();
    window.map.setOptions({ streetViewControl: false, zoomControl: true });
    document.getElementById('films_results').innerHTML = '';
    document.getElementById('q').value = item.title;
    window.showMovieDetail(item);
  };

  var searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.name = 'q';
  searchInput.id = 'q';
  searchInput.placeholder = 'Enter film title...';
  controlDiv.appendChild(searchInput);

  new window.Autocomplete(searchInput, { 
    url: '/movies/search', 
    param: 'q',
    label: 'title',
    value: 'releaseYear',
    select: function(item) { 
      movieClicked(item);
    }
  });
  
  var resultsUI = document.createElement('div');
  resultsUI.id = 'films_results';
  controlDiv.appendChild(resultsUI);
};