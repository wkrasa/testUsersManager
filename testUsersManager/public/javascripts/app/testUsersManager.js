var app = angular.module('testUsersManager', ['ngRoute', 'ngResource','ngAnimate', 'ui.bootstrap'])
.config(['$httpProvider', function ($httpProvider) {
        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }])
.config(function($routeProvider){
    $routeProvider
	.when('/', {
	    templateUrl: '/views/home/home',
	    controller: 'mainController'
	})
    .when('/home', {
        templateUrl: '/views/home/home',
        controller: 'mainController'
    })
    .when('/about', {
        templateUrl: '/views/home/about',
        controller: 'mainController',
        access: {
            authorize: true
        }
    })
    .when('/contact', {
        templateUrl: '/views/home/contact',
        controller: 'mainController',
        access: {
            authorize: true
        }
    })
    .when('/login', {
        templateUrl: '/views/account/login',
        controller: 'loginController'
    })
	.otherwise({
	    redirectTo: '/views/home/home'
	});
});
