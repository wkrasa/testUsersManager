
angular.module('testUsersManager')
.directive('translate', function (localizationSrv) {
    function applyTranslation(elm, keys) {
        var tmp = localizationSrv.translations;
        var notFound = false;
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (tmp[key]) {
                tmp = tmp[key];
            }
            else {
                notFound = true;
                break;
            }
        }
        if (!notFound) {
            elm.text(tmp);
        }
    }
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            var text = elm.text().trim();
            var keys = text.split('.');
            applyTranslation(elm, keys);
            scope.$on('langChanged', function () {
                applyTranslation(elm, keys);
            });
        }
    };
});