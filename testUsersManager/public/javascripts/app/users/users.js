angular.module('testUsersManager')
.controller('usersListController', function ($scope, usersService, messagesSrv, localizationSrv) {
    usersService.getUsers().then(function (data) {
        $scope.users = data;
    }, function (err) {
        messagesSrv.addMessageError(localizationSrv.translations.m_connectionProblem);
    });

})
.controller('createUserController', function ($scope, $location,  usersService, messagesSrv, localizationSrv) {
    $scope.user = {};
    $scope.createUser = function (user){
        usersService.saveUser(user)
           .then(function (response) {//sucess
                $location.url('/users');
                messagesSrv.addMessageInfo(localizationSrv.translations.users.m_userSavedOk);
        },
           function (response) {//error
                $scope.message = response.data.message || localizationSrv.translations.m_connectionProblem;
        });
    }

    $scope.getError = function (error) {
        if (!angular.isDefined(error)) { return; }
        if (error.required) {
            return 'Please provide value!';
        }
        else if (error.minlength) {
            return 'Value is to short!';
        }
        else if (error.matchother) {
            return 'Passowrds cannot be different!';
        }
    }
})