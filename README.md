PubNub DS

### Summary

This repo is temp shime to allow the pubnub data sync feature to work with the apubnub angular SDK. Changes in the javascript sdk in the way you initialize the sdk caused the angular SDK to break on load. 

```javascript
//DS
var pubnub = PUBNUB({
	publish_key:  "yourkey",       //please specify the publisher's key here
	subscribe_key: "yourkey" 
});

//Core
var pubnub = PUBNUB.init({
	publish_key:  "yourkey",       //please specify the publisher's key here
	subscribe_key: "yourkey" 
});
```


Since PUBNUB is now a function vs. an object the angular SDK would fail as it relied on the PUBNUB object to create proxies for each function exposed by the javascript SDK and, upon init it woud set an internal reference to the PUBNUB object as the instance the angular SDK would use. 

The workaround: 

1. Instantiate the PUBNUB sdk outside of the angular, prior to including the pubnub-angular sdk. refer to index.html and you will see the normal initialization (the updated wat)

```javascript 
  <script src="bower_components/angular-route/angular-route.js"></script>
  <script src="components/pubnub-ds-beta-1.0.js"></script>

  <script>
    var pubnub = PUBNUB({
        publish_key:'demo',
        subscribe_key:'demo',
        uuid:'angular-ds'
        
    });
  </script>

  <script src="bower_components/pubnub-angular/lib/pubnub-angular.js"></script>
```

2. Initialize pubnub from within your controller before use

```javascript 

.controller('View1Ctrl', function($scope, PubNub) {

      PubNub.init(); //notice no keys or arguments..updates coming for this
     
      $scope.publish = function() {
        
        PubNub.ngPublish({
          channel: "fred-angular-test",
          message: {"text":"hello world from angular"}
        });

      };
      //publish a test message
      $scope.publish();
});
```

The remaining changes are in the Angular wrapper. Because we initialize pubnub outside of the controller with our proper keys, we now use the instantiated instance of pubnub to create the proxies and assign the instance. 

To use this approach: 

1. Copy the bower_components/pubnub-angular/lib/pubnub-angular.js to a location in your project.
2. As described above initialize pubnub prior to including the pubnub-angular.js, but after including pubnub-ds-beta-1.0.js.
3. do not include the core pubnub.js

You can view index.html for initialization, view1.js for usage





