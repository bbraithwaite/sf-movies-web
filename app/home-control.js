'use strict';

(function (window) {

	window.movieApp = window.movieApp || {};

	window.movieApp.HomeControl = function(controlDiv, map) {
		map.addView(controlDiv, 'BOTTOM_CENTER');
	};

})(window);