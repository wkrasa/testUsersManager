angular.module('testUsersManager')
.value('langFilesPath', '/translations/')
.factory('localizationSrv', function ($rootScope, $http, langFilesPath) {
    var localizationSrv = {};
    localizationSrv.lang = null;
    localizationSrv.translations = {};
    localizationSrv.cache = {};

    localizationSrv.setLang = function (lang) {
        localizationSrv.lang = lang;
        if (localizationSrv.cache[lang]) {
            localizationSrv.translations = localizationSrv.cache[lang];
            $rootScope.$broadcast("langChanged");
        }
        else {
            var url = (langFilesPath + lang);
            $http({ url: url, method: 'get' })
        .success(function (data) {
                localizationSrv.cache[lang] = data;
                localizationSrv.translations = data;
        
                $rootScope.$broadcast("langChanged");
            })
        .error(function (err) {
                console.log('error while getting translation files: %s', url);
            });
        }      
    }                  
    
    localizationSrv.setLang('en-GB');

    return localizationSrv;
})