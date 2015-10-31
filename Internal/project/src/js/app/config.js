/*config */

myApp.config(['$routeProvider', '$httpProvider',
    function ($rp, $hp) {


        $rp.when('/', {
            templateUrl: 'tpl/layout.html',
            controller: 'LayoutCtrl',
        }).when('/alert/', {
            templateUrl: 'tpl/alert_demo.html',
            controller: 'AlertDemoCtrl'
        }).otherwise({
            redirectTo: '/'
        });
        
    }
    
]);