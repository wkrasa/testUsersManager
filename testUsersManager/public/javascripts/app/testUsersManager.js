﻿var app = angular.module('testUsersManager', ['ngRoute', 'ngResource','ngAnimate', 'ui.bootstrap'])
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
        },
        reloadOnSearch: true
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
     .when('/register', {
        templateUrl: '/views/account/register',
        controller: 'registrationController'
    })
    .when('/registrationSuccessfull', {
        templateUrl: '/views/account/registrationSuccessfull',
        controller: 'registrationController'
    })
    //USERS
    .when('/users', {
        templateUrl: '/views/users/usersList',
        controller: 'usersListController',
        access: {
            authorize: true
        }
    })
    .when('/createUser', {
        templateUrl: '/views/users/create',
        controller: 'createUserController',
        access: {
            authorize: true
        }
    })
    .when('/updateUser/:id', {
        templateUrl: '/views/users/create',
        controller: 'updateUserController',
        access: {
            authorize: true
        }
    })
    .when('/groups', {
        templateUrl: '/views/groups/groupsList',
        controller: 'groupsListController'
    })
	.otherwise({
	    redirectTo: '/views/home/home'
	});
});
