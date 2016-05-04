angular.module('testUsersManager')
.controller('usersListController', function ($scope, $location, usersService, messagesSrv, localizationSrv) {
    usersService.getUsers().then(function (data) {
        $scope.users = data;
    }, function (err) {
        messagesSrv.addMessageError(localizationSrv.translations.m_connectionProblem);
    });

})
.controller('createUserController', function ($scope, $location, usersService, messagesSrv, localizationSrv) {
    $scope.errors = {
        login: 'login is required',
        password: 'password is required'
    }
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
        } else if (error.errors) {
            return '!!!';
        }
    }
}).controller('updateUserController', function ($scope, $routeParams, $location, usersService, messagesSrv, localizationSrv) {
    usersService.getUserByID($routeParams.id)
             .then(function (data) {
        if (data == null) {
            messagesSrv.addMessageError(localizationSrv.translations.users.m_userNotFound);
            $location.url('/users');
        }
        else {
            $scope.user = data;
        }
    }, function (data) {
        messagesSrv.addMessageError(localizationSrv.translations.users.m_userNotFound);
        $location.url('/users');
    });

    $scope.createUser = function (user) {
        usersService.updateUser(user)
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