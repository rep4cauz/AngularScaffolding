/* Layout Controller */

myAppC.controller('LayoutCtrl', [
    '$scope',
    '$sessionStorage',
    function ($scope, $sessionStorage) {

        $scope.$storage = $sessionStorage;
    }
]);