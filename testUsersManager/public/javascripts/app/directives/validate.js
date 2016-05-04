angular.module('testUsersManager')
.directive('validate', function ($compile) {
    function appendValidator(scope, elm) {
        var p = '<p class="error" ng-show="show">error</p>';
        elm.parent().append($compile(p)(scope));
    };
    return {
        restrict: 'A',
        //scope: {}, 
        scope : {
            errors: '='
        },
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
            appendValidator(scope, elm);

            scope.$watch(function () {
                return ngModelCtrl.$dirty;
            }, function () {
                scope.show = ngModelCtrl.$dirty;
            }); 
            //
            //var name = ngModelCtrl.$name;
            ////scope.$watch(
            ngModelCtrl.$validators.errors = function (modelValue, viewValue) {
                console.log(ngModelCtrl.$dirty);
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
