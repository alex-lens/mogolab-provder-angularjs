angular.module('app').factory('mongoLabProvider', ['$http', function ($http) {
    var MongoLab = {
        setting: {
            ApiKey: 'api_key',
            url: 'https://api.mongolab.com/api/1/'
        },
        api: {
            listDatabases: function () {
                return $http.get(MongoLab.setting.url + 'databases?apiKey=' + MongoLab.setting.ApiKey);
            },
            listCollections: function (db) {
               return $http.get(MongoLab.setting.url + 'databases/' + db + '/collections' + '?apiKey=' + MongoLab.setting.ApiKey);
            },
            /* options = { q: '', c: '', f: '', fo: '', s: '', sk: '',  l: ''} same as in MongoLab API documentation */
            listDocuments: function (db, collection, conditions) {
                var params = '';
                if (angular.isDefined(conditions)) {
                    angular.forEach(conditions, function(value, condition) {
                        params += '&' + condition + '=' + value;
                    });
                }
                return $http.get(MongoLab.setting.url + 'databases/' + db + '/collections/' + collection + '?apiKey=' + MongoLab.setting.ApiKey + params);
            },
            insertDocument: function (db, collection, data) {
                var preparedData = JSON.stringify(data),
                    httpParams = {
                        method: 'POST',
                        url: MongoLab.setting.url + 'databases/' + db + '/collections/' + collection + '?apiKey=' + MongoLab.setting.ApiKey,
                        headers: { 'Content-Type': 'application/json' },
                        data: preparedData
                    };
                return $http(httpParams);
            }
        }
    };

    return {
        getDatabases: function () {
            return MongoLab.api.listDatabases();
        },
        getCollections: function (db) {
            return MongoLab.api.listCollections(db);
        },
        getDocuments: function (db, collection, conditions) {
            return MongoLab.api.listDocuments(db, collection, conditions);
        },
        insertDocument: function (db, collection, data) {
            return MongoLab.api.insertDocument(db, collection, data)
        }
    };
}]);
