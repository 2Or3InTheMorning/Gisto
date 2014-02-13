'use strict';

angular.module('gisto.directive.toUrl', []).directive('toUrl', function ($rootScope) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            element.on('click', function (event) {
               if($rootScope.mobile) {
                    console.log('--------- IN BROWSER URL:', attrs.toUrl.toLowerCase());
                    navigator.app.loadUrl(attr.toUrl.toLowerCase(), { openExternal:true });
                } else {
                    console.log('--------- EXTERNAL URL:', attrs.toUrl.toLowerCase());
                    gui.Shell.openExternal(attrs.toUrl.toLowerCase());
                }
            });
        }
    }
});