'use strict';

(function (window) {

  window.movieApp = window.movieApp || {};

  window.movieApp.initView = function(id) {
    var visible;
    var div;
    return {
      init: function() {
        if (!div) {
          div = document.getElementById(id);
        }
      },
      hide: function() {
        if (visible === undefined) {
          this.init();
        }

        if (visible === undefined || visible === true) {
          if (div) {
            div.style.display = 'none';
          }
          visible = false;
        }
      },
      show: function() {
        if (!visible) {
          this.init();
          div.style.display = '';
          visible = true;
        }
      },
      setText: function(html) {
        div.innerHTML = html;
      }
    };
  };

})(window);