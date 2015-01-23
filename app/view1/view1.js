'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, PubNub) {

      PubNub.init();
     
      $scope.publish = function() {
        
        PubNub.ngPublish({
          channel: "fred-angular-test",
          message: {"text":"hello world from angular"}
        });

      };

      $scope.publish();
});