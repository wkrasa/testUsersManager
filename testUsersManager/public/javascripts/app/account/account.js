
var app = angular.module('testUsersManager');

app.controller('loginController', function ($scope, $rootScope, authService) {
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = function (credentials) {
        authService.login(credentials, function (data) {
            if (!data.isAuth) {
                $scope.message = data.message;
            }
        });
    };
})