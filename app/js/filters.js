
var Filters = angular.module('Filters', []);

Filters.filter('fromNow', function() {
  return function(dateString) {
    return moment(new Date(dateString)).fromNow();

  };
});

Filters.filter('simpleDate', function() {
  return function(dateString) {
    return moment(new Date(dateString));
  };
});

Filters.filter('beautifyJson', function() {
  return function(json) {
    var str = angular.copy(json);    
    return JSON.stringify(str, null, 4);
  };
});

Filters.filter('capitalize', function() {
  return function(dateString) {
    if (dateString !== undefined)
      return dateString.charAt(0).toUpperCase() + dateString.slice(1);
    return '';
  };
});

Filters.filter('highlight', function() {
  return function(string, param) {
    if (!param.term || param.term.length < 3) return string;
    return string.replace(new RegExp(param.term, 'gi'), '<span class="match">$&</span>');
  };
});

Filters.filter('objectLength', function() {
  return function(object) {
    if (object)
      return Object.keys(object).length;
    else
      return 0;
  };
});

Filters.filter('bytesToMb', function() {
  var bytesToSize = function(bytes, precision) {
    var kilobyte = 1024;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;

    if ((bytes >= 0) && (bytes < kilobyte)) {
      return bytes + ' B';
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
      return (bytes / kilobyte).toFixed(precision) + ' KB';
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
      return (bytes / megabyte).toFixed(precision) + ' MB';
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
      return (bytes / gigabyte).toFixed(precision) + ' GB';
    } else if (bytes >= terabyte) {
      return (bytes / terabyte).toFixed(precision) + ' TB';
    } else {
      return bytes + ' B';
    }
  };

  return function(bytes) {
    return bytesToSize(bytes, 1);
  };
});
