
// DEBUG
DEBUG = false;
if (window.location.host.indexOf('localhost') > -1)
  DEBUG = true;
API_URL='http://api.steelsecurity.co';

var vitrine = angular.module('vitrine', ['MainController', 'Filters', 'dcmsModule', 'UserModule', 'service.SocketIO']);

vitrine.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'templates/home.html',
      controller : 'NopCtrl',
      menu : {
	title : 'Home',
	left : true
      }
    })
    .when('/register', {
      templateUrl : 'templates/register.html',
      controller : 'RegisterCtrl'
    })
    .when('/about', {
      templateUrl : 'templates/about.html',
      controller : 'NopCtrl'
    })
    .when('/contact', {
      templateUrl : 'templates/contact.html',
      controller : 'NopCtrl'
    })
    .when('/login', {
      templateUrl : 'templates/login.html',
      controller : 'LoginCtrl'
    })
    .when('/dashboard', {
      templateUrl : 'templates/dashboard.html',
      controller : 'DashboardCtrl'
    })
    .when('/logs', {
      templateUrl : 'templates/logs.html',
      controller : 'DashboardCtrl'
    })
    .when('/settings', {
      templateUrl : 'templates/settings.html',
      controller : 'DashboardCtrl'
    })
    .when('/process1', {
      templateUrl : 'templates/process1.html',
      controller : 'ProcessCtrl'
    })
    .when('/team', {
      templateUrl : 'templates/team.html',
      controller : 'NopCtrl'
    })
    .when('/foundation4', {
      templateUrl : 'templates/foundation4.html',
      controller : 'NopCtrl',
      menu : {
	title : 'Foundation 4',
	right : true
      }
    })
    .otherwise({
      redirectTo : '/404'
    });
}]);

vitrine.config(['$dcmsProvider', function($dcmsProvider) {
  $dcmsProvider.options = {
    default_lang : 'en',
    permalink : 'HEQSNl'
  };
}]).run(function($dcms) {});

vitrine.run(['$log', function($log) {
  // Disable all log when production
  if (!DEBUG) {
    // Can be forwarded to Logman
    $log.log = function(arguments) {};
    $log.error = function(arguments) {};
    $log.info = function(arguments) {};
    $log.warn = function(arguments) {};
  }
  $log.log('⌬ vitrine inited');
}]);
