angular.module('testUsersManager')
.directive('validate', function ($compile) {
    function applyErrors(scope, elm, name) {
        elm.children('p.error').remove();
        if (!scope.errors) { return; }
        angular.forEach(scope.errors[name], function (error) {
            console.dir(error);
            var p = '<p class="error" ng-show="show">' + error +'</p>';
            elm.append($compile(p)(scope));
        });        
    };
    return {
        restrict: 'A',
        //scope: {}, 
        scope : {
            errors: '='
        },
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
            var divWrp = elm.parent().append('<div></div>');
            var name = elm.prop('name');
           
            applyErrors(scope, divWrp, name);
            
            scope.$watch(function () {
                return scope.errors;
            }, function () {
                applyErrors(scope, divWrp, name);
                ngModelCtrl.$validate();
            });

            scope.$watch(function () {
                return ngModelCtrl.$dirty;
            }, function () {
                scope.show = ngModelCtrl.$dirty && ngModelCtrl.$invalid;
            });
            
            scope.$watch(function () {
                return ngModelCtrl.$invalid;
            }, function () {
                scope.show = ngModelCtrl.$dirty && ngModelCtrl.$invalid;
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
