
angular.module('testUsersManager')
.directive('matchOther', function () { 
    return {
        require: ['^form', 'ngModel'],
        restrict: 'A',
        link: function (scope, elm, attrs, ctrls) {
            var formCtrl = ctrls[0];
            var modelCtrl = ctrls[1];
            var otherName = attrs['matchOther'];
            modelCtrl.$validators.matchother = function (modelValue, viewValue) {
                var otherVal = formCtrl[otherName].$viewValue;
                if (modelCtrl.$isEmpty(modelValue) || otherVal == null) {
                    // consider empty models to be valid
                    return true;
                }

                if (viewValue == otherVal) {
                    return true;
                }
                return false;
            };
        }
    };
});