angular.module('testUsersManager')
.directive('validate', function ($compile) {
    //this directive adds p and div elements to inputs parent
    //p displays erros from ng-model
    //div contains errors from errors object from parent controller's scope
    function applyErrors(scope, erros, elm, name) {
        elm.children('p.added').remove();
        if (!erros) { return; }
        angular.forEach(erros[name], function (error) {
            console.dir(error);
            var p = '<p class="error added" ng-show="show">' + error + '</p>';
            elm.append($compile(p)(scope));
        });
    };
    function getError(scope, error) {
        if (!angular.isDefined(error)) { return; }
        if (error.required) {
            scope.error = 'Please provide value!';
        }
        else if (error.minlength) {
            scope.error = 'Value is to short!';
        }
        else if (error.email) {
            scope.error = 'Invalid email!';
        }
        else if (error.matchother) {
            scope.error = 'Passowrds cannot be different!';
        }
        else {
            scope.error = null;
        }
    };
    return {
        restrict: 'A',
        //scope: {}, 
        scope : {
            errors: '='
        },
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
            var p = '<p class="error" ng-show="showError">{{error}}</p>';
            elm.parent().append($compile(p)(scope));
            
            var divWrp = elm.parent().append('<div></div>');
            var name = elm.prop('name');
            applyErrors(scope, scope.errors, divWrp, name);
            
            scope.$watch(function () {
                return scope.errors;
            }, function () {
                applyErrors(scope, scope.errors, divWrp, name);
                ngModelCtrl.$validate();
            });
            
            scope.$watch(function () {
                return ngModelCtrl.$dirty;
            }, function () {
                scope.show = ngModelCtrl.$dirty && ngModelCtrl.$invalid;
                scope.showError = ngModelCtrl.$dirty && ngModelCtrl.$invalid;
                getError(scope, ngModelCtrl.$error);
            });
            
            scope.$watch(function () {
                return ngModelCtrl.$invalid;
            }, function () {
                scope.show = ngModelCtrl.$dirty && ngModelCtrl.$invalid;
                scope.showError = ngModelCtrl.$dirty && ngModelCtrl.$invalid;
                getError(scope, ngModelCtrl.$error);
            });
            
            scope.$watch(function () {
                return ngModelCtrl.$viewValue;
            }, function () {
                scope.show = ngModelCtrl.$dirty && ngModelCtrl.$invalid;
                scope.showError = ngModelCtrl.$dirty && ngModelCtrl.$invalid;
                getError(scope, ngModelCtrl.$error);
            });
            
            ngModelCtrl.$validators.errors = function (modelValue, viewValue) {
                if (!scope.errors || !scope.errors[name] || scope.errors[name].length === 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
        }
    }
});
