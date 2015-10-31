// Declare app level module which depends on filters, services, directives, and controllers

var myApp = angular.module('myApp', [
    'ngRoute',
    'ngStorage',   
    'ui.bootstrap', 
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers'
]);
