angular.module('testUsersManager')
.controller('usersListController', function ($scope, usersService, messagesSrv, localizationSrv) {
    usersService.getUsers().then(function (data) {
        $scope.users = data;
    }, function (err) {
        messagesSrv.addMessageError(localizationSrv.translations.m_connectionProblem);
    });

})