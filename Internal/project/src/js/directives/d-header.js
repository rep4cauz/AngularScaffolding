/* Header Directive */

myAppD.directive('header', [
    function () {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'tpl/header_panel.html',
            link: function (scope, elm, attrs) {
            },
            controller: ['$scope', function ($scope) {
               $scope.title = "Header Title";
            }]
        }
    }
]);