var app = angular.module('testUsersManager');

app.controller('mainController', ['$scope','$uibModal','authService','messagesSrv',
    function ($scope, $uibModal, authService, messagesSrv) {
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

        $scope.openModal = function (view, ctrl, size) {
            if (!size) { size = 'sm'; }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: view,
                controller: ctrl,
                size: size,
                backdrop: 'static'
            });
            
            //modalInstance.result.then(function (selectedItem) {
            //    $scope.selected = selectedItem;
            //}, function () {
            //    $log.info('Modal dismissed at: ' + new Date());
            //});
        };

        $scope.openModalYesNoCancel = function (title, message) {
            
            $scope.title = title;
            $scope.message = message;

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/views/other/messageBoxQuery',
                controller: 'messageBoxController',
                size: 'sm',
                backdrop: 'static',
                resolve: {
                    title: function () {
                        return $scope.title;
                    },
                    message: function () {
                        return $scope.message;
                    }
                }
            });
            
            //modalInstance.result.then(function (selectedItem) {
            //    $scope.selected = selectedItem;
            //}, function () {
            //    $log.info('Modal dismissed at: ' + new Date());
            //});
        };
}]);