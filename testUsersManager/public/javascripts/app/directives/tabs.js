//tabs
//    tab(title = "tab1")
//        h3 tab1
//    tab(title = "tab2")
//        h3 tab2
//    tab(title = "tab3")
//        h3 tab3 

angular.module('testUsersManager')
.directive('tabs', function () {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: '/views/other/tabs',
        controller: function ($scope) {
            $scope.tabs = [];

            $scope.selectTab = function (tab) {
                angular.forEach($scope.tabs, function (tab) {
                    tab.selected = false;
                });

                tab.selected = true;
            }

            this.addTab = function (tab) {
                $scope.tabs.push(tab);
                if ($scope.tabs.length === 1) {
                    tab.selected = true;
                }
            }
        }
    };
}).directive('tab', function () {
    return {
        require: '^tabs',
        restrict: 'E',
        scope: {
            title: '@'
        }, 
        transclude: true,
        templateUrl: '/views/other/tab',
        link: function (scope, elm, attrs, ctrl) {            
            ctrl.addTab(scope);
        }
    };
});