angular.module('testUsersManager')
.controller('groupsListController', function ($scope, groupsService, messagesSrv, localizationSrv) {
    groupsService.getGroups().then(function (data) {
        $scope.groups = data;
    }, function (err) {
        messagesSrv.addMessageError(localizationSrv.translations.m_connectionProblem);
    });

})