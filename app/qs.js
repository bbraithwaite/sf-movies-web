'use strict';

// Querystring parser
var QS = {
  stringify: function(args) {
    var result = '';
    for (var prop in args) {
      if (result) {
        result += '&';
      } else {
        result += '?';
      }
      result += prop + '=' + encodeURIComponent(args[prop]);
    }

    return result;
  },
  parse: function(qs) {
    var result = {};
    var match;
    var qsRegex = /([a-z]*)=([^&]*)/g;
    match = qsRegex.exec(qs);
    while (match != null) {   
      result[match[1]] = decodeURIComponent(match[2]);
      match = qsRegex.exec(qs);
    }
    
    return result;
  }
};

window.QS = QS;