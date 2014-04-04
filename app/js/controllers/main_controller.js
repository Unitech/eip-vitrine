
var MCtrl = angular.module('MainController', []);



MCtrl.controller('GlobalCtrl', ['$scope', '$route', '$location', function($scope, $route, $location) {

}]);

MCtrl.controller('RegisterCtrl', ['$scope', '$route', '$location', 'User', function($scope, $route, $location, User) {
  $scope.register = function() {
    console.log($scope.user);
    User.register($scope.user, function(err, user) {
      console.log(arguments);
    });

  };
}]);



function handleSocket(Socket, $rootScope) {
  Socket.on('notification', function(data) {
    if (data.target_type == 'message') {
      $rootScope.$broadcast('message:new', data.content);
    }
  });
}

MCtrl.controller('DemoCtrl', ['$scope', '$route', '$location', '$http', '$rootScope', 'Socket', function($scope, $route, $location, $http, $rootScope, Socket) {

  /**
   * Init socket
   */
  var win;

  Socket.init(API_URL);

  Socket.on('auth:success', function() {
    /**
     * Succes the man has clicked on accept
     */
    console.log('auth:success');
    win.close();
    window.location = 'http://facebook.com/';
  });

  Socket.on('auth:failure', function() {
    /**
     * Failure the man has clicked on accept
     */
    win.close();

    win = window.open(FRONT_URL + '/poc_failure.html#/poc_failure.html' ,'Failure','height=400,width=450');
    win.focus();

    console.log('auth:failure');
  });

  /**
   * Send notification to mobile
   */

  $scope.send = function() {
    $scope.sent = true;
    $http({
      method : 'GET',
      url : 'http://steelsecurity.co/~menelgil/ping.php?service=facebook'
    }).success(function(dt) {
      $scope.sent = true;
    }).error(function(err, status) {
      $scope.sent = true;
    });

    win = window.open(FRONT_URL + '/poc.html' ,'name','height=400,width=450');
    win.focus();

  };

}]);

/**
 * @doc controller
 * @id MCtrl:pocCtrl
 * @view
 * @description
 * @author Alexandre Strzelewicz <as@unitech.io>
 */
MCtrl.controller('pocCtrl', ['$scope', '$location', function($scope, $location) {
  var i = 60;

  $scope.time = 60;

  i--;
  setInterval(function() {
    $scope.time = i;
    i--;
    $scope.$apply();
  }, 1000);


}]);


MCtrl.controller('NavbarCtrl', ['$scope', '$route', '$location', function($scope, $route, $location) {
  $scope.isActive = function(path) { return path.substring(1) == $location.path() };
}]);

MCtrl.controller('LoginCtrl', ['$scope', '$route', '$location', '$rootScope', 'User', function($scope, $route, $location, $rootScope, User) {
  $scope.login = function() {
    // User.current_user = $scope.user;

    //User.login($scope.user
    $rootScope.logged = true;

    $location.path('/dashboard');
  };
}]);

MCtrl.controller('DashboardCtrl', ['$scope', '$rootScope', '$route', '$location', '$timeout', '$http', 'User', function($scope, $rootScope, $route, $location, $timeout, $http, User) {
  $scope.loading_finished = false;



  User.Accounts.list(function(accounts) {
    $scope.logs = accounts;
  });


  // $timeout(function() {
  //   $scope.loading_finished = true;
  // }, Math.floor((Math.random()*1000)+300));


  // setInterval(function() {
  //   $scope.logs.unshift({
  //     date : moment().subtract('days', new Date()),
  //     type : ['Gmail', 'Facebook', 'Paypal', 'WePay'][Math.floor(Math.random()*3) + 1],
  //     status : ['Valid', 'Refused'][Math.floor(Math.random()*1) + 1]
  //   });
  //   $scope.$apply();
  // }, Math.floor((Math.random()*3000)+300));

  $scope.user = User.current_user;

  $scope.sendQuery = function() {
    $scope.sent = true;
    $http({
      method : 'GET',
      url : 'http://steelsecurity.co/~menelgil/ping.php?service=facebook'
    }).success(function(dt) {
      $scope.sent = true;
    }).error(function(err, status) {
      $scope.sent = true;
    });
  };

  $scope.User = User;
  console.log(User);

  // $scope.logs = [{
  //   date : moment().subtract('days', Math.floor((Math.random()*10))),
  //   type : 'Gmail',
  //   status : 'Valid'
  // }, {
  //   date : moment().subtract('days', Math.floor((Math.random()*10))),
  //   type : 'Paypal',
  //   status : 'Valid'
  // },{
  //   date : moment().subtract('days', Math.floor((Math.random()*10))),
  //   type : 'Paypal',
  //   status : 'Valid'
  // }];
}]);

MCtrl.controller('ProcessCtrl', ['$scope', '$route', '$rootScope', '$location', 'User', function($scope, $route, $rootScope, $location, User) {

}]);

MCtrl.controller('NopCtrl', ['$scope', '$timeout', function($scope, $timeout) {

  $scope.sendMessage = function() {
    $timeout(function() {
      $scope.messageSubmited = true;
    }, 700);
  };
}]);

/**
 * @doc controller
 * @id MCtrl:MainCtrl
 * @view global
 * @description controller which encapsulates everything
 * @author Alexandre Strzelewicz <as@unitech.io>
 */


MCtrl.controller('MainCtrl', ['$scope', '$rootScope', '$dcms', 'User', function($scope, $rootScope, $dcms, User) {
  $scope.setLang = function(lang) {
    $dcms.setLang(lang);
  };

  $scope.User = User;
}]);
