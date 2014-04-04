var SIO = angular.module('service.SocketIO', []);

SIO.value('version', '0.2');

SIO.factory('Socket', ['$rootScope', '$log', function ($rootScope, $log) {
  var socket = null;
  return {
    init : function(url) {
      socket = io.connect(url || '/');

      socket.on('connect', function() {
        console.log('Realtime connected');
        $rootScope.$broadcast('realtime:on');
      });

      socket.on('disconnect', function() {
        console.log('Disconnected');
        $rootScope.$broadcast('realtime:off');
      });
    },
    close : function() {
      socket.disconnect();
    },
    on: function (eventName, callback) {
      if (!socket) throw 'Socket not initialized';
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (!socket) throw 'Socket not initialized';
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      if (!socket) throw 'Socket not initialized';
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}]);
