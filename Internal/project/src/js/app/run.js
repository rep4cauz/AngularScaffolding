/* Run */

myApp.run([
    '$rootScope',
    '$window',
    '$location',
    '$timeout',
    function ($rootScope, $window, $location, $timeout) {

        $rootScope.isWorking = true;
        $rootScope.refId = '';

    	var ngApp = document.getElementById('ng-app'),
            header = document.getElementsByTagName('header')[0],
            jsGo = false;

        /*
        ngApp.classList.add('slide-left');

        $rootScope.$on('$locationChangeStart', function(e, next, previous) {

        	if( !jsGo ) {
	            if (next.length > previous.length) {
	                //forward
	                ngApp.classList.remove('slide-left', 'slide-right');
	                ngApp.classList.add('slide-left');
	            } else if (next.length < previous.length) {
	                //back
	                ngApp.classList.remove('slide-left', 'slide-right');
	                ngApp.classList.add('slide-right');
	            }
	        }
	        jsGo = false;
        });

        $rootScope.$on('$viewContentLoaded', function(){
            header.classList.remove('up');
            $timeout(function(){
                var page = angular.element(document.getElementsByClassName('page')),
                    lastScroll = 0;
                page.on('scroll', function() {
                    var scrollTop = page.scrollTop();
                    if (scrollTop >= lastScroll && scrollTop >= 60) {
                        header.classList.add('up');
                    } else if (scrollTop < (lastScroll - 10) || scrollTop < 60) {
                        header.classList.remove('up');
                    }
                    lastScroll = scrollTop;
                });
            },1000);
        });

        $rootScope.goTo = function(loc,dir) {
        	jsGo = true;
        	ngApp.classList.remove('slide-left', 'slide-right');
        	if (dir === "next") {
        		ngApp.classList.add('slide-left');
        		if (loc) {
        			$location.path(loc);
        		}
        	} else if (dir === "back") {
        		ngApp.classList.add('slide-right');
        		if (loc) {
        			$location.path(loc);
        		} else {
        			$window.history.back();
        		}
        	}
        };
        */
    }
]);