/* Data Service */

myAppS.factory('WorksetService', ['$http', '$q', '$window', '$sessionStorage',
    function($http, $q, $window, $sessionStorage) {


        return {

            get: function () {
                var localScope = $sessionStorage;
                var isLoggedIn = (localScope.planzuUser !== null && typeof localScope.planzuUser !== 'undefined');

                return $http({
                    url: $window.pageVars.urls.data,
                    dataType: 'json',
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(function (response) {
                    console.log("in service, response success", response);

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        
            },       
        };
        
    }
]);