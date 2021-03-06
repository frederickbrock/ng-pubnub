'use strict';

var pubnub = PUBNUB({
	    publish_key:'demo',
        subscribe_key:'demo',
        uuid:'angular-ds'
});

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'pubnub.angular.service',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
