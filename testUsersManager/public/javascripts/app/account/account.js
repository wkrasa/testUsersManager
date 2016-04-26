
var app = angular.module('testUsersManager');

app.controller('loginController', function ($scope, $rootScope, authService) {
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.message = '';

    $scope.login = function (credentials) {
        authService.login(credentials, function (data) {
            if (!data.isAuth) {
                $scope.message = data.message;
            }
        });
    };
}).controller('registrationController', function ($scope, $rootScope, authService) {
    $scope.register = function (userData) {
        authService.register(userData, function (data) {
            if (!data.isRegistred) {
                $scope.message = data.message;
            }
        });
    };

    $scope.getError = function (error) {
        if (!angular.isDefined(error)) { return; }
        if (error.required) {
            return 'Please provide value!';
        }
        else if (error.matchother) {
            return 'Passowrds cannot be different!';
        }
    }
});