## [MongoLab API ](http://docs.mongolab.com/restapi/)  provider for AngularJs

### Requirements
- AngularJS 1.2+
- MongoLab api key, database

### Usage
1. Create main module (main.js) with simple code:

        angular.module('app', []);

2. Create your controller (AppController.js):

        angular.module('app').controller('AppController', ['$scope', 'mongoLabProvider',
        function($scope, mongoLabProvider) {
        $scope.mongoDb = 'test-db';
            
    all params the same as in [MongoLab API Doc ](http://docs.mongolab.com/restapi/#list-documents)

        var params = {l: '5', s: '{ "_id": -1}'};
        mongoLabProvider.getDocuments($scope.mongoDb, 'messages', params)
            .success(function(response) {
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
         }]);






