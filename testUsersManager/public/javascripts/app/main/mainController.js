var app = angular.module('testUsersManager');

app.controller('mainController', ['$scope','authService','messagesSrv',
    function ($scope, authService, messagesSrv) {
        $scope.user = null;

        $scope.$on('login', function () {
            $scope.user = authService.user.login;
        });
        $scope.$on('logout', function () {
            $scope.user = null;
        });

        $scope.logout = function () {
            authService.logout();
        }
}]);