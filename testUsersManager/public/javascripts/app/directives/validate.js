angular.module('testUsersManager')
.directive('validate', function () {
    return {
        restrict: 'A',
        scope: {
            errors: "="
        },
        require: "ngModel",
        link: function (scope, elm, attrs, ngModelCtrl) {
            var name = ngModelCtrl.$name;
            ngModel.$validators.errors = function (modelValue, viewValue) {
                if (!scope.errors[name] || scope.errors[name].length === 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
        }
    }
});
