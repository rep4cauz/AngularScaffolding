/* Body Directive */

myAppD.directive('body', [
    function () {
        return {
            restrict: 'A',
            scope:true,
            templateUrl: 'tpl/body_panel.html',
            link: function (scope, elm, attrs) {
            },
            controller: ['$scope', function ($scope) {
               $scope.title ="Body Title";
            }]
        };
    }
]);