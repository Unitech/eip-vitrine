
/* global angular */

/**
 * @doc module
 * @id UserModule
 * @description UserModule
 *
 * @author Alexandre Strzelewicz <as@unitech.io>
 */

var UserModule = angular.module('UserModule', []);

UserModule.constant('version', '0.1');

UserModule.config(function() {
});

UserModule.run(function() {
});

/**
 * @doc service
 * @id UserModule:User
 *
 * @description User model
 * @author Alexandre Strzelewicz <as@unitech.io>
 */
UserModule.factory('User', ['$http', function($http) {
  var User = {};

  User.current_user = {};

  User.init = function() {

  };

  User.register = function(user, cb) {
    delete user.password_confirm;

    var obj = {
      username : user.username,
      password : user.password,
      email : user.email
    };

    $http.post(API_URL + '/api/v1/users/', obj)
      .success(function(user) {
        //User.current_user = user
	if (cb) return cb(user);
        return false;
      })
      .error(function(res, status) {
        console.log(arguments);
        return false;
      });
  };

  User.login = function(user, cb) {
    $http.post(API_URL + '/api/v1/users/', user)
      .success(function(user) {
	if (cb) return cb(user);
        return false;
      })
      .error(function(res, status) {
	if (status !== 401)
	  throw 'Server down';
        return false;
      });
  };

  User.update = function(user, cb) {
    $http.put(API_URL + '/api/v1/users/' + user.id, user)
      .success(function(user) {
	if (cb) return cb(user);
        return false;
      })
      .error(function(res, status) {
	if (status !== 401)
	  throw 'Server down';
        return false;
      });
  };

  User.Accounts = {};

  User.Accounts.list = function(cb) {
    $http.get(API_URL + '/api/v1/accounts')
      .success(function(accounts) {
	if (cb) return cb(accounts);
        return false;
      })
      .error(function(res, status) {
	if (status !== 401)
	  throw 'Server down';
        return false;
      });
  };

  User.Accounts.details = function(account, cb) {
    $http.get(API_URL + '/api/v1/accounts/' + account.id)
      .success(function(accounts) {
	if (cb) return cb(accounts);
        return false;
      })
      .error(function(res, status) {
	if (status !== 401)
	  throw 'Server down';
        return false;
      });
  };

  User.Notifications = {};

  User.Notifications.list = function(cb) {
    $http.get(API_URL + '/api/v1/notifications')
      .success(function(accounts) {
	if (cb) return cb(accounts);
        return false;
      })
      .error(function(res, status) {
	if (status !== 401)
	  throw 'Server down';
        return false;
      });
  };

  User.Notifications.details = function(notification, cb) {
    $http.get(API_URL + '/api/v1/notifications/' + notification._id)
      .success(function(accounts) {
	if (cb) return cb(accounts);
        return false;
      })
      .error(function(res, status) {
	if (status !== 401)
	  throw 'Server down';
        return false;
      });
  };

  return User;
}]);
