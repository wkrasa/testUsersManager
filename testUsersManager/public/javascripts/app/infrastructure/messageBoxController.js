var app = angular.module('testUsersManager')
.controller('messageBoxController', function ($scope, $uibModalInstance, title, message) {
    
    $scope.title = title;
    $scope.message = message;
    
    $scope.yes = function () {
        $uibModalInstance.close();
    };
    
    $scope.no = function () {
        $uibModalInstance.dismiss('no');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
