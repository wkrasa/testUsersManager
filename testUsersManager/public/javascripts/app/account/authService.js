
angular.module('testUsersManager')

.value('loginUrl', '/login')
.value('logoutUrl', '/logout')
.value('registerUrl', '/register')
.value('loginPath', '/login')
.value('userForbidden', '/forbidden')

.factory('authService', function ($rootScope, $http, $location, loginUrl, logoutUrl, registerUrl, loginPath, userForbidden) {
    var authSrv = {};
    authSrv.user = null;
    authSrv.returnUrl = null;
    authSrv.isLoggedIn = function () {
        return authSrv.user != null;
    }
    authSrv.login = function (credentials, afterLogin) {
        $http.post(loginUrl, credentials)
        .success(function (data, status, headers, config) {
            if (data.isAuth) {
                authSrv.user = { login: data.userData.login, roles: data.userData.roles };
                $rootScope.$broadcast("login");
                if (afterLogin != null) { afterLogin(data); }
                if (authSrv.returnUrl == null) { $location.url('/'); }
                else { { $location.url(authSrv.returnUrl); } }
            }
            else {
                if (afterLogin != null) { afterLogin(data); }
            }
        })
        .error(function (data, status, headers, config) {
            if (afterLogin != null) { afterLogin({ isAuth: false, message: "Connection problem, please retry" }); }
        });
    }
    
    authSrv.register = function (login, pass, pass2, afterLogin) {
        return $http(
            {
                url: registerUrl,
                method: 'Put',
                data: { Login: login, Password: pass, Password2: pass2 }
            });
    }
    
    authSrv.logout = function () {
        $http.get(logoutUrl);
        authSrv.user = null;
        $rootScope.$broadcast("logout");
        $location.path(loginPath).replace();
    }
    
    authSrv.checkRoles = function (userRolesArr, acceessRolesArr) {
        if (acceessRolesArr.length == 0) { return true; }
        var res = false;
        angular.forEach(acceessRolesArr, function (accessRole, key) {
            angular.forEach(userRolesArr, function (userRole, key) {
                if (accessRole == userRole) {
                    res = true;
                }
            });
        });
        return res;
    }
    /*
        ACCESS EXAMPLE
     $routeProvider.when('/admin/users', {
        controller: 'userListCtrl',
        templateUrl: 'js/modules/admin/html/users.tmpl.html',
        access: {
            autorize: true,
            roles: ['Admin', 'UserManager']
        });
    */
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (next.access !== undefined) {
            if (next.access.authorize && authSrv.isLoggedIn() == false) {
                event.preventDefault();
                authSrv.returnUrl = next.originalPath;
                $location.path(loginPath).replace();
            }
            else if (next.access.roles != null) {
                if (authSrv.isLoggedIn() == false) {
                    event.preventDefault();
                    authSrv.returnUrl = next.originalPath;
                    $location.path(loginPath).replace();
                }
                else {
                    if (authSrv.checkRoles(authSrv.user.roles, next.access.roles) == false) {
                        event.preventDefault();
                        authSrv.returnUrl = next.originalPath;
                        $location.path(userForbidden).replace();
                    }
                }
            }
        }
    });
    return authSrv;
})
.directive('authDir', function (authService) {
    return {
        restrict: 'A',
        link: function (scope, elem, attributes) {
            scope.$on('login', function () {
                scope.applySecurity();
            });
            scope.$on('logout', function () {
                scope.applySecurity();
            });
            scope.applySecurity = function () {
                var roles = attributes['roles'];
                if (authService.isLoggedIn() == false) {
                    elem.addClass('hidden');
                    return;
                }
                else if (roles != null) {
                    if (authService.isLoggedIn() == false) {
                        elem.addClass('hidden');
                        return;
                    }
                    else {
                        if (authService.checkRoles(authSrv.user.roles, access.roles) == false) {
                            elem.addClass('hidden');
                            return;
                        }
                    }
                }
                elem.removeClass('hidden');
            }
            scope.applySecurity();
        }
    };
}).directive('loginHide', function (authService) {
    return {
        restrict: 'A',
        link: function (scope, elem, attributes) {
            scope.$on('login', function () {
                elem.addClass('hidden');
            });
            scope.$on('logout', function () {
                elem.removeClass('hidden');
            });
            elem.removeClass('hidden');
        }
    };
}).directive('loginShow', function (authService) {
    return {
        restrict: 'A',
        link: function (scope, elem, attributes) {
            scope.$on('login', function () {
                elem.removeClass('hidden');
            });
            scope.$on('logout', function () {
                elem.addClass('hidden');
            });
            elem.addClass('hidden');
        }
    };
});
