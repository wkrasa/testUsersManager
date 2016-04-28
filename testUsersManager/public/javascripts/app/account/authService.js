
angular.module('testUsersManager')

.value('loginUrl', '/login')
.value('logoutUrl', '/logout')
.value('registerUrl', '/account')
.value('loginPath', '/login')
.value('userForbidden', '/forbidden')
.value('registrationSuccessfull', '/registrationSuccessfull')

.factory('authService', function ($rootScope, $http, $route, $location, localizationSrv, loginUrl, logoutUrl, registerUrl, loginPath, userForbidden, registrationSuccessfull) {
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
                authSrv.user = { login: data.userData.login, roles: data.userData.roles, lang: data.userData.lang };
                $rootScope.$broadcast("login");
                $route.reload();
                if (afterLogin != null) { afterLogin(data); }
                if (authSrv.returnUrl == null) { $location.url('/'); }
                else { { $location.url(authSrv.returnUrl); } }
            }
            else {
                data.message = data.message || localizationSrv.M_ConnectionProblem;
                if (afterLogin != null) { afterLogin(data); }
            }
        })
        .error(function (data, status, headers, config) {
            if (afterLogin != null) { afterLogin({ isAuth: false, message: localizationSrv.M_ConnectionProblem }); }
        });
    }
    
    authSrv.register = function (userData, afterLogin) {
        return $http(
            {
                url: registerUrl,
                method: 'put',
                data: {
                    login: userData.login,
                    password: userData.password,
                    repeatPassword: userData.repeatPassword ,
                    email: userData.email,
                    lang: userData.lang
                }
            })
            .success(function (data, status, headers, config) {
                if (data.isRegistred) {
                    $location.path(registrationSuccessfull).replace();
                }
                else {
                    data.message = data.message || localizationSrv.translations.M_ConnectionProblem;
                    if (afterLogin != null) { afterLogin({isRegistred: data.isRegistred, message: data.message}); }
                }
            })
            .error(function (data, status, headers, config) {
                if (afterLogin != null) { afterLogin({ isAuth: false, message: localizationSrv.M_ConnectionProblem }); }
            });
    }
    
    authSrv.logout = function () {
        $http({ url: logoutUrl, method: 'delete'});
        authSrv.user = null;
        $rootScope.$broadcast("logout");
        $location.path(loginPath).replace();
    }
    
    authSrv.getLoggedUser = function () {
        return $http({ url: loginUrl, method: 'get' });
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
    function applySecurity(next) {

        if (next.access !== undefined && next.access.authorize === true) {
            if (authSrv.isLoggedIn() == false) {
                authSrv.returnUrl = next.originalPath;
                $location.path(loginPath).replace();
            }
            else if (next.access.roles != null && authSrv.checkRoles(authSrv.user.roles, next.access.roles) == false) {
                authSrv.returnUrl = next.originalPath;
                $location.path(userForbidden).replace();
            }
        }
    }
    var primaryUserCheck = false;

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (primaryUserCheck == false && !authSrv.user) {
            primaryUserCheck = true
            event.preventDefault();
            authSrv.getLoggedUser()
            .success(function (data) {
                    if (data.login) {
                        authSrv.user = { login: data.login, roles: data.roles, lang: data.lang };
                        $rootScope.$broadcast("login");
                    }
                })
            .finally(function () {
                    applySecurity(next);
                });
        }
        else {
            applySecurity(next);
        }
    });

    return authSrv;
}).factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
        return {
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    console.log("Response Error 401", rejection);
                    $location.path('/login').search('returnTo', $location.path());
                } 
                //return $q.reject(rejection);
                return rejection;
            }
        }
    }])
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
